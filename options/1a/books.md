---
layout: default-1a
title: "Books — Option 1a"
description: >-
  Browse all of Marcia Mount Shoop's books on theology, embodiment,
  trauma, healing, sports, and justice.
permalink: /options/1a/books/
---
<section class="page-hero-1a">
  <h1 class="page-hero-1a__title">Books</h1>
  <p class="page-hero-1a__desc">Theology, embodiment, and justice — explored through memoir, cultural critique, and pastoral reflection.</p>
</section>

<section class="section-1a wrap">
  <div class="book-grid-1a">
    {% assign featured_books = site.books_1a | where: "featured", true %}
    {% assign other_books = site.books_1a | where_exp: "b", "b.featured != true" | sort: "date" | reverse %}
    {% assign all_books = featured_books | concat: other_books %}
    {% for book in all_books %}
    <a class="book-card-1a" href="{{ book.url | relative_url }}">
      <div class="book-card-1a__cover placeholder-block-1a">
        {% if book.featured %}<span class="book-card-1a__badge">Featured</span>{% endif %}
      </div>
      <div class="book-card-1a__title">{{ book.title }}</div>
    </a>
    {% endfor %}
  </div>
</section>
