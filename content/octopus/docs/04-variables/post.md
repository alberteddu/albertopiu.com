---
title: Variables
type: page
layout: doc
---

Some variables can be defined in the file `octopus.json`. The variables can then
be used when defining the path of a file or directory, but also
the name of the template to be used.

Variables can also be accessed inside the Twig templates.

```json
{
    "target": "./result",
    "variables": {
        "name": "readme"
    },
    "templates": "custom-templates",
    "output": [
        {
            "type": "file",
            "path": "readme.md",
            "template": "{{ configuration.variables.name }}.md.twig"
        }
    ]
}
```
