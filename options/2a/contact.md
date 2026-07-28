---
layout: default-2a
title: "Contact — Option 2"
description: >-
  Get in touch with Marcia Mount Shoop for speaking inquiries, media
  requests, or general questions.
permalink: /options/2a/contact/
---

<section class="page-hero">
  <h1 class="page-hero__title">Get in Touch</h1>
  <p class="page-hero__desc">For speaking engagements, media requests, or general questions — send a note and Marcia's team will follow up.</p>
</section>

<section class="section--tight wrap">
  <div class="contact-methods">
    <div class="contact-method">
      <div class="contact-method__title">Peace-ing Together Consulting</div>
      <div class="contact-method__desc">Booking a talk, retreat, or consulting engagement? See the <a class="section-link" href="{{ '/options/2a/peace-ing-together-consulting/' | relative_url }}">Peace-ing Together Consulting page</a> for programs and the inquiry form.</div>
    </div>
    <div class="contact-method">
      <div class="contact-method__title">Media &amp; Press</div>
      <div class="contact-method__desc">For interview requests or press materials, use the form below and note "Media" in your message.</div>
    </div>
  </div>
</section>

<section class="section--tight wrap" style="max-width:560px">
  <div class="form-status form-status--success" hidden data-form-status="sent">Thanks — your message is on its way to Marcia's team.</div>
  <div class="form-status form-status--error" hidden data-form-status="error">Something went wrong sending that. Please try again, or email directly.</div>
  <form class="inquiry__form" name="contact-2a" method="POST" action="{{ '/api/contact' | relative_url }}" style="background:#fff;border:1px solid var(--border);border-radius:var(--radius-lg);padding:32px">
    <input type="hidden" name="form-name" value="contact-2a">
    <input type="hidden" name="redirect" value="{{ '/options/2a/contact/' | relative_url }}">
    <input type="text" name="company" style="display:none" tabindex="-1" autocomplete="off">
    <input type="text" name="name" placeholder="Name" required style="background:var(--bg-soft)">
    <input type="email" name="email" placeholder="Email" required style="background:var(--bg-soft)">
    <textarea name="message" placeholder="Message" rows="4" required style="background:var(--bg-soft)"></textarea>
    <div class="cf-turnstile" data-sitekey="{{ site.turnstile_site_key }}"></div>
    <button type="submit" style="background:var(--navy);color:#fff">Send Message</button>
  </form>
</section>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<script src="{{ '/assets/js/form-status.js' | relative_url }}" defer></script>

{% include 2a/follow-along.html %}
{% include 2a/cta-band.html %}
