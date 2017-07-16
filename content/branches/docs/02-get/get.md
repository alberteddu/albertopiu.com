---
title: "NodeInterface: posts and attachments" 
type: page
layout: doc
---
To get a post, the method `Branches\Branches::get` can be used. 

```php
/**
 * @param $url
 *
 * @return NodeInterface
 *
 * @throws NodeNotFoundException
 */
public function get($url = '/');
```

As you can see, this method can throw an Exception when the post is not found, so it's always a good idea to wrap the
 call in a try-catch block.
 
```php
try {
    $post = $branches->get('blog/some-post');
} catch (\Branches\Node\NodeNotFoundException $e) {
    // Handle the Exception
}
```

At this point, `$post` is an instance of `NodeInterface`. This interface applies to both posts and files, and is 
extended by `PostInterface` and `FileInterface`. The `get` method will return both posts and files depending on the 
path that is used. For example, consider the following simple directory tree.

<div class="directory-tree" data-url="/branches/docs/02-get/example-tree.json"></div>

```php
$rootPost = $branches->get('/'); // This will be an instance of PostInterface
$imageFile = $branches->get('img.png'); // This will be an instance of FileInterface
```

The two interfaces have in common three important methods:

```php
/**
 * @return Url
 */
public function getUrl();

/**
 * @return string
 */
public function getPath();

/**
 * @param NodeInterface $node
 *
 * @return bool
 */
public function is(NodeInterface $node);
```

The URL will be respectively `/` and `/img.png` for the root post and for the image file, while `getPath` will return
 the absolute path to the directory and the file. The method `is` can be used to check if two nodes are the same.
 
```php
$rootPost->is($imageFile); // false
```

`FileInterface` has only one method, `getPost`:

```php
/**
 * @return PostInterface
 */
public function getPost();
```

This method returns the post that contains the file attachment. Which means:

```php
$imageFile->getPost()->is($rootPost); // true
```

