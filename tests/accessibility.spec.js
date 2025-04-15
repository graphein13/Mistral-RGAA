/**
 * Script principal pour les tests d'accessibilité RGAA avec Playwright
 */

const { test } = require('@playwright/test');
const fs = require('fs').promises;
const path = require('path');
const rgaaCriteria = require('../src/rgaa-criteria');
const { analyzeAccessibility, mapAxeResultsToRgaa } = require('../src/axe-helper');
const { generateHtmlReport } = require('../src/report-generator');
const { performAdditionalRgaaChecks } = require('../src/rgaa-additional-checks');

// URLs à tester
const urlsToTest = [
  'https://mistralpenal.beta.gouv.fr/',
  'https://mistralpenal.beta.gouv.fr/presentation-de-mistral/d%C3%A9couvrez-mistral-p%C3%A9nal/',
  'https://mistralpenal.beta.gouv.fr/assistance/',
  'https://mistralpenal.beta.gouv.fr/contactez-nous/',
  'https://mistralpenal.beta.gouv.fr/actualites/archives/'
];

// Options pour axe-core
const axeOptions = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
  },
  reporter: 'v2',
  resultTypes: ['violations', 'passes', 'inapplicable', 'incomplete']
};

// Stockage des résultats
const results = {};

// Test pour chaque URL
for (const url of urlsToTest) {
  test(`Test d'accessibilité RGAA pour ${url}`, async ({ page }) => {
    console.log(`Analyse de l'accessibilité pour ${url}`);
    
    // Naviguer vers l'URL
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Attendre que la page soit complètement chargée
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000); // Attendre 2 secondes pour s'assurer que tout est chargé
    
    // Exécuter l'analyse d'accessibilité avec axe-core
    const axeResults = await analyzeAccessibility(page, axeOptions);
    
    // Mapper les résultats axe-core aux critères RGAA
    const rgaaResults = mapAxeResultsToRgaa(axeResults, rgaaCriteria);
    
    // Effectuer des vérifications supplémentaires spécifiques aux critères RGAA
    const enhancedResults = await performAdditionalRgaaChecks(page, rgaaResults);
    
    // Stocker les résultats pour cette URL
    results[url] = enhancedResults;
    
    // Afficher un résumé des résultats
    console.log(`Résultats pour ${url}:`);
    console.log(`- Violations: ${axeResults.violations.length}`);
    console.log(`- Passes: ${axeResults.passes.length}`);
    console.log(`- Inapplicable: ${axeResults.inapplicable.length}`);
    console.log(`- Incomplete: ${axeResults.incomplete.length}`);
  });
}

// Test pour générer le rapport final
test('Générer le rapport d\'accessibilité RGAA', async ({}) => {
  // Vérifier que tous les tests ont été exécutés
  if (Object.keys(results).length !== urlsToTest.length) {
    console.warn(`Attention: Seulement ${Object.keys(results).length}/${urlsToTest.length} URLs ont été testées.`);
  }
  
  // Si aucun résultat n'a été collecté, créer des résultats fictifs pour éviter l'erreur
  if (Object.keys(results).length === 0) {
    console.warn('Aucun résultat n\'a été collecté. Création de résultats fictifs pour le rapport.');
    
    // Créer un résultat fictif pour chaque URL
    urlsToTest.forEach(url => {
      results[url] = {};
      
      // Initialiser tous les critères RGAA avec des résultats vides
      Object.keys(rgaaCriteria).forEach(criterionId => {
        results[url][criterionId] = {
          id: criterionId,
          description: rgaaCriteria[criterionId].description,
          category: rgaaCriteria[criterionId].category,
          violations: [],
          passes: [],
          inapplicable: [],
          incomplete: [],
          tested: false
        };
      });
    });
  }
  
  // Générer le rapport HTML
  const reportHtml = generateHtmlReport(results, urlsToTest);
  
  // Créer le répertoire des rapports s'il n'existe pas
  const reportsDir = path.join(__dirname, '../reports');
  await fs.mkdir(reportsDir, { recursive: true });
  
  // Écrire le rapport dans un fichier
  const reportPath = path.join(reportsDir, 'rapport-accessibilite-rgaa.html');
  await fs.writeFile(reportPath, reportHtml);
  
  console.log(`Rapport d'accessibilité généré: ${reportPath}`);
});
