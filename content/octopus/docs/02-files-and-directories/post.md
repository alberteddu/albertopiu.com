---
title: Files and directories
type: page
layout: doc
---

The simplest `octopus.json` will look like this:

```json
{
    "output": []
}
```

It will not generate any files. It is useful to specify the `target` property as it 
will decide where the directory tree will be generated. The value of this property
defaults to `./`.

```json
{
    "target": "./result",
    "output": []
}
```

`output` is an array that contains objects. Every item in this array corresponds
to a file or directory being created. Let's add one file and an empty directory.

```json
{
    "target": "./result",
    "output": [
        {
            "type": "file",
            "path": "about/readme.md"
        },
        {
            "type": "directory",
            "path": "empty"
        }
    ]
}
```

If we build now, the resulting tree will look like this:

<div class="directory-tree" data-url="/octopus/docs/02-files-and-directories/example-tree.json"></div>

And some messages will be printed on the console:

```bash
Wrote file "/.../result/about/readme.md"
Wrote directory "/.../result/empty"
```

If we try to build again, Octopus will warn us that some files may be rewritten.
We can choose to skip those files, or overwrite them.

```bash
File /.../result/about/readme.md already exists. Overwrite?
  [0] Skip
  [1] Overwrite
  [2] Overwrite all
 > 2
Overwrote file "/.../result/about/readme.md"
Directory exists: "/.../result/empty"
```
