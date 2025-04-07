# Présentation du projet :

Le projet consiste à créer et générer des devis d'impression 3D.
Il implémente CuraEngine sous forme de web assembly (c++ compilé en javascript). Ce moteur Cura permet de slicer les pièces 3D et donc de donner une estimation du temps d'impression et de la quantité de matière nécessaire.

L'API utilise le framework Node.js Adonis, celui-ci permet d'avoir une API modulaire et d'implémenter différents modules facilement.

# Pour lancer le projet executez ces actions :

### Variables d'environnement (.env)

Les fichiers .env et .env.production sont inclus dans les sources du projet zippé remises à Mr. Meul.
Si vous cloner directement le repo depuis Git, vous n'aurez pas ces fichiers. 
Dans ce cas, récupérez le .env envoyé à Mr. Meul pour mettre en place l'environnement de développement et le .env.production pour mettre en place l'environnement de production.

### Lancer les dockers

Le docker-compose permet de créer tous les containers de développement (API, FRONT, BDD)
L'architecture doit être la suivante :
- Un dossier contenant les repository Back et Front (my-print-back et my-print-front)

Lancer la commande pour build les containers :

```bash
$ docker-compose up -d
```

Lors de l'exécution du docker-compose, la base de données va être peuplé avec les données présentes dans les seeders.

### Lancer l'API en ligne de commande

Pensez d'abord à installer les packages node :

```bash
$ npm install
```

Pour lancer l'API en ligne de commande sans utiliser Docker, il suffit d'utiliser la commande :

```bash
$ npm run dev
```

=> A noter : sans l'initialisation de la base de données (via le docker-compose), vous ne pourrez pas effectuer d'actions sur l'API depuis le frontend car les routes sont protégées par un token d'authentification, qui est automatiquement récupéré lors de la connexion de l'utilisateur.

### Information API

- Port de l'API: 3333

### Hébergement

- L'API est herbergé sur Azure sous forme de Container App. Puisque des fichiers sont écris directement sur le serveur, des solutions gratuites telles que Vercel, Netlify, Coolify, etc. ne sont pas possible.

- Avec votre compte junia, vous avez accès à des crédits Azure gratuit. Vous pourrez ainsi recréer l'environnement de production simplement sur Azure. Pour cela, vous devez herberger la base de données (par exemple sur Vercel), ensuite, remplacez les valeurs du **.env.production** par vos secrets.

- Ensuite, vous devez créer une CI/CD pour build et push votre image docker sur un container registry. Pour ce faire, vous pouvez modifier le fichier **build_push.yml** dans le dossier **.github/workflows** et remplacer les url du container registry par les votre.

- Si vous souhaitez utiliser le registry de github, vous n'aurez qu'à remplacer **"othem76"** par le pseudo GitHub du propriétaire du repo. Celui-ci devra ensuite créer un **Personal access token** (https://github.com/settings/tokens) pour pouvoir se connecter au container registry de GitHub et push l'image docker dessus dans la CI.

- Une fois toutes ces étapes réalisées, créez une Azure Container App sur Azure, renseignez le container registry que vous avez choisi (**ghcr.io/{username}** pour GitHub) et ajoutez les variables d'environnement du .env.production que vous avez modifié précédemment. Si vous avez bien effectué toutes ces étapes, vous devriez avoir votre application hebergée sur Azure.

- Vous n'avez plus qu'à modifier l'URL de l'API dans les variables d'environnement du Front-end (**REACT_APP_API_URL**).

# Contact pour toutes questions concernant le projet :
- Encadrant    : michael.meul@junia.com
