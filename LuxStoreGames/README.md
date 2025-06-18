# LuxStoreGames

Site de vente de jeux vidéo avec paiement en jetons ERC-20, construit avec Next.js et Solidity.


# GameStore Blockchain Portfolio

Site de vente de jeux vidéo avec paiement en jetons ERC-20, construit avec Next.js et Solidity.

## Table des matières

* [Fonctionnalités](https://chatgpt.com/g/g-p-68514fdb13488191b3f531b266a0356b-blockchain-portfolio/c/68514fe1-0c90-800c-bdb9-31a94f6d0e95#fonctionnalit%C3%A9s)
* [Technologies](https://chatgpt.com/g/g-p-68514fdb13488191b3f531b266a0356b-blockchain-portfolio/c/68514fe1-0c90-800c-bdb9-31a94f6d0e95#technologies)
* [Structure du projet](https://chatgpt.com/g/g-p-68514fdb13488191b3f531b266a0356b-blockchain-portfolio/c/68514fe1-0c90-800c-bdb9-31a94f6d0e95#structure-du-projet)
* [Installation](https://chatgpt.com/g/g-p-68514fdb13488191b3f531b266a0356b-blockchain-portfolio/c/68514fe1-0c90-800c-bdb9-31a94f6d0e95#installation)
* [Configuration](https://chatgpt.com/g/g-p-68514fdb13488191b3f531b266a0356b-blockchain-portfolio/c/68514fe1-0c90-800c-bdb9-31a94f6d0e95#configuration)
* [Usage](https://chatgpt.com/g/g-p-68514fdb13488191b3f531b266a0356b-blockchain-portfolio/c/68514fe1-0c90-800c-bdb9-31a94f6d0e95#usage)
* [Architecture](https://chatgpt.com/g/g-p-68514fdb13488191b3f531b266a0356b-blockchain-portfolio/c/68514fe1-0c90-800c-bdb9-31a94f6d0e95#architecture)
* [Contribuer](https://chatgpt.com/g/g-p-68514fdb13488191b3f531b266a0356b-blockchain-portfolio/c/68514fe1-0c90-800c-bdb9-31a94f6d0e95#contribuer)
* [Licence](https://chatgpt.com/g/g-p-68514fdb13488191b3f531b266a0356b-blockchain-portfolio/c/68514fe1-0c90-800c-bdb9-31a94f6d0e95#licence)

## Fonctionnalités

* Création et gestion d’un jeton ERC-20 (« GameToken »).
* Quiz intégré pour gagner des jetons.
* Catalogue de jeux vidéo à acheter avec les jetons.
* Connexion de portefeuille (MetaMask) et interactions on-chain.
* Tests unitaires des smart contracts.

## Technologies

* **Front-end** : Next.js, React, Ethers.js
* **Smart Contracts** : Solidity, OpenZeppelin, Hardhat
* **DevOps** : Ganache / Goerli Testnet, Alchemy/Infura, Vercel
* **Base de données** : Postgres (optionnel)
* **Validation** : Zod ou Yup

## Structure du projet

```bash
blockchain-portfolio/
├── contracts/                      # Smart contracts Solidity
│   ├── GameToken.sol               # ERC-20 token custom
│   └── GameStore.sol               # logique d’achat
│
├── scripts/                        # scripts de déploiement et d’interaction
│   ├── deploy.ts
│   ├── mintTokens.ts
│   └── buyGame.ts
│
├── test/                           # tests unitaires Hardhat
│   ├── GameToken.test.ts
│   └── GameStore.test.ts
│
├── web/                            # Front-end Next.js
│   ├── public/
│   ├── src/
│   │   ├── components/             # UI (boutons, cartes…)
│   │   ├── pages/
│   │   │   ├── index.tsx           # liste des jeux
│   │   │   ├── earn.tsx            # quiz pour gagner des jetons
│   │   │   └── checkout.tsx        # paiement
│   │   ├── hooks/                  # hooks Web3
│   │   └── lib/                    # configuration Ethers, ABI
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/blockchain-portfolio.git
   cd blockchain-portfolio
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```

## Configuration

1. Copiez les fichiers d’environnement :
   ```bash
   cp web/.env.example web/.env
   cp hardhat.config.ts.example hardhat.config.ts
   ```
2. Remplissez vos clés RPC (Alchemy/Infura) et l’URL de votre base MongoDB/Firebase dans `web/.env`.

## Usage

### Lancer le front-end

```bash
cd web
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000/) dans votre navigateur.

### Déployer les contrats

1. Compilez et déployez sur Goerli (ou Ganache local) :
   ```bash
   npx hardhat run scripts/deploy.ts --network goerli
   ```
2. Notez les adresses déployées et mettez-les à jour dans `web/src/lib/contracts.ts`.

## Architecture

Le projet sépare clairement le front-end Next.js du back-end blockchain :

* **Front-end** : UI React + Tailwind, hooks Web3 pour interagir avec les contrats.
* **Smart Contracts** :
  * `GameToken.sol` : ERC-20 mintable par l’admin.
  * `GameStore.sol` : ajout de jeux, achat via `transferFrom`.
* **Workflow** :
  1. L’utilisateur passe le quiz → mint de tokens.
  2. L’utilisateur sélectionne un jeu → paiement on-chain.
  3. Événements émis pour suivi des achats.

## Contribuer

1. Ouvrez une **issue** pour proposer une fonctionnalité ou signaler un bug.
2. Faites un **fork** du dépôt et créez une branche (`git checkout -b feature/ma-fonctionnalite`).
3. Proposez une **pull request** détaillant vos changements.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](https://chatgpt.com/g/g-p-68514fdb13488191b3f531b266a0356b-blockchain-portfolio/c/LICENSE) pour plus de détails.
