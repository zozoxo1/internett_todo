# Todo Liste (Frontend und Backend)

Dieses Projekt beinhaltet eine Frontend Webanwendung, welche eine Todo Liste darstellt.
Es ist möglich, einen Todo Eintrag zu erstellen, in bearbeitung zu setzen und zu löschen.
<br>Um den Status eines Todo Eintrags zu ändern, muss man lediglich auf den jeweiligen Eintrag draufklicken.
<br>Es gibt hierbei verschiedene Modis / farben für einen Todo Eintrag:
* Weißer Hintergrund: Todo Eintrag ist offen
* Gelber Hintergrund: Todo Eintrag ist in Bearbeitung
* Grauer Hintergrund / durchgestrichen: Todo Eintrag ist abgehakt

Beim erstellen eines Todo Eintrages, wird ein Titel und ein Datum + Uhrzeit benötigt.

## Table of Contents
***
1. [Installation](#installation)
    * [Konsolenbefehle](#konsolenbefehle)
    * [Einstellungen](#einstellungen-in-der-env-datei)
2. [Packages / Libraries](#packages--libraries)
3. [MongoDB Schema](#mongodb-schema)

## Installation
***
Anleitung zur Verwendung dieses Projektes
### Konsolenbefehle
```
$ git clone https://github.com/zozoxo1/internett_todo.git
$ cd ../path/to/the/file
$ cd backend/
$ npm install
$ node app.js
```
>Mit dem letzten Befehl wird das Backend gestartet.<br>
Für eine __Produktive Umgebung__ ist darauf zu achten, dass der Backend Ordner __nicht__ von außerhalb zu erreichen ist!

### Einstellungen in der .env Datei
***
Für die Verwendung des Backends ist es notwendig, dass die Variablen in der *.env* Datei angepasst werden. Eine __MongoDB__ Datenbank ist erforderlich.
<br><br>

## MongoDB Schema
Schema eines MongoDB Datenbank Eintrags
```
    _id:    ID des Eintrags
  title:    Titel des Eintrags
    due:    Datum, bis wann das Todo zu erledigen ist
 status:    Statues des Eintrags
```

## Packages / Libraries
***
Liste der verwendeten Packages und Bibliotheken
* [Cors Package](https://www.npmjs.com/package/cors): Version 2.8.5 
* [Dotenv](https://github.com/motdotla/dotenv): Version 16.0.1
* [Express](https://www.npmjs.com/package/express): Version 4.18.1
* [MongoDB](https://www.npmjs.com/package/mongodb): Version 4.6.0