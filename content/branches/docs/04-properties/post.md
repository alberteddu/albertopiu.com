---
title: Properties
type: page
layout: doc
---

Many Branches entities, including Posts and Files, support setting and getting custom properties. 
This can be useful when using Extensions, which can add properties to posts.

```php
$post = $branches->get('/');
$post->setProperty('is-that-root', true);
$post->isPropertySet('is-that-root'); // true
$post->getProperty('is-that-root', /** default value */ false); // true
```

Properties can also be accessed via the magic method `__get`.

```php
$post->{'is-that-root'}; // true
```
