---
title: Introduction
type: page
layout: doc
skip-title: true
---

Pine is a static site generator. It uses [Branches][branches] at its core to
convert a directory of content to a static collection of HTML and CSS.
You can download the latest .phar executable [here][latest]. 

After that, you can add the executable to the `$PATH` and just use
`pine` from the command line. At this point, you can create a new site with:

```bash
pine new blog # Where blog is the name of your site
cd blog
```

To serve the file at `http://127.0.0.1:8080` for development, use the `serve` command:

```bash
pine serve
```

Finally, use the command `build` to generate the static site.

```bash
pine build
```

[branches]: /branches
[latest]: https://alberteddu.github.io/pine/downloads/pine-latest.phar
