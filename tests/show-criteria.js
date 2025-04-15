/**
 * Script pour afficher les critères RGAA testés et leur statut
 */

const { test } = require('@playwright/test');
const rgaaCriteria = require('../src/rgaa-criteria');
const { analyzeAccessibility, mapAxeResultsToRgaa } = require('../src/axe-helper');

// URL à tester
const url = 'https://mistralpenal.beta.gouv.fr/';

// Options pour axe-core
const axeOptions = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
  },
  reporter: 'v2',
  resultTypes: ['violations', 'passes', 'inapplicable', 'incomplete']
};

test('Afficher les critères RGAA testés pour ' + url, async ({ page }) => {
  console.log(`Analyse de l'accessibilité pour ${url}`);
  
  // Naviguer vers l'URL
  await page.goto(url, { waitUntil: 'networkidle' });
  
  // Attendre que la page soit complètement chargée
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  // Exécuter l'analyse d'accessibilité avec axe-core
  const axeResults = await analyzeAccessibility(page, axeOptions);
  
  // Mapper les résultats axe-core aux critères RGAA
  const rgaaResults = mapAxeResultsToRgaa(axeResults, rgaaCriteria);
  
  // Afficher un résumé des résultats
  console.log(`\nRésultats pour ${url}:`);
  console.log(`- Violations: ${axeResults.violations.length}`);
  console.log(`- Passes: ${axeResults.passes.length}`);
  console.log(`- Inapplicable: ${axeResults.inapplicable.length}`);
  console.log(`- Incomplete: ${axeResults.incomplete.length}`);
  
  // Afficher les critères RGAA testés et leur statut
  console.log("\nCritères RGAA testés et leur statut :");
  
  // Organiser les critères par catégorie
  const criteriaByCategory = {};
  
  Object.keys(rgaaResults).forEach(criterionId => {
    const criterion = rgaaResults[criterionId];
    const category = criterion.category;
    
    if (!criteriaByCategory[category]) {
      criteriaByCategory[category] = [];
    }
    
    criteriaByCategory[category].push(criterionId);
  });
  
  // Afficher les critères par catégorie
  Object.keys(criteriaByCategory).sort().forEach(category => {
    console.log(`\n=== ${category} ===`);
    
    criteriaByCategory[category].sort().forEach(criterionId => {
      const criterion = rgaaResults[criterionId];
      
      if (criterion.tested) {
        const status = criterion.violations.length > 0 ? "❌ NON CONFORME" : "✅ CONFORME";
        console.log(`${criterionId} - ${criterion.description}: ${status}`);
        
        if (criterion.violations.length > 0) {
          console.log(`   Nombre de violations: ${criterion.violations.length}`);
          
          // Afficher les détails des violations
          criterion.violations.forEach(violation => {
            console.log(`   - Règle: ${violation.id}`);
            console.log(`   - Impact: ${violation.impact}`);
            console.log(`   - Éléments concernés: ${violation.nodes.length}`);
            
            // Afficher les premiers éléments HTML concernés (limité pour éviter un affichage trop verbeux)
            if (violation.nodes.length > 0) {
              console.log(`   - Exemple: ${violation.nodes[0].html.substring(0, 100)}${violation.nodes[0].html.length > 100 ? '...' : ''}`);
            }
          });
        }
      } else {
        console.log(`${criterionId} - ${criterion.description}: ⚪ NON TESTÉ`);
      }
    });
  });
  
  // Afficher un résumé des critères testés
  const testedCriteria = Object.values(rgaaResults).filter(c => c.tested).length;
  const conformCriteria = Object.values(rgaaResults).filter(c => c.tested && c.violations.length === 0).length;
  const nonConformCriteria = Object.values(rgaaResults).filter(c => c.tested && c.violations.length > 0).length;
  
  console.log(`\nRésumé des critères RGAA :`);
  console.log(`- Total des critères : ${Object.keys(rgaaResults).length}`);
  console.log(`- Critères testés : ${testedCriteria}`);
  console.log(`- Critères conformes : ${conformCriteria}`);
  console.log(`- Critères non conformes : ${nonConformCriteria}`);
  
  const conformityPercentage = testedCriteria > 0 
    ? Math.round((conformCriteria / testedCriteria) * 100) 
    : 0;
  
  console.log(`- Taux de conformité : ${conformityPercentage}%`);
});
