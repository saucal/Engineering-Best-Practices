---
page: introduction
title: Introduction
nav: Home
group: navigation
weight: 1
layout: default
subnav:
  - title: Audience
    tag: audience
  - title: Goal
    tag: goal
  - title: Philosophy
    tag: philosophy
  - title: Contributing
    tag: contributing
updated: 6 Oct 2014
---

<div class="toc">
	<div class="toc-content">
		<header>
			<h2>Table of Contents</h2>
		</header>
		{% assign pages_list = site.pages | sort: "weight" %}
		{% assign group = 'navigation' %}
		{% include Util/pages_list_toc %}
	</div>
</div>

<div class="docs-section">
		{% capture introduction %}{% include markdown/Introduction.md %}{% endcapture %}
		{{ introduction | markdownify }}
</div>
