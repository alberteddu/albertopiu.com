---
title: The post
type: page
layout: doc
---
Let's work on a slightly more complex directory tree.

<div class="directory-tree" data-url="/branches/docs/03-post/example-tree.json"></div>

With an instance of `PostInterface`, other methods are available. They mostly relate to the relationships that exist 
between posts. For example, `isRoot` can be used to determine if a post is the _root_ post.

```php
$root = $branches->get('/');
$root->isRoot(); // true
```

`getParent` is used to get the parent of a post. This is of course not possible with the root post. In that case, 
this method will return `NULL`.

```php
$root = $branches->get('/');
$root->getParent(); // NULL
$branches->get('blog')->getParent()->is($root); // true
$branches->get('blog')->getParent()->isRoot(); // true
```

`getParents`, on the other hand, will return the list of parents of a post. The list will be empty in the case of the
 root post.
 
```
$post = $branches->get('/blog/first-post');

foreach ($post->getParents() as $parents) {
    echo $parents->getUrl() . PHP_EOL;
}

/*
 * This will print
 *  
 *  /
 *  /blog
 */
```

The method `getChildren` can be used to get the children of a post. It will return an instance of `PostList`, that 
extends `ArrayObject`.

```php
/** @var \Branches\Node\PostInterface $blog */
$blog = $branches->get('blog');

foreach ($blog->getChildren() as $child) {
    echo $child->getUrl() . PHP_EOL;
}

/*
 * This will print
 *  
 *  /blog/first-post
 *  /blog/second-post
 *  /blog/third-post
 */
```

On the other hand, `getSiblings` will return the list of siblings of a post.

```php
/** @var \Branches\Node\PostInterface $firstPost */
$firstPost = $branches->get('blog/first-post');

foreach ($firstPost->getSiblings() as $sibling) {
    echo $sibling->getUrl() . PHP_EOL;
}

/*
 * This will print
 *  
 *  /blog/second-post
 *  /blog/third-post
 */
```

Finally, the method `getAttachments` will return a list of file attachments, as an instance of `FileList`.

```php
$post = $branches->get('/blog/second-post');

foreach ($post->getAttachments() as $attachment) {
    echo $attachment->getUrl() . PHP_EOL;
}

/*
 * This will print
 *
 * /blog/second-post/img.png
 */
```
