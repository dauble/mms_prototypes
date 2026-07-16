---
layout: default
title: Contact
description: >-
  Get in touch with Marcia Mount Shoop for speaking inquiries, media
  requests, or general questions.
permalink: /contact/
---
<section class="page-hero">
  <h1 class="page-hero__title">Get in Touch</h1>
  <p class="page-hero__desc">For speaking engagements, media requests, or general questions — send a note and Marcia's team will follow up.</p>
</section>

<section class="section--tight wrap">
  <div class="contact-methods">
    <div class="contact-method">
      <div class="contact-method__title">Speaking &amp; Events</div>
      <div class="contact-method__desc">Booking a talk, retreat, or consulting engagement? See the <a class="section-link" href="{{ '/speaking/' | relative_url }}">Speaking page</a> for programs and the inquiry form.</div>
    </div>
    <div class="contact-method">
      <div class="contact-method__title">Media &amp; Press</div>
      <div class="contact-method__desc">For interview requests or press materials, use the form below and note "Media" in your message.</div>
    </div>
  </div>
</section>

<section class="section--tight wrap" style="max-width:560px">
  <form class="inquiry__form" name="contact" method="POST" data-netlify="true" netlify-honeypot="company" style="background:#fff;border:1px solid var(--border);border-radius:var(--radius-lg);padding:32px">
    <input type="hidden" name="form-name" value="contact">
    <input type="text" name="company" style="display:none" tabindex="-1" autocomplete="off">
    <input type="text" name="name" placeholder="Name" required style="background:var(--bg-soft)">
    <input type="email" name="email" placeholder="Email" required style="background:var(--bg-soft)">
    <textarea name="message" placeholder="Message" rows="4" required style="background:var(--bg-soft)"></textarea>
    <button type="submit" style="background:var(--navy);color:#fff">Send Message</button>
  </form>
</section>

{% include follow-along.html %}
