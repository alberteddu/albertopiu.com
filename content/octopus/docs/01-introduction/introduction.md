---
title: Introduction
type: page
layout: doc
skip-title: true
---

Octopus is a small utility that can be used to quickly generate files and directories.
To use Octopus, a configuration file must be created. This file is a JSON (`octopus.json`)
and it contains directives, variables, and blueprints, that determine how the
directory tree will look in the end.

I wrote Octopus to speed up creation of files and directories of a certain type 
of projects. These projects contain files which structure is verbose and repetitive, 
and can be easily described with templates.

You can download the latest .phar executable [here][latest]. 

After that, you can add the executable to the `$PATH` and just use
`octopus` from the command line. At this point, as long as a valid `octopus.json`
is present in the current working directory, you can generate the directory
tree by executing:

```bash
octopus build
```

[branches]: /branches
[latest]: https://alberteddu.github.io/octopus/downloads/octopus-latest.phar



