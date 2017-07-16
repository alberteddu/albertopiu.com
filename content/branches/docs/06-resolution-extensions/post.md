---
title: Extension that implement ResolutionExtensionInterface
type: page
layout: doc
---

Branches bundles a core Extension called `PropertiesExtension`.
This extension implements `ResolutionExtensionInterface`. 

```php
class PropertiesExtension extends Extension implements ResolutionExtensionInterface
{
    /**
     * @return string
     */
    public function getName()
    {
        return 'branches-properties';
    }

    /**
     * @param ComponentHolder $queue
     */
    public function getResolutionFilters(ComponentHolder $queue)
    {
        $queue->insert(new PropertiesResolutionFilter(), -1000);
    }
}
```

As you can see, extensions that implement this interface must implement also the method
`getResolutionFilters`. This method can add new filters to the queue. Every resolution
filter has to implement `ResolutionFilterInterface`, which includes one method.

```php
public function filter(Url $url, ResolutionInterface $resolution, ResolutionInterface $originalResolution);
```

Every time Branches tries to resolve a URL, it will call this method of all Resolution Filters
it has registered. They can then alter the result (for example, determine that a certain
URL will resolve to a Post &mdash; even if it does not exist; or the opposite, too), add properties, etc.

The first parameter `$url` refers to the URL Branches is trying to resolve. `$resolution` is 
the current result of the process, while `$originalResolution` was the first result (which
would have been returned in the event of no Resolution Extensions being registered). 
