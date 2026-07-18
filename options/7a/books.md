---
layout: default-7a
title: "Books — Option 4"
description: >-
  Browse all of Marcia Mount Shoop's books on theology, embodiment,
  trauma, healing, sports, and justice.
permalink: /options/7a/books/
---
<section class="page-hero-7a">
  <div class="page-hero-7a__inner">
    <h1 class="page-hero-7a__title">Books</h1>
    <p class="page-hero-7a__desc">Theology, embodiment, and justice — explored through memoir, cultural critique, and pastoral reflection.</p>
  </div>
</section>

<section class="section-7a">
  <div class="book-grid-7a">
    {% assign featured_books = site.books_7a | where: "featured", true %}
    {% assign other_books = site.books_7a | where_exp: "b", "b.featured != true" | sort: "date" | reverse %}
    {% assign all_books = featured_books | concat: other_books %}
    {% for book in all_books %}
    <a class="book-card-7a" href="{{ book.url | relative_url }}">
      <div class="book-card-7a__cover placeholder-block-7a"></div>
      <span class="tag-pill-7a tag-pill-7a--{{ book.tag_class }} book-card-7a__tag">{{ book.category_short }}</span>
      <div class="book-card-7a__title">{{ book.title }}</div>
    </a>
    {% endfor %}
  </div>
</section>
