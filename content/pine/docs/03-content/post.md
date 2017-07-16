---
title: Content
type: page
layout: doc
---

Content files reside in the `content` directory (or in the directory that is set in the configuration
file under `content`). As described in the documentation of [Branches][docs], every folder contained 
in this directory is a post, where the folder itself is considered the root post.

Pine will look for a markdown file in every post, to be used as the content file. This file
will contain a YAML front matter where the post meta data can be specified, and a markdown
body.

```markdown
---
title: A post title
layout: blog
---

The post *content*.
```

As you can see here, a title is included, as well as a layout. Pine will use this layout, 
or it will use `default` if none is specified. More on layouts can be found on the next section.

Every other file in a post is considered an attachment.

[docs]: /branches/docs
