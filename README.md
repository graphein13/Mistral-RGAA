# Outil de test d'accessibilité RGAA avec Playwright

Cet outil permet de tester l'accessibilité de sites web selon les critères du Référentiel Général d'Amélioration de l'Accessibilité (RGAA) en utilisant Playwright et axe-core.

## Fonctionnalités

- Test automatisé des 106 critères RGAA (dans la mesure du possible)
- Intégration avec axe-core pour les tests d'accessibilité
- Vérifications supplémentaires spécifiques aux critères RGAA
- Génération d'un rapport HTML détaillé organisé par critère RGAA
- Support pour tester plusieurs pages web

## Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

## Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/graphein13/Mistral-RGAA.git
cd Mistral-RGAA
```

2. Installez les dépendances :
```bash
npm install
```

3. Installez les navigateurs Playwright :
```bash
npx playwright install
```

## Configuration

Les URLs à tester sont configurées dans le fichier `tests/accessibility.spec.js`. Vous pouvez modifier la liste `urlsToTest` pour tester d'autres pages.

## Utilisation

### Exécuter les tests

```bash
npm test
```

Pour exécuter les tests avec le navigateur visible :

```bash
npm run test:headed
```

### Afficher le rapport

Le rapport HTML est généré dans le dossier `reports/`. Vous pouvez l'ouvrir directement dans votre navigateur.

Pour afficher le rapport Playwright :

```bash
npm run report
```

## Structure du projet

- `src/` : Contient les modules principaux
  - `rgaa-criteria.js` : Définition des 106 critères RGAA
  - `axe-helper.js` : Utilitaires pour l'intégration d'axe-core
  - `rgaa-additional-checks.js` : Vérifications supplémentaires spécifiques aux critères RGAA
  - `report-generator.js` : Générateur de rapport HTML
- `tests/` : Contient les scripts de test
  - `accessibility.spec.js` : Script principal pour les tests d'accessibilité
- `reports/` : Contient les rapports générés

## Limitations

- Certains critères RGAA nécessitent une vérification manuelle et ne peuvent pas être entièrement automatisés
- Les tests automatisés ne remplacent pas une expertise humaine en accessibilité
- Les résultats peuvent varier selon la complexité des pages testées

## Licence

MIT
