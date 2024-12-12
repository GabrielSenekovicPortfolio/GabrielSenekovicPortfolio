---
layout: default
title: "Tags"
---
<h1>Tags</h1>
<ul>
  {% assign tags = site.posts | map: "tags" | join: "," | split: "," | uniq %}
  {% for tag in tags %}
    <li><a href="{{ site.baseurl }}/tags/{{ tag | slugify }}">{{ tag }}</a></li>
  {% endfor %}
</ul>