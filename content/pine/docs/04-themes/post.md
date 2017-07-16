---
title: Themes
type: page
layout: doc
---

A single pine theme will contain some configuration, public files (like JavaScript, or CSS), and twig templates.

<div class="directory-tree" data-url="/pine/docs/04-themes/example-tree.json"></div>

When the site is generated, all contents of the theme public directory will be moved to the 
generated site directory, where they will be under a folder called `theme`.

The templates can access the configuration of the theme and the site by using the variables 
`theme` and `site`, respectively. For example, a theme could support both "serif" and "sans-serif"
styles by having the configuration on the theme config directory:

```yaml
style: serif
```

And in the templates, the configuration value can be accessed with:

```html
<body class="style-{{ theme.config.style }}">
    <h1>{{ site.config.title }}</h1>
    ...
```
