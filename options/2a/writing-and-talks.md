---
layout: default-2a
title: "Writing & Talks — Option 2"
description: >-
  Blog reflections, sermons, and press mentions from Marcia Mount Shoop
  in one place — sortable by type.
permalink: /options/2a/writing-and-talks/
---
<section class="section wrap" style="padding-bottom:30px">
  <h1 style="font:700 40px var(--font-serif);color:var(--navy-deep);margin:0 0 12px">Writing &amp; Talks</h1>
  <p style="font:400 15.5px/1.7 var(--font-sans);color:var(--muted);max-width:560px;margin:0 0 26px">Blog reflections, sermons, and press mentions in one place — sortable by type.</p>
  <div class="filter-bar" data-filter-bar role="group" aria-label="Filter by type">
    <button class="filter-pill" data-filter="all" aria-pressed="true">All</button>
    <button class="filter-pill" data-filter="blog" aria-pressed="false">Blog</button>
    <button class="filter-pill" data-filter="sermon" aria-pressed="false">Sermons</button>
    <button class="filter-pill" data-filter="news" aria-pressed="false">In the News</button>
  </div>
</section>

{% assign all_writing = site.writing_2a | sort: "date" | reverse %}
{% assign featured_entry = all_writing | where: "featured", true | first %}
{% unless featured_entry %}{% assign featured_entry = all_writing | first %}{% endunless %}

<section class="section--tight wrap">
  <a class="featured-entry" href="{{ featured_entry.url | relative_url }}">
    <div class="featured-entry__media placeholder-block">
      <span class="placeholder-label">FEATURED IMAGE</span>
    </div>
    <div class="featured-entry__body">
      <div class="talk-card__tag tag-{{ featured_entry.type }}">{{ featured_entry.type_label }} &middot; Latest</div>
      <div style="font:600 20px var(--font-serif);color:var(--navy-deep);margin-bottom:10px">{{ featured_entry.title }}</div>
      <div style="font:400 14px/1.7 var(--font-sans);color:var(--muted);margin-bottom:12px">{{ featured_entry.excerpt }}</div>
      <span class="section-link">Continue reading &#8594;</span>
    </div>
  </a>
</section>

<section class="section--tight wrap">
  <div class="entry-grid">
    {% assign rest_writing = all_writing | where_exp: "e", "e.url != featured_entry.url" %}
    {% for entry in rest_writing %}
    <a class="talk-card entry-card" href="{{ entry.url | relative_url }}" data-entry-type="{{ entry.type }}">
      <div class="talk-card__tag tag-{{ entry.type }}">{{ entry.type_label }}</div>
      <div class="talk-card__title">{{ entry.title }}</div>
      <div class="talk-card__meta">{{ entry.meta }}</div>
      <div class="talk-card__excerpt">{{ entry.excerpt }}</div>
    </a>
    {% endfor %}
  </div>
</section>
