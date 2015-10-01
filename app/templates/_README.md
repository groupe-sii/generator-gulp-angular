###<%- appName %> Frontend

## Pre-requis machine

- nodejs & npm
- git
- conf proxy si besoin (cf: https://gist.github.com/manekinekko/2b4a29fe35c292b6f72f)
- module gulp, bower, jscs en global

## Installation

```
npm install & bower install
```

## Tâches gulp

serve : déploie un browser-sync+livereload

build : build l'application avec un environnement par défaut en 'development'

build --env production : build l'application avec un environnement production

lint : linters for JS / Jshint, less / recess, html / htmlhint

tests : lance les tests unitaires et browser si configurés

## Analyse de code

Suivre cette doc:
https://yannick.cr/posts/enforcing-coding-rules-in-your-team-with-jscs/post

1. npm install jscs -g
2. install SublimeLinter plugin
3. install Sublime​Linter-jscs

## Architecture

## Navigateurs

1: XXX
2: XXX

## Guide de code AngularJS

Le linter eslint-angularJS utilise les règles de bonnes pratiques listées ici :

https://github.com/johnpapa/angular-styleguide

## ng-doc

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
```
cd tools/phantomjs/phantomjs-2.0.0-linux-x86_64
phantomjs --webdriver=4444
```

3. lancer ensuite les tests dans un autre terminal :
```
gulp tests
```

#### Sous Windows avec IE + Selenium

1. une version standalone de selenium est disponible dans les sources du projet, répertoire tools/selenium
2. lancer selenium en pointant vers le driver IE correspondant à votre OS (32 ou 64bits) :

```
cd tools/selenium/
java -jar selenium-server-standalone-2.45.0.jar -Dwebdriver.ie.driver=../IEDriver/IEDriverServer_Win32_2.45.0/IEDriverServer.exe
```

ou

```
cd tools/selenium/
java -jar selenium-server-standalone-2.45.0.jar -Dwebdriver.ie.driver=../IEDriver/IEDriverServer_x64_2.45.0/IEDriverServer.exe
```

3. lancer ensuite les tests dans un autre terminal :
```
gulp tests-ng-ie
```

#### Ecriture des tests

La référence des fichiers de tests est à ajouter dans ./test/intern-browser.js , tableau "suites"

#### Aide

Commande pour trouver quel process écoute sur le port 4444
```
lsof -i :4444
```
