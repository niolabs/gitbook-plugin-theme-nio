GitBook Theming for niolabs
==============

This plugin will give your gitbooks niolabs-styling.

## How to use

Add the plugin to your book.json file.

You will point the plugin to the private github repo like this (since `theme-nio` is not currently published to npm):

```
"plugins": [
    "theme-nio@git://github.com/nioinnovation/gitbook-plugin-theme-nio.git"
  ]
```

Note: `theme-nio` is the name to use for the plugin, the standard `gitbook-plugin` prefix will automatically be prepended to this root when you run `gitbook install` on your book.
