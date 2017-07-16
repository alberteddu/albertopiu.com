---
title: Extension that implement DynamicNodeExtensionInterface
type: page
layout: doc
---

Finally, extensions can implement `DynamicNodeExtensionInterface`:

```php
interface DynamicNodeExtensionInterface extends ExtensionInterface
{
    /**
     * @param ComponentHolder $queue
     */
    public function getDynamicPostProviders(ComponentHolder $queue);

    /**
     * @param ComponentHolder $queue
     */
    public function getDynamicFileProviders(ComponentHolder $queue);
}
```

The extension can then queue Dynamic Post and File Providers (classes that implement
`DynamicPostProviderInterface` and `DynamicFileProviderInterface`, respectively).
Both interfaces extend `DynamicNodeProviderInterface`, and they share the same method:

```php
public function provide(Url $url, PostInterface $post);
```

This method must then return an array of `DynamicPost` or `DynamicFile`.
