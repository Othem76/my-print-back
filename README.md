# Pour lancer le projet executer ces commandes:

## Lancer la base postgresSQL avec Docker

- IP du docker:
  - local: localhost
  - distant: 172.16.238.10

```bash
$ docker-compose up -d
```

### Information base de données

```md
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=azerty123
DB_DATABASE=myPrint
```

## Lancement de l'API

### Crée le .ENV

- Copier le fichier .env.example
- Coller dans un fichier .env

### Commandes

```bash
$ npm install
$ npm run migrate // une fois le docker opérationnel
$ npm run initDB // insére des utilisateurs dans la base
$ npm run start
```

## Information API

- Port de l'API: 3333

### Routes User

```
GET /getAllUsers
GET /getUserById/:id (exemple: "localhost:3333/getUserById/1")
GET /getUserByEmail (exemple: "http://localhost:3333/getUserByEmail?email=john@example.com") Email dans les QUERY PARAMS

POST /createUser, le body:
    - fullName: Gab (optionnel)
    - email: root@test.com
    - password: rootroot

PATCH /updateUser, le body:
    - id: 3
    - fullName: Gab (optionnel)
    - email: root2@test.com (optionnel)

DELETE /deleteUser/:id (exemple: "localhost:3333/1")
```
