---
page: markup
title: Markup
nav: Markup
group: navigation
weight: 3
layout: default
subnav:
  - title: Philosophy
    tag: philosophy
  - title: HTML5 Structural Elements
    tag: html5-structural-elements
  - title: Accessibility
    tag: accessibility
  - title: Progressive Enhancement
    tag: progressive-enhancement
updated: 23 April 2015
---

<div class="docs-section">
		{% capture markup %}{% include markdown/Markup.md %}{% endcapture %}
		{{ markup | markdownify }}
</div>