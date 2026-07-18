---
layout: default-7a
title: "Option 4 — Light & Airy Gradient"
description: >-
  Marcia Mount Shoop writes and speaks at the intersection of theology,
  embodiment, and justice. Explore her books, writing, sermons, and
  speaking engagements.
permalink: /options/7a/
---
{% assign featured_book = site.books_7a | where: "featured", true | first %}
{% unless featured_book %}{% assign featured_book = site.books_7a | first %}{% endunless %}

{% include 7a/intro.html %}

<section class="hero-7a">
  <div class="hero-7a__inner">
    <div>
      <h1 class="hero-7a__title">{{ featured_book.title }}</h1>
      <p class="hero-7a__desc">{{ featured_book.excerpt | default: featured_book.description }}</p>
      <div class="hero-7a__actions">
        {% if featured_book.amazon_url %}<a class="btn-7a btn-7a-primary" href="{{ featured_book.amazon_url }}">Buy on Amazon</a>{% endif %}
        {% if featured_book.bookshop_url %}<a class="btn-7a btn-7a-outline btn-7a-outline--teal" href="{{ featured_book.bookshop_url }}">Bookshop.org</a>{% endif %}
        {% if featured_book.bn_url %}<a class="btn-7a btn-7a-outline btn-7a-outline--blue" href="{{ featured_book.bn_url }}">Barnes &amp; Noble</a>{% endif %}
      </div>
      <div class="hero-7a__note">Affiliate links — see disclosure below</div>
    </div>
    <div class="hero-7a__cover">
      <div class="hero-7a__badge">New Release</div>
      <div class="hero-7a__cover-block">
        <span class="placeholder-label-7a">BOOK COVER<br>{{ featured_book.title }}</span>
      </div>
    </div>
  </div>
</section>

<section class="section-7a--flush">
  <div class="section-7a-head">
    <h2 class="section-7a-title">More by Marcia</h2>
    <a class="section-7a-link" href="{{ '/options/7a/books/' | relative_url }}">View all books &#8594;</a>
  </div>
  <div class="shelf-7a">
    {% assign other_books = site.books_7a | where_exp: "b", "b.url != featured_book.url" | sort: "date" | reverse %}
    {% for book in other_books %}
    <a class="book-card-7a" href="{{ book.url | relative_url }}">
      <div class="book-card-7a__cover placeholder-block-7a"></div>
      <span class="tag-pill-7a tag-pill-7a--{{ book.tag_class }} book-card-7a__tag">{{ book.category_short }}</span>
      <div class="book-card-7a__title">{{ book.title }}</div>
    </a>
    {% endfor %}
  </div>
</section>

<section class="talks-7a">
  <div class="talks-7a__inner">
    <div class="section-7a-head">
      <h2 class="section-7a-title">Writing &amp; Talks</h2>
    </div>
    <div class="talk-grid-7a">
      {% assign recent_writing = site.writing_7a | sort: "date" | reverse %}
      {% for entry in recent_writing limit: 3 %}
      <a class="talk-card-7a" href="{{ entry.url | relative_url }}">
        <span class="tag-pill-7a tag-pill-7a--{{ entry.type }} talk-card-7a__tag">{{ entry.type_label }}</span>
        <div class="talk-card-7a__title">{{ entry.title }}</div>
        <div class="talk-card-7a__excerpt">{{ entry.excerpt }}</div>
      </a>
      {% endfor %}
    </div>
  </div>
</section>

{% include 7a/cta-triptych.html %}
{% include 7a/follow-along.html %}
