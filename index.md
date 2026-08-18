---
layout: default
title: "Marcia W. Mount Shoop"
description: >-
  Marcia W. Mount Shoop writes and speaks at the intersection of theology,
  embodiment, and justice. Explore her books, talks, and speaking
  engagements.
permalink: /
---

{% assign featured_book = site.books | where: "featured", true | first %}
{% unless featured_book %}{% assign featured_book = site.books | first %}{% endunless %}

<section class="hero hero--banded">
  <div class="hero__copy">
    <div class="hero__badge">{{ featured_book.badge_label | default: "New Release" }}</div>
    <h1 class="hero__title">{{ featured_book.title }}</h1>
    <p class="hero__desc">{{ featured_book.excerpt | default: featured_book.description }}</p>
    <div class="hero__actions">
      {% for vendor in featured_book.vendors %}
      <a class="btn {% if vendor.primary %}btn-primary{% else %}btn-outline{% endif %}" href="{{ vendor.url }}" target="_blank" rel="noopener">{{ vendor.name }}</a>
      {% endfor %}
    </div>
    {% if featured_book.on_sale_date %}<div class="hero__note">On sale beginning {{ featured_book.on_sale_date }}</div>{% endif %}
    <a class="hero__link" href="{{ featured_book.url | relative_url }}">Learn more about this book &#8594;</a>
  </div>
  {% if featured_book.cover %}
  <div class="hero__cover">
    <picture>
      <source srcset="{{ featured_book.cover | replace: '.jpeg', '.webp' | replace: '.jpg', '.webp' | replace: '.png', '.webp' | relative_url }}" type="image/webp">
      <img src="{{ featured_book.cover | relative_url }}" alt="Book cover of &ldquo;{{ featured_book.title }}&rdquo;" fetchpriority="high" decoding="async">
    </picture>
  </div>
  {% else %}
  <div class="hero__cover placeholder-block">
    {% if featured_book.cover_pending %}<span class="hero__cover-badge">Cover Coming Soon</span>{% endif %}
    <span class="placeholder-label">BOOK COVER<br>{{ featured_book.title }}</span>
  </div>
  {% endif %}
</section>

{% if featured_book.press %}
{% for item in featured_book.press %}

<section class="testimonial-band">
  <div class="testimonial">
    <div class="testimonial__mark">&ldquo;</div>
    <div class="testimonial__quote">{{ item.quote }}</div>
    <div class="testimonial__source">&mdash; {{ item.source }}</div>
  </div>
</section>
{% endfor %}
{% endif %}

<section class="press-strip">
  <span class="press-strip__label">As Seen In</span>
  <div class="press-strip__names">
    <a href="https://www.washingtonpost.com/climate-environment/2024/11/29/hurricane-helene-evictions-north-carolina/" target="_blank" rel="noopener">The Washington Post &#8599;</a>
    <a href="https://www.marketplace.org/story/2024/12/02/asheville-workers-rent-relief-hurricane-helene" target="_blank" rel="noopener">NPR's Marketplace &#8599;</a>
    <a href="https://religionnews.com/2025/01/23/after-helene-one-asheville-church-finds-a-way-to-step-it-up/" target="_blank" rel="noopener">Religion News Service &#8599;</a>
    <a href="https://pres-outlook.org/2024/10/what-we-should-know-about-the-culture-of-sports/" target="_blank" rel="noopener">Presbyterian Outlook &#8599;</a>
    <a href="{{ '/press/' | relative_url }}">More press &#8594;</a>
  </div>
</section>

<section class="about-teaser-section">
  <div class="about-teaser wrap">
    <picture>
      <source srcset="{{ '/assets/images/author/marcia-headshot.webp' | relative_url }}" type="image/webp">
      <img src="{{ '/assets/images/author/marcia-headshot.jpg' | relative_url }}" alt="Marcia Mount Shoop" class="about-teaser__photo" loading="lazy" decoding="async">
    </picture>
    <div class="about-teaser__panel">
      <div class="eyebrow about-teaser__eyebrow">About Marcia</div>
      <p class="about-teaser__quote">Marcia engages with communities and writes about the multigenerational trauma of white supremacy and the ways it shows up in our bodies, relationships, communities, and institutions.</p>
      <a class="about-teaser__link" href="{{ '/about/' | relative_url }}">Read full bio &#8594;</a>
    </div>
  </div>
</section>

<section class="section wrap">
  <h2 class="section-title">More by Marcia</h2>
  <div class="book-grid">
    {% assign other_books = site.books | where_exp: "b", "b.url != featured_book.url" | sort: "order" %}
    {% for book in other_books limit: 4 %}
    <a class="book-card" href="{{ book.url | relative_url }}">
      {% if book.cover %}
      <div class="book-card__cover">
        <picture>
          <source srcset="{{ book.cover | replace: '.jpeg', '.webp' | replace: '.jpg', '.webp' | replace: '.png', '.webp' | relative_url }}" type="image/webp">
          <img src="{{ book.cover | relative_url }}" alt="Book cover of &ldquo;{{ book.title }}&rdquo;" loading="lazy">
        </picture>
      </div>
      {% else %}
      <div class="book-card__cover placeholder-block"></div>
      {% endif %}
      <div class="book-card__title">{{ book.title }}</div>
      <div class="book-card__link">View more <svg class="book-card__icon" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    </a>
    {% endfor %}
  </div>
</section>

<section class="section--tight wrap">
  <h2 class="section-title">Explore</h2>
  <div class="programs-grid programs-grid--3">
    <a class="program-card" href="{{ '/talks/' | relative_url }}">
      <div class="program-card__title">Talks</div>
      <div class="program-card__desc">About Grace Covenant Presbyterian Church and where to find Marcia's sermons on YouTube.</div>
      <div class="contact-method__link">Learn more <svg class="contact-method__icon" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    </a>
    <div class="program-card program-card--teal">
      <div class="program-card__title">Podcasts</div>
      <div class="program-card__desc">
        <a class="section-link" href="{{ site.social_links.youtube }}">GCPC Podcast &#8594;</a><br><br>
        <a class="section-link" href="https://shoopsgoingdeep.com/" target="_blank">Going Deep, Blue Ridge Public Radio &#8594;</a>
      </div>
    </div>
    <a class="program-card program-card--green" href="{{ '/press/' | relative_url }}">
      <div class="program-card__title">Press</div>
      <div class="program-card__desc">Coverage from the Washington Post, New York Times, NPR, and more.</div>
      <div class="contact-method__link">Learn more <svg class="contact-method__icon" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    </a>
  </div>
</section>

{% include follow-along.html %}
{% include cta-band.html %}
