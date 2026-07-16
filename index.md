---
layout: default
title: Home
description: >-
  Marcia Mount Shoop writes and speaks at the intersection of theology,
  embodiment, and justice. Explore her books, writing, sermons, and
  speaking engagements.
permalink: /
---
{% assign featured_book = site.books | where: "featured", true | first %}
{% unless featured_book %}{% assign featured_book = site.books | first %}{% endunless %}

<section class="hero">
  <div class="hero__copy">
    <div class="hero__badge">Featured Book</div>
    <h1 class="hero__title">{{ featured_book.title }}</h1>
    <p class="hero__desc">{{ featured_book.excerpt | default: featured_book.description }}</p>
    <div class="hero__actions">
      {% if featured_book.amazon_url %}<a class="btn btn-primary" href="{{ featured_book.amazon_url }}">Buy on Amazon</a>{% endif %}
      {% if featured_book.bookshop_url %}<a class="btn btn-outline" href="{{ featured_book.bookshop_url }}">Bookshop.org</a>{% endif %}
      {% if featured_book.bn_url %}<a class="btn btn-outline" href="{{ featured_book.bn_url }}">B&amp;N</a>{% endif %}
    </div>
    <a class="hero__link" href="{{ featured_book.url | relative_url }}">Learn more about this book &#8594;</a>
  </div>
  <div class="hero__cover placeholder-block">
    <span class="hero__cover-badge">Featured</span>
    <span class="placeholder-label">BOOK COVER<br>{{ featured_book.title }}</span>
  </div>
</section>

<section class="press-strip">
  <span class="press-strip__label">As Seen In</span>
  <div class="press-strip__names">
    <span>The Christian Century</span><span>Faith &amp; Leadership</span><span>Presbyterian Outlook</span><span>Sojourners</span>
  </div>
</section>

<section class="section wrap">
  <h2 class="section-title">More by Marcia</h2>
  <div class="book-grid">
    {% assign other_books = site.books | where_exp: "b", "b.url != featured_book.url" | sort: "date" | reverse %}
    {% for book in other_books limit: 4 %}
    <a class="book-card" href="{{ book.url | relative_url }}">
      <div class="book-card__cover placeholder-block"></div>
      <div class="book-card__title">{{ book.title }}</div>
    </a>
    {% endfor %}
  </div>
</section>

<section class="wrap" style="margin-bottom:60px">
  <div class="hero-photo" style="min-height:440px;display:flex;align-items:flex-end">
    <div class="hero-photo__scrim" style="background:linear-gradient(180deg,rgba(8,16,34,0) 35%,rgba(8,16,34,.88) 100%)"></div>
    <div class="hero-photo__label" style="top:20px">PHOTO: Marcia in community — full-bleed, royalty-free</div>
    <div style="position:relative;z-index:1;padding:48px 56px;max-width:560px">
      <div class="eyebrow" style="color:oklch(72% 0.11 175);margin-bottom:14px">About Marcia</div>
      <p style="font:400 21px/1.6 var(--font-serif);color:#fff;margin:0 0 18px">Healing is the heart of the work I do — pastoring, writing, and teaching at the intersection of theology, embodiment, and justice.</p>
      <a class="hero__link" style="color:#fff;border-bottom-color:rgba(255,255,255,.6)" href="{{ '/about/' | relative_url }}">Read full bio &#8594;</a>
    </div>
  </div>
</section>

<section class="section--tight wrap">
  <h2 class="section-title">Writing &amp; Talks</h2>
  <div class="talk-cards">
    {% assign recent_writing = site.writing | sort: "date" | reverse %}
    {% for entry in recent_writing limit: 3 %}
    <a class="talk-card" href="{{ entry.url | relative_url }}">
      <div class="talk-card__tag tag-{{ entry.type }}">{{ entry.type_label }}</div>
      <div class="talk-card__title">{{ entry.title }}</div>
      <div class="talk-card__excerpt">{{ entry.excerpt }}</div>
    </a>
    {% endfor %}
  </div>
  <div style="text-align:right;margin-top:16px"><a class="section-link" href="{{ '/writing-and-talks/' | relative_url }}">See all writing &amp; talks &#8594;</a></div>
</section>

{% include follow-along.html %}
{% include cta-band.html %}
