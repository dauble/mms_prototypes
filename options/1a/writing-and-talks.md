---
layout: default-1a
title: "Writing & Talks — Option 1a"
description: >-
  Blog reflections, sermons, and press mentions from Marcia Mount Shoop
  in one place — sortable by type.
permalink: /options/1a/writing-and-talks/
---
<section class="section-1a wrap" style="padding-bottom:30px">
  <h1 style="font:700 40px var(--font-serif);color:var(--ink);margin:0 0 12px">Writing &amp; Talks</h1>
  <p style="font:400 15.5px/1.7 var(--font-sans);color:var(--muted);max-width:560px;margin:0 0 26px">Blog reflections, sermons, and press mentions in one place — sortable by type.</p>
  <div class="filter-bar-1a" data-filter-bar role="group" aria-label="Filter by type">
    <button class="filter-pill-1a" data-filter="all" aria-pressed="true">All</button>
    <button class="filter-pill-1a" data-filter="blog" aria-pressed="false">Blog</button>
    <button class="filter-pill-1a" data-filter="sermon" aria-pressed="false">Sermons</button>
    <button class="filter-pill-1a" data-filter="news" aria-pressed="false">In the News</button>
  </div>
</section>

{% assign all_writing = site.writing_1a | sort: "date" | reverse %}
{% assign featured_entry = all_writing | where: "featured", true | first %}
{% unless featured_entry %}{% assign featured_entry = all_writing | first %}{% endunless %}

<section class="section-1a--tight wrap">
  <a class="featured-entry-1a" href="{{ featured_entry.url | relative_url }}">
    <div class="featured-entry-1a__media placeholder-block-1a">
      <span class="placeholder-label-1a">FEATURED IMAGE</span>
    </div>
    <div>
      <div class="talk-card-1a__tag">{{ featured_entry.type_label }} &middot; Latest</div>
      <div class="featured-entry-1a__title">{{ featured_entry.title }}</div>
      <div class="featured-entry-1a__excerpt">{{ featured_entry.excerpt }}</div>
      <span class="section-1a-link">Continue reading &#8594;</span>
    </div>
  </a>
</section>

<section class="section-1a--tight wrap">
  <div class="entry-grid-1a">
    {% assign rest_writing = all_writing | where_exp: "e", "e.url != featured_entry.url" %}
    {% for entry in rest_writing %}
    <a class="talk-card-1a entry-card-1a" href="{{ entry.url | relative_url }}" data-entry-type="{{ entry.type }}">
      <div class="talk-card-1a__tag">{{ entry.type_label }}</div>
      <div class="talk-card-1a__title">{{ entry.title }}</div>
      <div class="talk-card-1a__meta">{{ entry.meta }}</div>
      <div class="talk-card-1a__excerpt">{{ entry.excerpt }}</div>
    </a>
    {% endfor %}
  </div>
</section>
