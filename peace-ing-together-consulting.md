---
layout: default
title: "Peace-ing Together Consulting"
description: >-
  Peace-ing Together Consulting — book Marcia W. Mount Shoop to speak on
  sports reform, race and power, embodiment and trauma, and congregational
  consulting.
permalink: /peace-ing-together-consulting/
---

<section>
  <div class="hero-photo">
    <picture>
      <source srcset="{{ '/assets/images/consulting/peace-ing-together-consult.webp' | relative_url }}" type="image/webp">
      <img src="{{ '/assets/images/consulting/peace-ing-together-consult.png' | relative_url }}" alt="" class="hero-photo__img" fetchpriority="high" decoding="async">
    </picture>
    <div class="hero-photo__scrim" style="background:linear-gradient(180deg,rgba(8,16,34,.55) 0%,rgba(8,16,34,.9) 100%)"></div>
    <div class="hero-photo__content">
      <div class="eyebrow" style="color:oklch(75% 0.12 175);margin-bottom:16px">Peace-ing Together Consulting</div>
      <h1 style="font:700 42px/1.15 var(--font-serif);color:#fff;margin:0 auto 18px;max-width:640px">Sports, faith, and the body as a mirror for the issues of our time</h1>
      <p style="font:400 16px/1.7 var(--font-sans);color:rgba(255,255,255,.8);max-width:520px;margin:0 auto 30px">Marcia visits campuses, congregations, and community contexts to unpack how race, gender, higher education, and religion shape American life.</p>
      <a class="btn btn-light" href="#inquire" style="box-shadow:0 10px 26px rgba(0,0,0,.35)">Book Marcia to Speak</a>
    </div>
  </div>
</section>

<section class="section wrap">
  <h2 class="section-title">Programs &amp; Topics</h2>
  <div class="programs-grid">
    <div class="program-card">
      <div class="program-card__title">Sports Reform</div>
      <div class="program-card__desc">How race, gender, and power play out on the field — and what that mirrors back to us as a society.</div>
    </div>
    <div class="program-card program-card--green">
      <div class="program-card__title">Race &amp; Power</div>
      <div class="program-card__desc">Facilitated dialogue for congregations and campuses navigating white supremacy and abuse of power.</div>
    </div>
    <div class="program-card program-card--teal">
      <div class="program-card__title">Embodiment &amp; Trauma</div>
      <div class="program-card__desc">Theological reflection on trauma, healing, and the wisdom carried in the body.</div>
    </div>
    <div class="program-card">
      <div class="program-card__title">Congregational Consulting</div>
      <div class="program-card__desc">Facilitation for churches working through difficult transitions and difference.</div>
    </div>
  </div>
</section>

<section class="section--tight wrap">
  <h2 class="section-title">Watch Marcia Speak</h2>
  <button type="button" class="video-block" data-video-trigger data-youtube-id="E85S4bQ2wYc" aria-haspopup="dialog">
    <img src="https://img.youtube.com/vi/E85S4bQ2wYc/hq2.jpg" alt="" class="video-block__thumb" loading="lazy">
    <span class="play-button" aria-hidden="true"></span>
    <span class="sr-only">Play speaking reel</span>
  </button>
</section>

{% include video-modal.html %}

<section class="section--tight wrap">
  <div class="past-engagements">
    <span class="past-engagements__label">Past Engagements</span>
    <div class="past-engagements__rule"></div>
  </div>
  <div class="past-engagements__names">
    <span>Union Presbyterian Seminary</span><span>Wake Forest University</span><span>Montreat Conference Center</span><span>Presbyterian Church (U.S.A.)</span>
  </div>
</section>

{% include endorsements.html list=site.data.speaking_testimonials %}

<section class="inquiry" id="inquire">
  <div class="wrap inquiry__inner">
    <div>
      <h2 class="inquiry__title">Bring Marcia to Your Community</h2>
      <p class="inquiry__desc">Share a few details about your event and Marcia will follow up to discuss fit, format, and availability.</p>
    </div>
    <div class="form-status form-status--success" hidden data-form-status="sent">Thanks — your inquiry is on its way to Marcia's team.</div>
    <div class="form-status form-status--error" hidden data-form-status="error">Something went wrong sending that. Please try again, or email directly.</div>
    <form class="inquiry__form" name="speaking-inquiry-2a" method="POST" action="{{ '/api/contact' | relative_url }}">
      <input type="hidden" name="form-name" value="speaking-inquiry-2a">
      <input type="hidden" name="redirect" value="{{ '/peace-ing-together-consulting/' | relative_url }}#inquire">
      <input type="text" name="company" style="display:none" tabindex="-1" autocomplete="off">
      <input type="text" name="name" placeholder="Name" aria-label="Name" required>
      <input type="email" name="email" placeholder="Email" aria-label="Email" required>
      <textarea name="details" placeholder="Organization &amp; event details" aria-label="Organization &amp; event details" rows="3" required></textarea>
      <div class="cf-turnstile" data-sitekey="{{ site.turnstile_site_key }}"></div>
      <button type="submit">Send Inquiry</button>
    </form>
  </div>
</section>

{% include follow-along.html %}
{% include cta-band.html %}

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<script src="{{ '/assets/js/form-status.js' | relative_url }}" defer></script>
