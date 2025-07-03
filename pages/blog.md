---
sidebar: true
---

<div class="content-box">
    <h1> Welcome to my blog! </h1>
    To the right, you can browse my posts. I will fill this page with my highlights once I have posted a bit more.
    <br><br>
     {%- if site.posts.size > 0 -%}
        <h3 class="post-list-heading">{{ page.list_title | default: "Latest posts" }}</h3>
        <ul class="post-list">
        {%- for post in site.posts -%}
        <li>
            {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
            <h3>
            <a class="post-link" href="{{ post.url | relative_url }}">
                {{ post.title | escape }} <span class="post-meta">{{ post.date | date: date_format }}</span>
            </a>
            </h3>
            {%- if site.show_excerpts -%}
            {{ post.excerpt }}
            {%- endif -%}
        </li>
        {%- endfor -%}
        </ul>
    {%- endif -%}

    <h3>Tags</h3>
    {% assign all_tags = site.tags | sort %}
    {% if all_tags.size > 0 %}
        <ul>
            {% for tag in all_tags %}
                <li>
                    <a href="{{ site.baseurl }}/tags/{{ tag[0] | slugify }}">
                        {{ tag[0] }} ({{ tag[1].size }})
                    </a>
                </li>
            {% endfor %}
        </ul>
    {% else %}
        <p>No tags found. Make sure your posts have tags in the front matter.</p>
    {% endif %}
</div>