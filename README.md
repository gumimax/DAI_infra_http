# DAI: laboratoire infrastructure http
### T. Germano & G. Courbat

---

## Description 

Ce laboratoire a pour but de nous familiariser avec différentes technologies web et 
mettre en place une petite infrastructure composée de serveurs http statiques et 
dynamiques ainsi que d'un reverse proxy en utilisant Docker. 

Remarque: Nous n'avons pas utilisé des branches pour chaque phase de 
développement mais des tags pour indiquer l'avancement.

---
## Etape 1: Serveur statique http avec apache httpd

- Premièrement, nous allons nous rendre sur docker hub chercher l'image apache 7.
2 qui contient un serveur httpd.
- Deuxièmement, nous allons chercher sur le web un template bootstrap pour que 
  nous utiliserons pour notre serveur.

Maintenant que nous avons notre image et notre template, nous pouvons créer notre 
serveur http "dockerisé". On crée un dossier "docker_image" qui servira à 
contenir les images dockers. Dans ce dossier, on crée un autre dossier nommé 
"apache_php_image" qui contiendra notre Dockerfile et notre template http. On va 
placer notre template dans un dossier "content". 

### Commandes:
  Dockerfile:

 ```
FROM php:7.2-apache
 
COPY content/ /var/www/html
```
Effet: télécharger l'image docker correspondante et y copier le contenu du 
template dans un répertoire. 

Pour build et lancer le container, on va utiliser les commandes (en étant dans le 
répertoire: 
apache_php_image): 
 ```
docker build -t dai/apache_php .

docker run -p 9090:80 dai/apache_php
```

Le container est lancé et accessible via le port 9090 de la machine. 
Nous pouvons accéder au site web depuis un navigateur en tapant localhost:9090 
dans la bare de recherche. 

Pour accéder au container en execution avec un shell bash: 
 ```
docker exec -it <nom_du_container> /bin/bash
```
Les fichiers de configuration se trouvent dans /etc/apache2

---

## Etape 2: Serveur dynamique avec express.js

Nous allons nous rendre sur docker hub chercher l'image node. On utilisera la 
version 16:15:0. Ensuite, nous allons créer les répertoires. Dans le répertoire 
docker_image, on crée le dossier express_image. Dans ce dossier, on crée le 
dossier src qui va contenir notre serveur dynamique ainsi que le Dockerfile qui 
contiendra les commandes d'initialisation. 

Pour utiliser node, on doit initialiser sa structure ainsi que télécharger les 
modules qu'on aimerait utiliser. Dans le dossier src, on va utiliser les commandes: 
 ```
npm init
npm i --save chance
nmp i --save express
```
Nous allons maintenant pouvoir développer notre application qui génére du contenu 
dynamique. On crée le fichier index.js dans le répertoire express_image.
Notre application génère un JSON qui contient des quotes avec des syllabes 
aléatoires. 

### Commandes:
Dockerfile:

 ```
FROM node:16:15.0
 
COPY src/ /opt/app

CMD ["node", "/opt/app/index.js"]
```
Effet: télécharger l'image docker correspondante, y copier le contenu de src 
dans un /opt/app et executer la commande node qui aura comme effet de démarrer le 
serveur dynamique contenant notre application. 

Pour build et lancer le container, on va utiliser les commandes (en étant dans le
répertoire:
express_image):
 ```
docker build -t dai/express .

docker run -p 9091:3000 dai/express
```

Le container est lancé et accessible via le port 9091 de la machine.
Nous pouvons accéder à l'application depuis un navigateur en tapant localhost:9091
dans la bare de recherche.

---

## Etape 3: Reverse Proxy avec Traefik

Pour cette étape, nous avons dû regrouper nos installations dans un fichier 
docker-compose.yml ainsi que d'y ajouter le container de traefik. 

Le fichier docker compose permet de déployer tous les containers. On utilise les 
commandes:
 ```
docker compose up
docker compose down
```
Pour déployer et démarrer l'infrastructure avec tous les containers ou stopper 
infrastructure.

Le fichier contient aussi les règles de trafic internet et de configuration.

Entre autre les règles:
 ```
"traefik.http.routers.nodeserver.rule=Host(`localhost`) && PathPrefix(`/api`)"

"traefik.http.routers.apache.rule=Host(`localhost`)"
```
Permettent d'être redirigé vers le serveur dynamique en accédant à l'url: 
localhost/api et d'accéder au serveur static en utilisant l'url: locahhost.


Remarques: 
- le .yml contient une erreur au tag step 3
la ligne: 
 ```
command: --api.insecure = true --providers.docker
```
devrait être: 
 ```
command: --api.insecure=true --providers.docker
```
- On peut acceder à l'interface de traefic à l'adresse suivant:
 ```
localhost:8080
```

---
## Etape 6: Management UI

