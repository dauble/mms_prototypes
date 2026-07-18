---
layout: default-7a
title: "Contact — Option 4"
description: >-
  Get in touch with Marcia Mount Shoop for speaking inquiries, media
  requests, or general questions.
permalink: /options/7a/contact/
---
<section class="page-hero-7a">
  <div class="page-hero-7a__inner">
    <h1 class="page-hero-7a__title">Get in Touch</h1>
    <p class="page-hero-7a__desc">For speaking engagements, media requests, or general questions — send a note and Marcia's team will follow up.</p>
  </div>
</section>

<section class="section-7a">
  <div class="contact-methods-7a">
    <div class="contact-method-7a">
      <div class="contact-method-7a__title">Speaking &amp; Events</div>
      <div class="contact-method-7a__desc">Booking a talk, retreat, or consulting engagement? See the <a class="section-7a-link" href="{{ '/options/7a/speaking/' | relative_url }}">Speaking page</a> for programs and the inquiry form.</div>
    </div>
    <div class="contact-method-7a">
      <div class="contact-method-7a__title">Media &amp; Press</div>
      <div class="contact-method-7a__desc">For interview requests or press materials, use the form below and note "Media" in your message.</div>
    </div>
  </div>
</section>

<section class="section-7a" style="max-width:560px">
  <form class="inquiry-7a__form" name="contact-7a" method="POST" data-netlify="true" netlify-honeypot="company" style="background:var(--tint-follow);border-radius:var(--radius);padding:32px">
    <input type="hidden" name="form-name" value="contact-7a">
    <input type="text" name="company" style="display:none" tabindex="-1" autocomplete="off">
    <input type="text" name="name" placeholder="Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <textarea name="message" placeholder="Message" rows="4" required></textarea>
    <button type="submit">Send Message</button>
  </form>
</section>

{% include 7a/follow-along.html %}
