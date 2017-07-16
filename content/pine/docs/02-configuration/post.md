---
title: Configuration
type: page
layout: doc
---

To generate a website, Pine needs **content** and a **theme**. A pine website will look like this:

<div class="directory-tree" data-url="/pine/docs/02-configuration/example-tree.json"></div>

The configuration file allows you to customize the name of the directories. The default
configuration looks like this:

```yaml
theme: default
content: content
build: build
plugins: []
```

The options `content` and `build` refer to what directories are to be used for storing
respectively the content files and the generated site. 
With `theme`, you can choose the active theme, which is to be found in the `themes` directory.
And finally, `plugins` is a list of PHP classes that pine will use as plugins.
