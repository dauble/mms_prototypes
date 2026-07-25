const ALLOWED_FORMS = new Set(["contact-2a", "speaking-inquiry-2a"]);

async function verifyTurnstile(token, ip, secret) {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await res.json();
  return data.success === true;
}

function safeRedirectPath(env, path) {
  // Only ever redirect back within this site — never off to an
  // attacker-supplied host, regardless of what's in the "redirect" field.
  try {
    const url = new URL(path, env.SITE_ORIGIN);
    if (url.origin !== env.SITE_ORIGIN) throw new Error("off-site");
    return url;
  } catch {
    return new URL("/mms_prototypes/", env.SITE_ORIGIN);
  }
}

// Adds a query param without disturbing an existing #hash (the
// consulting page's redirect target ends in #inquire — naive string
// concatenation would put ?sent=1 after the hash, where it's invisible
// to location.search).
function withParam(url, key, value) {
  const copy = new URL(url.toString());
  copy.searchParams.set(key, value);
  return copy.toString();
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    let formData;
    try {
      formData = await request.formData();
    } catch {
      return new Response("Bad request", { status: 400 });
    }

    const formName = formData.get("form-name") || "";
    if (!ALLOWED_FORMS.has(formName)) {
      return new Response("Unknown form", { status: 400 });
    }

    const redirectBase = safeRedirectPath(env, formData.get("redirect") || "/mms_prototypes/");

    // Honeypot: real visitors never see or fill this field.
    if (formData.get("company")) {
      return Response.redirect(withParam(redirectBase, "sent", "1"), 303);
    }

    const ip = request.headers.get("CF-Connecting-IP");
    const verified = await verifyTurnstile(
      formData.get("cf-turnstile-response"),
      ip,
      env.TURNSTILE_SECRET_KEY
    );
    if (!verified) {
      return Response.redirect(withParam(redirectBase, "error", "verification"), 303);
    }

    const name = (formData.get("name") || "").toString().slice(0, 200);
    const email = (formData.get("email") || "").toString().slice(0, 200);
    const message = (formData.get("message") || formData.get("details") || "")
      .toString()
      .slice(0, 5000);

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: env.TO_EMAIL,
        reply_to: email || undefined,
        subject: `New message via ${formName} — ${name || "no name given"}`,
        text: `Form: ${formName}\nName: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!emailRes.ok) {
      return Response.redirect(withParam(redirectBase, "error", "send"), 303);
    }

    return Response.redirect(withParam(redirectBase, "sent", "1"), 303);
  },
};
