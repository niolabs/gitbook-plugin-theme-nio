GitBook Theming for niolabs
==============

This plugin will give your gitbooks niolabs-styling.

## How to use

Add the plugin to your book.json file.

You will point the plugin to the nioinnovation GitHub repo like this (since `theme-nio` is not currently published to npm):

```json
"plugins": [
    "theme-nio@git://github.com/nioinnovation/gitbook-plugin-theme-nio.git"
  ]
```

Note: `theme-nio` is the name to use for the plugin, the standard `gitbook-plugin` prefix will automatically be prepended to this root when you run `gitbook install` on your book.

## Configuration

### Active Location in Header
To highlight the active location of your book in the header, specify `active-location` in the `pluginsConfig`

```json
"pluginsConfig": {
    "theme-nio": {
      "active-location": "workshop"
    }
  }
```

The active class will be added to the corresponding nav item with `id="nav__list--${active-location}"`. For example, , if present, the above configuration will highlight the nav item with `id="nav__list--workshop"`.

## Blocks

### video embed
To embed a video, use the following block in the text of your book

```{% video %}https://www.youtube.com/watch?v=OkfVMPjzkhE{% endvideo %}```
