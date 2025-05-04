# EcoBlissBath

Eco Bliss Bath est une start-up de 20 personnes, spécialisée dans la vente de produits de beauté écoresponsables dont le produit principal est un savon solide. La start-up propose une large gamme de savons solides avec des fonctionnalités telles que :

- Une interface intuitive pour les utilisateurs
- Une gestion des stocks dynamique
- Une intégration d'API pour gérer les commandes des utilisateurs

## Installation

### Prérequis
Pour le lancement du projet, vous aurez besoin de :
- Node.js
- npm ou yarn
- Docker
- Un navigateur moderne
- Cypress

### Étapes

1. **Téléchargez ou clonez le dépôt depuis :**
   https://github.com/OpenClassrooms-Student-Center/TesteurLogiciel_Automatisez_des_tests_pour_une_boutique_en_ligne

2. **Déploiement :**
   Ouvrez un terminal dans le dossier du projet, puis exécutez la commande :
   ```sh
   docker-compose up --build
   ```

3. **Installez les dépendances :**
   ```sh
   npm install
   # ou
   yarn install
   ```

4. **Lancez l'application :**
   ```sh
   npm start
   # ou
   yarn start
   ```

5. **Accédez à l'application :**
   Depuis le navigateur en saisissant l'URL :
   [http://localhost:8080/](http://localhost:8080/)

6. **Accédez à la documentation de l'API :**
   Depuis le navigateur en saisissant l'URL :
   [http://localhost:8081/api/doc/](http://localhost:8081/api/doc/)

7. **Login de test :**
   - identifiant : `test2@test.fr`
   - mot de passe : `testtest`

---

## Procédure pour lancer les tests automatiques

### Installation de Cypress

Le projet doit contenir un fichier `package.json`. Si ce n’est pas encore fait, initialisez-le avec :
```sh
npm init -y
```
Installez Cypress en tant que dépendance de développement avec :
```sh
npm install cypress --save-dev
```

### Lancement de Cypress

- Ouvrez l'interface graphique de Cypress avec :
  ```sh
  npx cypress open
  ```
- Pour exécuter Cypress en mode headless (sans interface graphique) :
  ```sh
  npx cypress run
  ```

### Génération des rapports de tests

En utilisant la commande :
```sh
npx cypress run
```

---

Pour toute question ou contribution, n'hésitez pas à ouvrir une issue ou une pull request sur le dépôt GitHub.

Nb : à l'étape 2, ne pas ajouter le `sudo` si vous êtes sous Windows (sauf dernière version de Windows 11) (PowerShell ou Shell) : sudo n'existant pas et Docker Desktop configurant automatiquement Docker pour ne pas avoir besoin des droits administrateur.