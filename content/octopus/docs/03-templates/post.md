---
title: Templates
type: page
layout: doc
---

What if we want to specify the contents of the files that Octopus is generating?
This is done by using templates. By default, Octopus will look for a `templates` 
directory in the same level as the `octopus.json` file. But we can also set the 
path to a custom value. Let's add a new file by using a template.

```json
{
    "target": "./result",
    "templates": "custom-templates",
    "output": [
        {
            "type": "file",
            "path": "readme.md",
            "template": "readme.md.twig"
        }
    ]
}
```

The resulting file will have the contents of the template `readme.md.twig`.

