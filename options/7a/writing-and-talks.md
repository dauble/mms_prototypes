---
layout: default-7a
title: "Writing & Talks — Option 4"
description: >-
  Blog reflections, sermons, events, and press mentions from Marcia
  Mount Shoop in one place — sortable by type.
permalink: /options/7a/writing-and-talks/
---
<section class="writing-hero-7a">
  <div class="writing-hero-7a__inner">
    <h1 class="writing-hero-7a__title">Writing &amp; Talks</h1>
    <div class="filter-bar-7a" data-filter-bar role="group" aria-label="Filter by type">
      <button class="filter-pill-7a" data-filter="all" aria-pressed="true">All</button>
      <button class="filter-pill-7a" data-filter="blog" aria-pressed="false">Blog</button>
      <button class="filter-pill-7a" data-filter="sermon" aria-pressed="false">Sermons</button>
      <button class="filter-pill-7a" data-filter="event" aria-pressed="false">Events</button>
      <button class="filter-pill-7a" data-filter="press" aria-pressed="false">Press</button>
    </div>
  </div>
</section>

<section class="entry-grid-7a">
  {% assign all_writing = site.writing_7a | sort: "date" | reverse %}
  {% for entry in all_writing %}
  <a class="entry-card-7a entry-card-7a--{{ entry.type }}" href="{{ entry.url | relative_url }}" data-entry-type="{{ entry.type }}">
    <span class="tag-pill-7a tag-pill-7a--{{ entry.type }} entry-card-7a__tag">{{ entry.type_label }}</span>
    <div class="entry-card-7a__title">{{ entry.title }}</div>
    <div class="entry-card-7a__excerpt">{{ entry.excerpt }}</div>
  </a>
  {% endfor %}
</section>
