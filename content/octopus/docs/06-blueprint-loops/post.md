---
title: Blueprint loops and grouping
type: page
layout: doc
---

Sometimes it is useful to generate one file or one directory per each blueprint instance defined in data.
This can be done by specifying the property `blueprint` in a file or directory definition.

```json
{
    "output": [
        {
            "type": "file",
            "path": "some-path",
            "blueprint": "release"
        }
    ]
}
```

In this example, this file will be generated for every instance of the blueprint `release`.
Of course, this will keep generating the same file over and over. By specifing `blueprint`,
we'll have access to another template property with the same name. Thus we can do:

```json
{
    "output": [
        {
            "type": "file",
            "path": "{{ blueprint.version }}.html",
            "blueprint": "release",
            "template": "{% if not blueprint.stable %}un{% endif %}stable.html.twig"
        }
    ]
}
```

Now, let's go back to our release example. We might want to manage multiple libraries
with this method. That's why we would like to add a new blueprint called `library`.

```json
"blueprints": {
    "library": {
        "variables": {
            "name": {
                "type": "string",
                "required": true
            }
        }
    },
    "release": {
        "variables": {
            "library": {
                "type": "string",
                "required": true
            },
            "link": {
                "type": "string",
                "required": true
            },
            "version": {
                "type": "string",
                "required": true
            },
            "stable": {
                "type": "boolean",
                "default": true
            }
        }
    }
}
```

As you can see, we also added a variable `library` to the `release` blueprint.
This way, we can define multiple libraries and multiple versions of every library.

However, how can we generate one HTML _per library_? We could loop over the library
blueprint instances, but there's a better way to achieve this result. We can use
the `group` property in our file definition. If this property and the `blueprint`
property are defined, Octopus will first group the data instances by the provided value.

We can change our file definition this way:

```json
{
    "output": [
        {
            "type": "file",
            "path": "{{ blueprints[0].library }}.html",
            "template": "releases.html.twig",
            "blueprint": "release",
            "group": "library"
        }
    ]
}
```

Every time the file is generated, the variable `blueprint` will not be available, because
now the instances are grouped by the property `library`. Now, instead, the variable
`blueprints` will be available. It will contain the list of instances of the current group.

Therefore we also have to slightly change our template:

```html
<h1>
    {{ blueprints[0].library }} <!-- this changed -->
</h1>

<ul class="releases">
    <!-- and also this changed -->
    {% for release in blueprints %}
        <li class="release {% if release.stable %}stable{% else %}unstable{% endif %}">
            <h2>{{ release.version }}</h2>
            <a href="{{ release.link }}">Download</a>
        </li>
    {% endfor %}
</ul>
```

Finally, let's add some libraries information:

```json
{
    "data": {
        "library": [
            {
                "name": "my-awesome-library"
            },
            {
                "name": "my-other-awesome-library"
            }
        ],
        "release": [
            {
                "library": "my-awesome-library",
                "link": "http://example.com/downloads/0.0.1/software.phar",
                "version": "0.0.1"
            },
            {
                "library": "my-awesome-library",
                "link": "http://example.com/downloads/unstable/0.0.2beta/software.phar",
                "version": "0.0.2beta",
                "stable": false
            },
            {
                "library": "my-other-awesome-library",
                "link": "http://example.com/downloads/0.0.1/other-library.phar",
                "version": "0.0.1"
            }
        ]
    }
}
```

Building now will generate two files, as expected, where each file will contain
the version information just like before.

```bash
Wrote file "/.../result/my-awesome-library.html"
Wrote file "/.../result/my-other-awesome-library.html"
```
