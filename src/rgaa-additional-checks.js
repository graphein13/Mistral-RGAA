/**
 * Vérifications supplémentaires spécifiques aux critères RGAA
 * qui ne sont pas couverts par les règles axe-core standard
 */

/**
 * Effectue des vérifications supplémentaires pour les critères RGAA
 * @param {import('@playwright/test').Page} page - Instance de page Playwright
 * @param {Object} rgaaResults - Résultats RGAA existants à enrichir
 * @returns {Promise<Object>} - Résultats RGAA enrichis
 */
async function performAdditionalRgaaChecks(page, rgaaResults) {
  // Vérification du critère 8.9 (balises utilisées à des fins de présentation)
  await checkPresentationMarkup(page, rgaaResults);
  
  // Vérification du critère 10.4 (lisibilité du texte avec zoom 200%)
  await checkTextReadabilityWithZoom(page, rgaaResults);
  
  // Vérification du critère 12.6 (zones de regroupement de contenus)
  await checkContentAreas(page, rgaaResults);
  
  // Vérification du critère 12.7 (liens d'évitement)
  await checkSkipLinks(page, rgaaResults);
  
  // Vérification du critère 8.1 (validité du doctype)
  await checkDoctype(page, rgaaResults);
  
  return rgaaResults;
}

/**
 * Vérifie si des balises sont utilisées uniquement à des fins de présentation (critère 8.9)
 * @param {import('@playwright/test').Page} page - Instance de page Playwright
 * @param {Object} rgaaResults - Résultats RGAA à enrichir
 */
async function checkPresentationMarkup(page, rgaaResults) {
  const presentationElements = await page.evaluate(() => {
    const presentationTags = [
      'b', 'i', 'u', 'center', 'font', 'marquee', 'blink'
    ];
    
    const results = [];
    
    presentationTags.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      if (elements.length > 0) {
        elements.forEach(el => {
          results.push({
            tag: tag,
            html: el.outerHTML,
            text: el.textContent.trim()
          });
        });
      }
    });
    
    return results;
  });
  
  if (presentationElements.length > 0) {
    if (!rgaaResults['8.9'].violations) {
      rgaaResults['8.9'].violations = [];
    }
    
    rgaaResults['8.9'].violations.push({
      id: 'presentation-tags',
      impact: 'moderate',
      help: 'Éviter d\'utiliser des balises à des fins de présentation uniquement',
      nodes: presentationElements.map(el => ({
        html: el.html,
        failureSummary: `La balise <${el.tag}> est utilisée à des fins de présentation. Utilisez CSS à la place.`
      }))
    });
  }
  
  rgaaResults['8.9'].tested = true;
}

/**
 * Vérifie la lisibilité du texte avec un zoom à 200% (critère 10.4)
 * @param {import('@playwright/test').Page} page - Instance de page Playwright
 * @param {Object} rgaaResults - Résultats RGAA à enrichir
 */
async function checkTextReadabilityWithZoom(page, rgaaResults) {
  // Simuler un zoom à 200%
  await page.evaluate(() => {
    document.body.style.zoom = '200%';
  });
  
  // Vérifier si du contenu est tronqué ou masqué
  const overflowIssues = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    const issues = [];
    
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const isTextElement = el.textContent.trim().length > 0 && 
                           !['script', 'style'].includes(el.tagName.toLowerCase());
      
      if (isTextElement) {
        const isOverflowHidden = style.overflow === 'hidden' || 
                                style.overflowX === 'hidden' || 
                                style.overflowY === 'hidden';
        
        const rect = el.getBoundingClientRect();
        const isClipped = rect.width < el.scrollWidth || rect.height < el.scrollHeight;
        
        if (isOverflowHidden && isClipped) {
          issues.push({
            html: el.outerHTML,
            text: el.textContent.trim().substring(0, 100) + (el.textContent.length > 100 ? '...' : '')
          });
        }
      }
    });
    
    return issues;
  });
  
  // Restaurer le zoom normal
  await page.evaluate(() => {
    document.body.style.zoom = '100%';
  });
  
  if (overflowIssues.length > 0) {
    if (!rgaaResults['10.4'].violations) {
      rgaaResults['10.4'].violations = [];
    }
    
    rgaaResults['10.4'].violations.push({
      id: 'text-zoom-readability',
      impact: 'serious',
      help: 'Le texte doit rester lisible lorsque la taille est augmentée à 200%',
      nodes: overflowIssues.map(issue => ({
        html: issue.html,
        failureSummary: `Le texte est tronqué ou masqué lorsque le zoom est à 200%. Utilisez des unités relatives et des mises en page flexibles.`
      }))
    });
  }
  
  rgaaResults['10.4'].tested = true;
}

/**
 * Vérifie les zones de regroupement de contenus (critère 12.6)
 * @param {import('@playwright/test').Page} page - Instance de page Playwright
 * @param {Object} rgaaResults - Résultats RGAA à enrichir
 */
async function checkContentAreas(page, rgaaResults) {
  const contentAreas = await page.evaluate(() => {
    const landmarks = {
      header: document.querySelector('header, [role="banner"]'),
      nav: document.querySelector('nav, [role="navigation"]'),
      main: document.querySelector('main, [role="main"]'),
      footer: document.querySelector('footer, [role="contentinfo"]'),
      search: document.querySelector('[role="search"]')
    };
    
    const results = {
      missingAreas: [],
      duplicateAreas: []
    };
    
    // Vérifier les zones manquantes
    for (const [name, element] of Object.entries(landmarks)) {
      if (!element) {
        results.missingAreas.push(name);
      }
    }
    
    // Vérifier les zones dupliquées
    const counts = {
      header: document.querySelectorAll('header, [role="banner"]').length,
      nav: document.querySelectorAll('nav, [role="navigation"]').length,
      main: document.querySelectorAll('main, [role="main"]').length,
      footer: document.querySelectorAll('footer, [role="contentinfo"]').length
    };
    
    for (const [name, count] of Object.entries(counts)) {
      if (count > 1) {
        results.duplicateAreas.push({
          name: name,
          count: count
        });
      }
    }
    
    return results;
  });
  
  // Traiter les zones manquantes
  if (contentAreas.missingAreas.length > 0) {
    if (!rgaaResults['12.6'].violations) {
      rgaaResults['12.6'].violations = [];
    }
    
    rgaaResults['12.6'].violations.push({
      id: 'missing-landmarks',
      impact: 'moderate',
      help: 'Les zones de regroupement de contenus doivent être présentes',
      nodes: [{
        html: '<html>...</html>',
        failureSummary: `Les zones suivantes sont manquantes : ${contentAreas.missingAreas.join(', ')}. Utilisez les balises sémantiques appropriées ou les attributs ARIA correspondants.`
      }]
    });
  }
  
  // Traiter les zones dupliquées
  if (contentAreas.duplicateAreas.length > 0) {
    if (!rgaaResults['12.6'].violations) {
      rgaaResults['12.6'].violations = [];
    }
    
    rgaaResults['12.6'].violations.push({
      id: 'duplicate-landmarks',
      impact: 'moderate',
      help: 'Les zones de regroupement de contenus ne doivent pas être dupliquées',
      nodes: contentAreas.duplicateAreas.map(area => ({
        html: `<${area.name}>...</${area.name}>`,
        failureSummary: `La zone ${area.name} est présente ${area.count} fois. Il ne devrait y avoir qu'une seule instance de cette zone.`
      }))
    });
  }
  
  rgaaResults['12.6'].tested = true;
}

/**
 * Vérifie la présence de liens d'évitement (critère 12.7)
 * @param {import('@playwright/test').Page} page - Instance de page Playwright
 * @param {Object} rgaaResults - Résultats RGAA à enrichir
 */
async function checkSkipLinks(page, rgaaResults) {
  const skipLinks = await page.evaluate(() => {
    // Rechercher les liens d'évitement potentiels
    const potentialSkipLinks = Array.from(document.querySelectorAll('a[href^="#"]'))
      .filter(link => {
        const text = link.textContent.toLowerCase();
        return text.includes('passer') || 
               text.includes('éviter') || 
               text.includes('contenu') || 
               text.includes('principal') ||
               text.includes('skip') ||
               text.includes('content') ||
               text.includes('main');
      });
    
    // Vérifier si les liens d'évitement sont fonctionnels
    const results = [];
    
    potentialSkipLinks.forEach(link => {
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      results.push({
        text: link.textContent.trim(),
        href: link.getAttribute('href'),
        isValid: !!targetElement
      });
    });
    
    return {
      found: potentialSkipLinks.length > 0,
      links: results
    };
  });
  
  if (!skipLinks.found) {
    if (!rgaaResults['12.7'].violations) {
      rgaaResults['12.7'].violations = [];
    }
    
    rgaaResults['12.7'].violations.push({
      id: 'skip-link-missing',
      impact: 'serious',
      help: 'Un lien d\'évitement ou d\'accès rapide à la zone de contenu principal doit être présent',
      nodes: [{
        html: '<html>...</html>',
        failureSummary: `Aucun lien d'évitement n'a été trouvé. Ajoutez un lien au début de la page pour permettre d'accéder directement au contenu principal.`
      }]
    });
  } else {
    // Vérifier si les liens d'évitement sont valides
    const invalidLinks = skipLinks.links.filter(link => !link.isValid);
    
    if (invalidLinks.length > 0) {
      if (!rgaaResults['12.7'].violations) {
        rgaaResults['12.7'].violations = [];
      }
      
      rgaaResults['12.7'].violations.push({
        id: 'skip-link-invalid',
        impact: 'serious',
        help: 'Les liens d\'évitement doivent pointer vers des cibles valides',
        nodes: invalidLinks.map(link => ({
          html: `<a href="${link.href}">${link.text}</a>`,
          failureSummary: `Le lien d'évitement "${link.text}" pointe vers une cible inexistante (${link.href}). Assurez-vous que l'identifiant cible existe dans la page.`
        }))
      });
    }
  }
  
  rgaaResults['12.7'].tested = true;
}

/**
 * Vérifie la validité du doctype (critère 8.1)
 * @param {import('@playwright/test').Page} page - Instance de page Playwright
 * @param {Object} rgaaResults - Résultats RGAA à enrichir
 */
async function checkDoctype(page, rgaaResults) {
  const doctypeInfo = await page.evaluate(() => {
    const doctype = document.doctype;
    return doctype ? {
      name: doctype.name,
      publicId: doctype.publicId,
      systemId: doctype.systemId,
      isValid: doctype.name.toLowerCase() === 'html'
    } : null;
  });
  
  if (!doctypeInfo) {
    if (!rgaaResults['8.1'].violations) {
      rgaaResults['8.1'].violations = [];
    }
    
    rgaaResults['8.1'].violations.push({
      id: 'doctype-missing',
      impact: 'serious',
      help: 'Chaque page web doit être définie par un type de document',
      nodes: [{
        html: '<html>...</html>',
        failureSummary: `La page ne contient pas de déclaration de type de document (DOCTYPE). Ajoutez <!DOCTYPE html> au début du document.`
      }]
    });
  } else if (!doctypeInfo.isValid) {
    if (!rgaaResults['8.1'].violations) {
      rgaaResults['8.1'].violations = [];
    }
    
    rgaaResults['8.1'].violations.push({
      id: 'doctype-invalid',
      impact: 'serious',
      help: 'Chaque page web doit être définie par un type de document valide',
      nodes: [{
        html: `<!DOCTYPE ${doctypeInfo.name} PUBLIC "${doctypeInfo.publicId}" "${doctypeInfo.systemId}">`,
        failureSummary: `La déclaration de type de document n'est pas valide. Utilisez <!DOCTYPE html> pour HTML5.`
      }]
    });
  }
  
  rgaaResults['8.1'].tested = true;
}

module.exports = {
  performAdditionalRgaaChecks
};
