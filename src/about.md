---
layout: post
title: About
eleventyNavigation:
  key: About
  parent: Header
  order: 2
---

Welcome to my blog. A few words about me:

- self taught frontend developer with 5+ years of experience
- specialize in building React & TypeScript websites/web-apps
- leading one of the developer teams at Ingrid
- learning about CSS & design
- brewing specialty coffee using V60

I like giving back to community by being a mentor of [Django Girls](https://djangogirls.org/) or
[Geek Girls Carrots](https://gocarrots.org/). I like to organize events - I’m co-organizer of
[Wrocław TypeScript meetup](https://www.meetup.com/pl-PL/WrocTypeScript/) and
[Django Girls Wrocław](https://djangogirls.org/wroclaw/). If you need help with preparing tech event do not hesitate to contact me.

## Social media

{% for data in metadata.social %}

- [{{ data.title }}]({{ data.url }})

{% endfor %}