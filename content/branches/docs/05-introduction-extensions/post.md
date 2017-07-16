---
title: Introduction to extensions
type: page
layout: doc
---

You can use Extensions to change Branches behavior, use custom components, and add functionality. 
In this chapter, we will see how can one create an Extension and register it in a Branches instance.

When using Branches, a `\Branches\Branches` instance is available. This class provides a method
called `useExtension`.

```php
public function useExtension(ExtensionInterface $extension);
```

Calling this method will register the passed `ExtensionInterface` in the Branches instance.
Let's define a very simple extension. Every Branches extension needs to implement the interface
`\Branches\Extension\ExtensionInterface`, which requires the method `getName`. 
This should return a string that indicates the name of the extension.

```php
class SimpleExtension implements \Branches\Extension\ExtensionInterface
{
    /**
     * @return string
     */
    public function getName()
    {
        return 'simple';
    }
}

$branches = new Branches\Branches('path/to/content');
$branches->useExtension(new SimpleExtension());
```

At the moment, the extension will not do anything nor add any custom functionality.
How to do that? The Branches package provides a set of interfaces. Each one of them
relates to a set of functionalities. When a certain extension implements a given interface, 
Branches will use that extension as needed.
