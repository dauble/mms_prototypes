---
layout: default-2a
title: "Books — Option 2"
description: >-
  Browse all of Marcia Mount Shoop's books on theology, embodiment,
  trauma, healing, sports, and justice.
permalink: /options/2a/books/
---

<section class="page-hero">
  <h1 class="page-hero__title">Books</h1>
  <p class="page-hero__desc">Theology, embodiment, and justice — explored through memoir, cultural critique, and pastoral reflection.</p>
</section>

<section class="section wrap">
  <div class="book-grid">
    {% assign featured_books = site.books_2a | where: "featured", true %}
    {% assign other_books = site.books_2a | where_exp: "b", "b.featured != true" | sort: "order" %}
    {% assign all_books = featured_books | concat: other_books %}
    {% for book in all_books %}
    <a class="book-card" href="{{ book.url | relative_url }}">
      {% if book.cover %}
      <div class="book-card__cover">
        {% if book.featured %}<span class="hero__cover-badge">Featured</span>{% endif %}
        <img src="{{ book.cover | relative_url }}" alt="Book cover of &ldquo;{{ book.title }}&rdquo;" loading="lazy">
      </div>
      {% else %}
      <div class="book-card__cover placeholder-block">
        {% if book.featured %}<span class="hero__cover-badge">Featured</span>{% endif %}
      </div>
      {% endif %}
      <div class="book-card__title">{{ book.title }}</div>
      <div class="book-card__link">View more <svg class="book-card__icon" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    </a>
    {% endfor %}
  </div>
</section>

{% include 2a/follow-along.html %}
{% include 2a/cta-band.html %}
