# Anchor Remote Control
![In-page navigation script](https://static.onlc.eu/anchorrcNDD/164710071339.png)

Wherever you are on a webpage, a remote control follows you and helps you navigate throw the anchors. It is a simple way to navigate within a long webpage.

[**🌍  Website**](https://arc.onlinecreation.pro)

## How to add to my website

1. If you already use Bootstrap 5, that awesome, you don't need any CSS. Else, download [anchorremotecontrol.nobootstrap.css](https://static.onlc.eu/scripts/anchorremotecontrol/0.0.1/anchorremotecontrol.nobootstrap.css) and include it to your website.

```html
<link rel="stylesheet" src="anchorremotecontrol.nobootstrap.css" />
```

2. This CSS adds common Bootstrap utilities. It might have side effects on your website.
3. Download [anchorremotecontrol.js](https://static.onlc.eu/scripts/anchorremotecontrol/0.0.1/anchorremotecontrol.js).
4. Upload it to your website.
5. Add this just before the closing body tag:
```html
<script src="anchorremotecontrol.js"></script>
```
6. Add a different id attribute to each of your heading tags (h1, h2, h3, h4 and h5). If a heading already has an id attribute, but you don't want it in the ARC, add data-arc-ignore to the heading.

You might also direct link us:
```html
<!-- Insert this just before your </body> -->
<script src="https://static.onlc.eu/scripts/anchorremotecontrol/0.0.1/anchorremotecontrol.js"></script>

<!-- If you don't use Bootstrap 5, insert this befire your </head> -->
<link rel="stylesheet" src="https://static.onlc.eu/scripts/anchorremotecontrol/0.0.1/anchorremotecontrol.nobootstrap.css" />
```

## FAQ

### How to customize the active color?

  If you use Bootstrap, the active color is the main color of your theme. The quick and dirty way :
  ```html
  <style>
    .anchorremotecontrol .list-group-item.active {
      background-color: #125F00;
      border-color: #125F00;
    }
  </style>
  ```
  If you don't use Bootstrap, you can change the active color by defining the CSS var --arc-active-color before calling anchorremotecontrol.nobootstrap.css.
  ```html
  <style>
    :root{--arc-active-color: #125f00;}
  </style>
  <link rel="stylesheet" src="https://static.onlc.eu/scripts/anchorremotecontrol/0.0.1/anchorremotecontrol.nobootstrap.css" />
  ```

### When I scroll to a heading, it scrolls too far and my heading is hidden. How can I fix this?

Just add this before calling anchorremotecontrol.js:
```html
<script>
  let headingTopMargin = 100;
</script>
<script src="https://static.onlc.eu/scripts/anchorremotecontrol/0.0.1/anchorremotecontrol.js"></script>
```
Adapt the *100* to your needs.

## About

Anchor remote control is a project by [Online Creation](https://www.onlinecreation.pro), a web agency based in France.
They are also the creators of [OnlineCreation.me](https://www.onlinecreation.me), the easiest website creation platform ever made.

## License

This project is licensed under the MIT license.

## Support

Nope, sorry. But this is simple code, I'm sure you'll handle it ! :)

If you are completely lost, try to file an issue on GitHub, maybe someone will help you.