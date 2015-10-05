# Angular Translate

This module uses the [angular-translate](https://angular-translate.github.io/) module.

## Module structure

It integrates and/or modify the following list of files.

<pre>
├──  config/
|   └──  languages/
│       |──  en.json
│       └──  fr.json
|
├──  gulp/
│       └──  config.js
│
├──  src/
│   ├──  app/
│   │   └──  index.js
|   |
│   └──  index.html
└──
</pre>

## Gulp task

The ```gulp config``` task will watch the translation files and update the ```/src/app/config.js``` file on save.

## Translate

### Use another language

```
$translate.use('fr');
```

### JS side translation

```
$translate.instant('app.title');
```

### HTML side translate

```
{{ 'app.title' | transalte }};
```

## New language

To add a new language, you must :
* Create the new json file ```/config/languages/LANG.json```
* Inform the translate provider in the ```index.js```