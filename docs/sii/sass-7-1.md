# Sass 7-1 pattern

This module creates a [Sass 7-1 architecture pattern](https://sass-guidelin.es/#the-7-1-pattern).

## Module structure

It integrates and/or modify the following list of files.

<pre>
├──  src/app
|   └──  index.scss
|
├──  src/styles
|   └──  abstracts/
│       └──  _variables.scss
|   └──  base/
│       |──  _core.scss
│       └──  _typography.scss
|   └──  components/
│       └──  _button.scss
|   └──  layout/
│       └──  _header.scss
|   └──  pages/
│       └──  _home.scss
|   └──  themes/
│       └──  _theme.scss
|   └──  vendors/
│       |──  _bootstrap.scss
│       └──  _foundation.scss
└──
</pre>

## More

For more information, please go to the [Sass Guidelines](https://sass-guidelin.es/#the-7-1-pattern) made by Hugo Giraudel.
