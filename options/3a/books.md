---
layout: default-3a
title: "Books — Option 3"
description: >-
  Browse all of Marcia Mount Shoop's books on theology, embodiment,
  trauma, healing, sports, and justice.
permalink: /options/3a/books/
---
<section class="page-hero">
  <h1 class="page-hero__title">Books</h1>
  <p class="page-hero__desc">Theology, embodiment, and justice — explored through memoir, cultural critique, and pastoral reflection.</p>
</section>

<section class="section wrap">
  <div class="book-grid">
    {% assign featured_books = site.books_3a | where: "featured", true %}
    {% assign other_books = site.books_3a | where_exp: "b", "b.featured != true" | sort: "date" | reverse %}
    {% assign all_books = featured_books | concat: other_books %}
    {% for book in all_books %}
    <a class="book-card" href="{{ book.url | relative_url }}">
      <div class="book-card__cover placeholder-block">
        {% if book.featured %}<span class="hero__cover-badge">Featured</span>{% endif %}
      </div>
      <div class="book-card__title">{{ book.title }}</div>
    </a>
    {% endfor %}
  </div>
</section>
