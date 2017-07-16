---
title: Introduction
type: page
layout: doc
skip-title: true
---
Branches is a library that allows one to manage a directory of posts and attachments. 
To install the library, composer is required.

```bash
composer require branches/branches
```

Branches provides an API that can be used to query posts and files using _URLs_. 
This makes it suitable for use in static site generators and Content Management Systems.

A **post** is defined as a directory. All the files that are inside this directory are the **attachments** of
that post. It's important to note that by default Branches does not make any assumptions on the contents of the 
attachments. 

**Extensions** can be used to add _meaning_ to these files. For example, an extension could parse the 
source of a text attachment when it has a `markdown` extension, adding the produced markup as a property to the file.

To initialize a Branches instance, the path to a directory is required. This directory holds all the posts and 
attachments, and is itself the _root_ post.

```php
$branches = new Branches\Branches('path/to/content');
```
