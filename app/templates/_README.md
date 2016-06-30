# <%- props.appName %> Frontend

## Tables des matières

1. [Pré-requis machine](#pre-requis-machine)
2. [Installation](#installation)
3. [Tâches gulp](#taches-gulp)
4. [Configuration](#configuration)
5. [Analyse de code](#analyse-de-code)
6. [Bonnes pratiques AngularJS](#bonnes-pratiques-angularjs)
7. [Documentation](#documentation)
8. [Tests](#tests)

## Pré-requis machine

* NodeJS & npm
* git
* conf proxy si besoin (cf: https://gist.github.com/manekinekko/2b4a29fe35c292b6f72f)
* modules gulp<% if (props.packageManager.key === 'bower') { -%> et bower <% } -%> en global


## Installation

```sh
$ npm install               # Développement
$ npm install --production  # Production
<% if (props.packageManager.key === 'bower') { -%>
$ bower install
<% } -%>
```

## Tâches gulp

* **serve**: Déploie un browser-sync + livereload
* **serve --env [production]**: Déploie un browser-sync + livereload avec un environnement production
* **build**: Build l'application avec un environnement par défaut en 'development'
* **build --env [production]**: Build l'application avec un environnement production
* **lint**: Linters pour JS / ESLint, HTML / htmlhint
* **docs:build**: Génère la documentation (ng-doc)

## Configuration

Les fichiers de configuration du sont disponibles dans le dossier `config/`.

Pour ajouter un nouvel environnement, il faut lui créer un dossier à son nom (minuscule et pas de caractères speciaux) et ajouter le fichier `project.service.config.json` correspondant.
Ensuite il est possible d'utiliser les commandes `gulp` avec le paramètres `--env ENV` pour utiliser celui-ci.

## Analyse de code

Pour analyser le code AngularJS, utilisez `ESLint` combiné avec son fichier de règles `.eslintrc` (Pré-requis: Package [eslint](https://www.npmjs.com/package/eslint)).
Pour analyser le code JavaScript, utilisez :

* `JSCS` combiné avec son fichier de règles `.jscsrc` (Pré-requis: Package [jscs](https://www.npmjs.com/package/jscs))
* `JSHint` combiné avec son fichier de règles `.jshintrc` (Pré-requis: Package [jshint](https://www.npmjs.com/package/jshint))

## Bonnes pratiques AngularJS

Le linter eslint-angularJS utilise les règles de bonnes pratiques listées ici:

https://github.com/johnpapa/angular-styleguide

## Documentation

Pour générer la documentation:

```sh
$ gulp docs:build
```

La documentation est générée dans le dossier `/dist/doc` et peut être visualiée en lancant le fichier `index.html` dans un serveur HTTP.

### API

Sur l'interface, l'onglet `API` permet de visualiser la documentation du code.

### Guide

Sur l'interface, l'onglet `Guide` permet de visualier les guides rédigés à la main dans le dossiers `docs/content/guide` et le fichier `docs/content/guide.ngdoc`.

1. Toute la documentation est à rédiger en Markdown.
2. Le contenu du dossier `docs/content/guide` génère automatiquement une table des matières en se basant sur le titre des fichiers (`@name`)

### Syntaxe ng-doc

https://github.com/idanush/ngdocs/wiki/API-Docs-Syntax
http://www.podpea.co.uk/blog/starting-off-with-ngdocs/
http://www.chirayuk.com/snippets/angularjs/ngdoc

## Tests

Seul des tests unitaires sont joués pour le projet. Aucun tests fonctionnels n'est prévu à part ceux du Product Owner.
Concernant le navigateur IE, ils seront joués en local sur un poste de développement.
Pour le reste, c'est un PhantomJS (moteur Webkit) qui jouera les tests dans la PIC.

### Tests en local

#### Sous Windows avec PhantomJS

1. une version standalone de PhantomJS est disponible dans les sources du projet, répertoire tools/phantomjs
2. lancer PhantomJS en mode Webdriver en choisissant votre OS dans un terminal : 

```sh
$ cd tools/phantomjs/phantomjs-2.0.0-linux-x86_64
$ phantomjs --webdriver=4444
```

3. lancer ensuite les tests dans un autre terminal :

```sh
$ gulp tests
```

#### Sous Windows avec IE + Selenium

1. une version standalone de selenium est disponible dans les sources du projet, répertoire tools/selenium
2. lancer selenium en pointant vers le driver IE correspondant à votre OS (32 ou 64bits) :

```sh
$ cd tools/selenium/
$ java -jar selenium-server-standalone-2.45.0.jar -Dwebdriver.ie.driver=../IEDriver/IEDriverServer_Win32_2.45.0/IEDriverServer.exe
```

ou

```sh
$ cd tools/selenium/
$ java -jar selenium-server-standalone-2.45.0.jar -Dwebdriver.ie.driver=../IEDriver/IEDriverServer_x64_2.45.0/IEDriverServer.exe
```

3. lancer ensuite les tests dans un autre terminal :

```sh
$ gulp tests-ng-ie
```

#### Ecriture des tests

La référence des fichiers de tests est à ajouter dans ./test/intern-browser.js , tableau "suites"

#### Aide

Commande pour trouver quel process écoute sur le port 4444

```sh
$ lsof -i :4444
```
