---
title: Extension that implement UrlExtensionInterface
type: page
layout: doc
---

Extensions can also implement `UrlExtensionInterface`:

```php
interface UrlExtensionInterface extends ExtensionInterface
{
    /**
     * @param ComponentHolder $queue
     */
    public function getUrlSegmentVoters(ComponentHolder $queue);
}
```

The extension can then queue URL Segment Voters, in the same fashion as Resolution Filters.
The elements added to this queue must implement the interface `UrlSegmentVoterInterface`.
Classes of this type can determine how a directory name is mapped to a URL segment.

For example, it can be used to have leading numbers in directory names (like `01-blog`)
to achieve ordering, while allowing the URL to be `/blog`. It is the job of the 
segment voter to convert the string between the two formats.
