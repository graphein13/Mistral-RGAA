/**
 * Utilitaires pour l'intégration d'axe-core avec Playwright
 * pour les tests d'accessibilité RGAA
 */

const axe = require('axe-core');

/**
 * Injecte axe-core dans la page et exécute l'analyse d'accessibilité
 * @param {import('@playwright/test').Page} page - Instance de page Playwright
 * @param {Object} options - Options pour l'analyse axe-core
 * @returns {Promise<Object>} - Résultats de l'analyse d'accessibilité
 */
async function analyzeAccessibility(page, options = {}) {
  // Injecter axe-core dans la page
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });

  // Exécuter l'analyse d'accessibilité
  const results = await page.evaluate((opts) => {
    return new Promise((resolve) => {
      window.axe.run(document, opts, (err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  }, options);

  return results;
}

/**
 * Filtre les résultats d'axe-core pour correspondre aux critères RGAA
 * @param {Object} axeResults - Résultats de l'analyse axe-core
 * @param {Object} rgaaCriteria - Critères RGAA avec mapping vers les règles axe
 * @returns {Object} - Résultats filtrés par critère RGAA
 */
function mapAxeResultsToRgaa(axeResults, rgaaCriteria) {
  const rgaaResults = {};

  // Initialiser tous les critères RGAA avec des résultats vides
  Object.keys(rgaaCriteria).forEach(criterionId => {
    rgaaResults[criterionId] = {
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

  // Parcourir les violations d'axe-core
  axeResults.violations.forEach(violation => {
    // Trouver les critères RGAA correspondants à cette règle axe
    Object.keys(rgaaCriteria).forEach(criterionId => {
      const criterion = rgaaCriteria[criterionId];
      if (criterion.axeRules && criterion.axeRules.includes(violation.id)) {
        rgaaResults[criterionId].violations.push({
          ...violation,
          rgaaCriterion: criterionId
        });
        rgaaResults[criterionId].tested = true;
      }
    });
  });

  // Parcourir les passes d'axe-core
  axeResults.passes.forEach(pass => {
    // Trouver les critères RGAA correspondants à cette règle axe
    Object.keys(rgaaCriteria).forEach(criterionId => {
      const criterion = rgaaCriteria[criterionId];
      if (criterion.axeRules && criterion.axeRules.includes(pass.id)) {
        rgaaResults[criterionId].passes.push({
          ...pass,
          rgaaCriterion: criterionId
        });
        rgaaResults[criterionId].tested = true;
      }
    });
  });

  // Parcourir les inapplicable d'axe-core
  axeResults.inapplicable.forEach(inapplicable => {
    // Trouver les critères RGAA correspondants à cette règle axe
    Object.keys(rgaaCriteria).forEach(criterionId => {
      const criterion = rgaaCriteria[criterionId];
      if (criterion.axeRules && criterion.axeRules.includes(inapplicable.id)) {
        rgaaResults[criterionId].inapplicable.push({
          ...inapplicable,
          rgaaCriterion: criterionId
        });
        rgaaResults[criterionId].tested = true;
      }
    });
  });

  // Parcourir les incomplete d'axe-core
  axeResults.incomplete.forEach(incomplete => {
    // Trouver les critères RGAA correspondants à cette règle axe
    Object.keys(rgaaCriteria).forEach(criterionId => {
      const criterion = rgaaCriteria[criterionId];
      if (criterion.axeRules && criterion.axeRules.includes(incomplete.id)) {
        rgaaResults[criterionId].incomplete.push({
          ...incomplete,
          rgaaCriterion: criterionId
        });
        rgaaResults[criterionId].tested = true;
      }
    });
  });

  return rgaaResults;
}

module.exports = {
  analyzeAccessibility,
  mapAxeResultsToRgaa
};
