GitBook Theming for niolabs
==============

This plugin will give your gitbooks niolabs-styling.

## How to use

Add the plugin to your book.json file.

You point the plugin to the niolabs GitHub repo since `theme-nio` is not currently published to npm:

```json
"plugins": [
    "theme-nio@git://github.com/niolabs/gitbook-plugin-theme-nio.git"
  ]
```

Note: `theme-nio` is the name to use for the plugin, the standard `gitbook-plugin` prefix will automatically be prepended to this root when you run `gitbook install` on your book.

## Configuration

### Active Location in Header
To highlight the active location of your book in the header, specify `active-location` in the `pluginsConfig` for `theme-nio`

```json
"pluginsConfig": {
    "theme-nio": {
      "active-location": "workshop"
    }
  }
```

The active class will be added to the nav item with the corresponding id: `id="nav__list--${active-location}"`. For example, the above configuration will highlight any nav item where `id="nav__list--workshop"`.

## Capitalization
All nav elements, inputs, buttons, h1, and h2 elements are lowercased. To allow uppercase, add a <span class="allow-caps"></span> to override the text transformation. Remember not to use markdown inside of html elements like span. 

## Images
Standard markdown images will be centered.

For variation in styling and sizes, you can use simple html. Include the size, if any, using html height="300" or width="600" and one or more of the following classes:

- **left**: left justified, top and bottom margins only, no padding
- **right**: float right; top, bottom, and left margins
- **display**: adds more padding and margin
- **border**: adds padding and a border with rounded corners
- **shadow**: adds rounded corners and a box shadow, all margins
- **inline**: no padding, no margins, display inline, small border radius, use for images embedded in text, for example:
  click the user icon <img class="inline" src="/img/organizations/user-icon.png" height="25"/> in the top navigation

### Examples

```
<img class="border display" src="/img/signal-flow-service.png" height="300" />

<img class="right border" src="/img/expressions/rename.png" width="250"/>

<img class="left" src="/img/cloud/Hello-SelectSystemCreateInstancePoint.png" width="600" />

```

## Blocks

### Video Embed
To embed a video, use the following block in the text of your book. The "watch" link will be transformed into a div containing an iframe with an embed url. Both YouTube and Vimeo links are supported.

```text
{% video %}https://www.youtube.com/watch?v=OkfVMPjzkhE{% endvideo %}
```

### Dynamic Year
The tag
```text
{% year %}{% endyear %}
```

Will display the current year.

## Alerts

Sample alerts:

### Info

> **[info] Info Title**
>
> A good place for hint and information.

### Warning

> **[warning] Warning Title**
>
> Put your curve ball or warning here. Hazard.

### Danger

> **[danger] Danger Title**
>
> Add a red flag here. Contains an example of what not to do.


### success

> **[success] Success Title**
>
> Add positive, success, or affirmative information here.
