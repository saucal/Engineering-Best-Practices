---
page: vcs
title: Version Control
nav: Version Control
group: hidden
weight: 9
layout: default
permalink: /workflows/vcs/
subnav:
  - title: Repository Structure
    tag: repository-structure
  - title: Commits
    tag: commits
  - title: Branches
    tag: branches
  - title: Merges
    tag: merges
  - title: Backporting Client Changes
    tag: backporting-client-changes
updated: 18 Nov 2019
---

<div class="docs-section">
		{% capture vcs %}{% include markdown/VCS.md %}{% endcapture %}
		{{ vcs | markdownify }}
</div>