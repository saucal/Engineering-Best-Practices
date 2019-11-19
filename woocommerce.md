---
page: woocommerce
title: WooCommerce
nav: WC
group: hidden
weight: 7
layout: default
permalink: /php/woocommerce/
subnav:
  - title: Performance
    tag: performance
  - title: Documentation Sources
    tag: documentation-sources
updated: 6 Oct 2014
---

<div class="docs-section">
		{% capture woocommerce %}{% include markdown/WooCommerce.md %}{% endcapture %}
		{{ woocommerce | markdownify }}
</div>