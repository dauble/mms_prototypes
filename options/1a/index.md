---
layout: default-1a
title: "Option 1a — Editorial Plum"
description: >-
  Marcia Mount Shoop writes and speaks at the intersection of theology,
  embodiment, and justice. Explore her books, writing, sermons, and
  speaking engagements.
permalink: /options/1a/
---
{% assign featured_book = site.books_1a | where: "featured", true | first %}
{% unless featured_book %}{% assign featured_book = site.books_1a | first %}{% endunless %}

{% include 1a/intro.html %}

<section class="hero-1a wrap">
  <div>
    <div class="eyebrow-1a" style="margin-bottom:16px">New Book</div>
    <h1 class="hero-1a__title">{{ featured_book.title }}</h1>
    <p class="hero-1a__desc">{{ featured_book.excerpt | default: featured_book.description }}</p>
    <div class="hero-1a__actions">
      {% if featured_book.amazon_url %}<a class="btn-1a btn-1a-primary" href="{{ featured_book.amazon_url }}">Buy on Amazon</a>{% endif %}
      {% if featured_book.bookshop_url %}<a class="btn-1a btn-1a-outline" href="{{ featured_book.bookshop_url }}">Bookshop.org</a>{% endif %}
      {% if featured_book.bn_url %}<a class="btn-1a btn-1a-outline" href="{{ featured_book.bn_url }}">Barnes &amp; Noble</a>{% endif %}
    </div>
    <div class="hero-1a__note">Affiliate links — see disclosure below</div>
  </div>
  <div class="hero-1a__cover placeholder-block-1a">
    <span class="placeholder-label-1a">BOOK COVER<br>{{ featured_book.title }}</span>
  </div>
</section>

<section class="section-1a--tight wrap">
  <div class="section-1a-head">
    <h2 class="section-1a-title">More by Marcia</h2>
    <a class="section-1a-link" href="{{ '/options/1a/books/' | relative_url }}">View all books &#8594;</a>
  </div>
  <div class="shelf-1a">
    {% assign other_books = site.books_1a | where_exp: "b", "b.url != featured_book.url" | sort: "date" | reverse %}
    {% for book in other_books %}
    <a class="book-card-1a" href="{{ book.url | relative_url }}">
      <div class="book-card-1a__cover placeholder-block-1a"></div>
      <div class="book-card-1a__title">{{ book.title }}</div>
    </a>
    {% endfor %}
  </div>
</section>

{% include 1a/follow-along.html %}

<section class="section-1a wrap">
  <h2 class="section-1a-title" style="margin-bottom:26px">Writing &amp; Talks</h2>
  <div class="talk-grid-1a">
    {% assign recent_writing = site.writing_1a | sort: "date" | reverse %}
    {% for entry in recent_writing limit: 3 %}
    <a class="talk-card-1a" href="{{ entry.url | relative_url }}">
      <div class="talk-card-1a__tag">{{ entry.type_label }}</div>
      <div class="talk-card-1a__title">{{ entry.title }}</div>
      <div class="talk-card-1a__excerpt">{{ entry.excerpt }}</div>
    </a>
    {% endfor %}
  </div>
</section>

{% include 1a/cta-triptych.html %}
