---
layout: default-2a
title: "Option 2 — Navy Classic"
description: >-
  Marcia W. Mount Shoop writes and speaks at the intersection of theology,
  embodiment, and justice. Explore her books, talks, and speaking
  engagements.
permalink: /options/2a/
---

{% assign featured_book = site.books_2a | where: "featured", true | first %}
{% unless featured_book %}{% assign featured_book = site.books_2a | first %}{% endunless %}

<section class="hero">
  <div class="hero__copy">
    <div class="hero__badge">New Release</div>
    <h1 class="hero__title">{{ featured_book.title }}</h1>
    <p class="hero__desc">{{ featured_book.excerpt | default: featured_book.description }}</p>
    <div class="hero__actions">
      {% for vendor in featured_book.vendors %}
      <a class="btn {% if vendor.primary %}btn-primary{% else %}btn-outline{% endif %}" href="{{ vendor.url }}">{{ vendor.name }}</a>
      {% endfor %}
    </div>
    <a class="hero__link" href="{{ featured_book.url | relative_url }}">Learn more about this book &#8594;</a>
  </div>
  <div class="hero__cover placeholder-block">
    {% if featured_book.cover_pending %}<span class="hero__cover-badge">Cover Coming Soon</span>{% endif %}
    <span class="placeholder-label">BOOK COVER<br>{{ featured_book.title }}</span>
  </div>
</section>

{% if featured_book.press %}
{% for item in featured_book.press %}

<section class="testimonial-band">
  <div class="testimonial">
    <div class="testimonial__mark">&ldquo;</div>
    <div class="testimonial__quote">{{ item.quote }}</div>
    <div class="testimonial__source">&mdash; {{ item.source }}</div>
  </div>
</section>
{% endfor %}
{% endif %}

<section class="press-strip">
  <span class="press-strip__label">As Seen In</span>
  <div class="press-strip__names">
    <span>The Washington Post</span><span>NPR's Marketplace</span><span>Religion News Service</span><span>Presbyterian Outlook</span>
  </div>
</section>

<section style="margin-bottom:60px">
  <div class="hero-photo" style="min-height:440px;display:flex;align-items:flex-end">
    <div class="hero-photo__scrim" style="background:linear-gradient(180deg,rgba(8,16,34,0) 35%,rgba(8,16,34,.88) 100%)"></div>
    <div class="hero-photo__label" style="top:20px">PHOTO: Marcia headshot — full-bleed, royalty-free</div>
    <div style="position:relative;z-index:1;padding:48px 56px;max-width:560px">
      <div class="eyebrow" style="color:oklch(72% 0.11 175);margin-bottom:14px">About Marcia</div>
      <p style="font:400 21px/1.6 var(--font-serif);color:#fff;margin:0 0 18px">Marcia engages with communities and writes about the multigenerational trauma of white supremacy and the ways it shows up in our bodies, relationships, communities, and institutions.</p>
      <a class="hero__link" style="color:#fff;border-bottom-color:rgba(255,255,255,.6)" href="{{ '/options/2a/about/' | relative_url }}">Read full bio &#8594;</a>
    </div>
  </div>
</section>

<section class="section wrap">
  <h2 class="section-title">More by Marcia</h2>
  <div class="book-grid">
    {% assign other_books = site.books_2a | where_exp: "b", "b.url != featured_book.url" | sort: "order" %}
    {% for book in other_books limit: 4 %}
    <a class="book-card" href="{{ book.url | relative_url }}">
      <div class="book-card__cover placeholder-block"></div>
      <div class="book-card__title">{{ book.title }}</div>
    </a>
    {% endfor %}
  </div>
</section>

<section class="section--tight wrap">
  <h2 class="section-title">Explore</h2>
  <div class="programs-grid programs-grid--3">
    <a class="program-card" href="{{ '/options/2a/talks/' | relative_url }}">
      <div class="program-card__title">Talks</div>
      <div class="program-card__desc">About Grace Covenant Presbyterian Church and where to find Marcia's sermons on YouTube.</div>
    </a>
    <div class="program-card program-card--teal">
      <div class="program-card__title">Podcasts</div>
      <div class="program-card__desc">
        <a class="section-link" href="#">GCPC Podcast &#8594;</a><br><br>
        <a class="section-link" href="https://shoopsgoingdeep.com/" target="_blank">Going Deep, Blue Ridge Public Radio &#8594;</a>
      </div>
    </div>
    <a class="program-card program-card--green" href="{{ '/options/2a/press/' | relative_url }}">
      <div class="program-card__title">Press</div>
      <div class="program-card__desc">Coverage from the Washington Post, New York Times, NPR, and more.</div>
    </a>
  </div>
</section>

{% include 2a/follow-along.html %}
{% include 2a/cta-band.html %}
