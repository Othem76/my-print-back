# Présentation du projet :

Le projet consiste à créer et générer des devis d'impression 3D.
Il implémente CuraEngine sous forme de web assembly (c++ compilé en javascript). Ce moteur Cura permet de slicer les pièces 3D et donc de donner une estimation du temps d'impression et de la quantité de matière nécessaire.

L'API utilise le framework Node.js Adonis, celui-ci permet d'avoir une API modulaire et d'implémenter différents modules facilement.

# Pour lancer le projet executez ces actions :

### Crée le .ENV

Récupérer le .env envoyé à Mr. Meul pour mettre en place l'environnement de développement et le .env.production pour mettre en place l'environnement de production.

### Lancer les dockers

Le docker-compose permet de créer tous les containers (API, FRONT, BDD)
L'architecture doit être la suivante :
- Un dossier contenant les repository Back et Front (my-print-back et my-print-front)

Lancer la commande pour build les containers :

```bash
$ docker-compose up -d
```

Lors de l'exécution du docker-compose, la base de données va être peuplé avec les données présentes dans les seeders.

### Information API

- Port de l'API: 3333

# Contact pour toutes questions concernant le projet :
- Développeurs : t.mouisse@gmail.com
- Encadrant    : michael.meul@junia.com
