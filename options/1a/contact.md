---
layout: default-1a
title: "Contact — Option 1"
description: >-
  Get in touch with Marcia Mount Shoop for speaking inquiries, media
  requests, or general questions.
permalink: /options/1a/contact/
---
<section class="page-hero-1a">
  <h1 class="page-hero-1a__title">Get in Touch</h1>
  <p class="page-hero-1a__desc">For speaking engagements, media requests, or general questions — send a note and Marcia's team will follow up.</p>
</section>

<section class="section-1a--tight wrap">
  <div class="contact-methods-1a">
    <div class="contact-method-1a">
      <div class="contact-method-1a__title">Speaking &amp; Events</div>
      <div class="contact-method-1a__desc">Booking a talk, retreat, or consulting engagement? See the <a class="section-1a-link" href="{{ '/options/1a/speaking/' | relative_url }}">Speaking page</a> for programs and the inquiry form.</div>
    </div>
    <div class="contact-method-1a">
      <div class="contact-method-1a__title">Media &amp; Press</div>
      <div class="contact-method-1a__desc">For interview requests or press materials, use the form below and note "Media" in your message.</div>
    </div>
  </div>
</section>

<section class="section-1a--tight wrap" style="max-width:560px">
  <form class="inquiry-1a__form" name="contact-1a" method="POST" data-netlify="true" netlify-honeypot="company" style="background:var(--cream-soft);border-radius:var(--radius);padding:32px">
    <input type="hidden" name="form-name" value="contact-1a">
    <input type="text" name="company" style="display:none" tabindex="-1" autocomplete="off">
    <input type="text" name="name" placeholder="Name" required style="background:#fff;border:1px solid var(--border)">
    <input type="email" name="email" placeholder="Email" required style="background:#fff;border:1px solid var(--border)">
    <textarea name="message" placeholder="Message" rows="4" required style="background:#fff;border:1px solid var(--border)"></textarea>
    <button type="submit">Send Message</button>
  </form>
</section>

{% include 1a/follow-along.html %}
