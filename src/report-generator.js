/**
 * Générateur de rapport HTML pour les tests d'accessibilité RGAA
 */

/**
 * Génère un rapport HTML à partir des résultats des tests d'accessibilité RGAA
 * @param {Object} results - Résultats des tests d'accessibilité par URL et par critère RGAA
 * @param {Array<string>} urls - Liste des URLs testées
 * @returns {string} - Contenu HTML du rapport
 */
function generateHtmlReport(results, urls) {
  const date = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calcul des statistiques globales
  const stats = calculateStats(results, urls);

  let html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport d'accessibilité RGAA - Mistral Pénal</title>
  <style>
    :root {
      --primary-color: #0063cb;
      --secondary-color: #000091;
      --success-color: #18753c;
      --warning-color: #b34000;
      --danger-color: #ce0500;
      --light-color: #f6f6f6;
      --dark-color: #161616;
      --text-color: #1e1e1e;
      --border-color: #ddd;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Marianne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.5;
      color: var(--text-color);
      background-color: #fff;
      padding: 0;
      margin: 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    header {
      background-color: var(--primary-color);
      color: white;
      padding: 1.5rem 0;
      margin-bottom: 2rem;
    }
    
    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 1rem;
      font-weight: 700;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.5rem;
      margin-top: 2rem;
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 0.5rem;
    }
    
    h3 {
      font-size: 1.25rem;
      margin-top: 1.5rem;
    }
    
    p {
      margin-bottom: 1rem;
    }
    
    .summary {
      background-color: var(--light-color);
      padding: 1.5rem;
      border-radius: 4px;
      margin-bottom: 2rem;
    }
    
    .stats {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .stat-card {
      flex: 1;
      min-width: 200px;
      background-color: white;
      border-radius: 4px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .stat-card h3 {
      margin-top: 0;
      font-size: 1rem;
      color: var(--text-color);
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }
    
    .success { color: var(--success-color); }
    .warning { color: var(--warning-color); }
    .danger { color: var(--danger-color); }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 2rem;
    }
    
    th, td {
      padding: 0.75rem;
      text-align: left;
      border: 1px solid var(--border-color);
    }
    
    th {
      background-color: var(--light-color);
      font-weight: 600;
    }
    
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    
    .badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    .badge-success {
      background-color: #e3f5ec;
      color: var(--success-color);
    }
    
    .badge-warning {
      background-color: #fff4e5;
      color: var(--warning-color);
    }
    
    .badge-danger {
      background-color: #ffeae9;
      color: var(--danger-color);
    }
    
    .badge-info {
      background-color: #e8edff;
      color: var(--secondary-color);
    }
    
    .badge-secondary {
      background-color: #f6f6f6;
      color: #666;
    }
    
    .accordion {
      margin-bottom: 1rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
    }
    
    .accordion-header {
      padding: 1rem;
      background-color: var(--light-color);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .accordion-content {
      padding: 1rem;
      display: none;
    }
    
    .accordion-content.active {
      display: block;
    }
    
    .violation-item {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .violation-item:last-child {
      border-bottom: none;
    }
    
    .violation-target {
      font-family: monospace;
      background-color: #f6f6f6;
      padding: 0.5rem;
      margin: 0.5rem 0;
      border-radius: 4px;
      overflow-x: auto;
    }
    
    .url-list {
      margin-bottom: 1.5rem;
    }
    
    .url-item {
      margin-bottom: 0.5rem;
    }
    
    footer {
      margin-top: 3rem;
      padding: 1.5rem 0;
      background-color: var(--light-color);
      text-align: center;
      font-size: 0.875rem;
      color: #666;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .stats {
        flex-direction: column;
      }
      
      .stat-card {
        width: 100%;
      }
    }
    
    /* Toggle pour les accordéons */
    .toggle-icon::before {
      content: '+';
      display: inline-block;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
    }
    
    .accordion-header.active .toggle-icon::before {
      content: '-';
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>Rapport d'accessibilité RGAA - Mistral Pénal</h1>
      <p>Généré le ${date}</p>
    </div>
  </header>

  <div class="container">
    <section class="summary">
      <h2>Résumé</h2>
      <div class="stats">
        <div class="stat-card">
          <h3>Critères testés</h3>
          <div class="stat-value">${stats.testedCriteria}</div>
          <p>sur ${stats.totalCriteria} critères RGAA</p>
        </div>
        <div class="stat-card">
          <h3>Conformité globale</h3>
          <div class="stat-value ${stats.conformityPercentage >= 75 ? 'success' : stats.conformityPercentage >= 50 ? 'warning' : 'danger'}">${stats.conformityPercentage}%</div>
          <p>${stats.passedCriteria} critères conformes</p>
        </div>
        <div class="stat-card">
          <h3>Pages testées</h3>
          <div class="stat-value">${urls.length}</div>
        </div>
        <div class="stat-card">
          <h3>Violations</h3>
          <div class="stat-value danger">${stats.totalViolations}</div>
          <p>problèmes détectés</p>
        </div>
      </div>

      <h3>Pages analysées</h3>
      <ul class="url-list">
        ${urls.map(url => `<li class="url-item"><a href="${url}" target="_blank">${url}</a></li>`).join('')}
      </ul>
    </section>

    <section>
      <h2>Résultats par critère RGAA</h2>
      
      ${generateCriteriaResults(results, urls)}
    </section>
  </div>

  <footer>
    <div class="container">
      <p>Rapport généré avec Playwright et axe-core</p>
    </div>
  </footer>

  <script>
    // Script pour les accordéons
    document.addEventListener('DOMContentLoaded', function() {
      const accordionHeaders = document.querySelectorAll('.accordion-header');
      
      accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
          this.classList.toggle('active');
          const content = this.nextElementSibling;
          content.classList.toggle('active');
        });
      });
    });
  </script>
</body>
</html>
  `;

  return html;
}

/**
 * Calcule les statistiques globales des résultats
 * @param {Object} results - Résultats des tests d'accessibilité
 * @param {Array<string>} urls - Liste des URLs testées
 * @returns {Object} - Statistiques calculées
 */
function calculateStats(results, urls) {
  let testedCriteria = 0;
  let passedCriteria = 0;
  let totalViolations = 0;
  const totalCriteria = Object.keys(results[urls[0]]).length;

  // Pour chaque critère, vérifier s'il est testé et conforme sur toutes les pages
  Object.keys(results[urls[0]]).forEach(criterionId => {
    let criterionTested = false;
    let criterionPassed = true;
    
    urls.forEach(url => {
      const criterionResult = results[url][criterionId];
      
      if (criterionResult.tested) {
        criterionTested = true;
        totalViolations += criterionResult.violations.length;
        
        if (criterionResult.violations.length > 0) {
          criterionPassed = false;
        }
      }
    });
    
    if (criterionTested) {
      testedCriteria++;
      if (criterionPassed) {
        passedCriteria++;
      }
    }
  });

  const conformityPercentage = testedCriteria > 0 
    ? Math.round((passedCriteria / testedCriteria) * 100) 
    : 0;

  return {
    totalCriteria,
    testedCriteria,
    passedCriteria,
    totalViolations,
    conformityPercentage
  };
}

/**
 * Génère le HTML pour les résultats par critère RGAA
 * @param {Object} results - Résultats des tests d'accessibilité
 * @param {Array<string>} urls - Liste des URLs testées
 * @returns {string} - HTML des résultats par critère
 */
function generateCriteriaResults(results, urls) {
  // Regrouper les critères par catégorie
  const criteriaByCategory = {};
  
  Object.keys(results[urls[0]]).forEach(criterionId => {
    const criterion = results[urls[0]][criterionId];
    const category = criterion.category;
    
    if (!criteriaByCategory[category]) {
      criteriaByCategory[category] = [];
    }
    
    criteriaByCategory[category].push(criterionId);
  });

  let html = '';

  // Générer le HTML pour chaque catégorie
  Object.keys(criteriaByCategory).sort().forEach(category => {
    html += `
      <h3>${category}</h3>
    `;

    // Générer le HTML pour chaque critère dans cette catégorie
    criteriaByCategory[category].sort().forEach(criterionId => {
      const criterion = results[urls[0]][criterionId];
      
      // Vérifier si le critère est testé sur au moins une page
      let isTested = false;
      let hasViolations = false;
      let totalViolations = 0;
      
      urls.forEach(url => {
        if (results[url][criterionId].tested) {
          isTested = true;
          if (results[url][criterionId].violations.length > 0) {
            hasViolations = true;
            totalViolations += results[url][criterionId].violations.length;
          }
        }
      });

      // Déterminer le statut du critère
      let status = 'Non testé';
      let statusClass = 'badge-secondary';
      
      if (isTested) {
        if (hasViolations) {
          status = 'Non conforme';
          statusClass = 'badge-danger';
        } else {
          status = 'Conforme';
          statusClass = 'badge-success';
        }
      }

      html += `
        <div class="accordion">
          <div class="accordion-header">
            <div>
              <strong>${criterionId}</strong> - ${criterion.description}
              <span class="badge ${statusClass}">${status}</span>
              ${totalViolations > 0 ? `<span class="badge badge-danger">${totalViolations} violations</span>` : ''}
            </div>
            <span class="toggle-icon"></span>
          </div>
          <div class="accordion-content">
      `;

      if (!isTested) {
        html += `<p>Ce critère n'a pas été testé automatiquement. Une vérification manuelle est recommandée.</p>`;
      } else {
        // Afficher les résultats pour chaque URL
        urls.forEach(url => {
          const urlResult = results[url][criterionId];
          
          if (urlResult.tested) {
            const urlViolations = urlResult.violations.length;
            
            html += `
              <h4>${new URL(url).pathname || url}</h4>
            `;
            
            if (urlViolations === 0) {
              html += `<p><span class="badge badge-success">Conforme</span> Aucune violation détectée</p>`;
            } else {
              html += `
                <p><span class="badge badge-danger">Non conforme</span> ${urlViolations} violation${urlViolations > 1 ? 's' : ''} détectée${urlViolations > 1 ? 's' : ''}</p>
                <div class="violations-list">
              `;
              
              // Afficher les détails des violations
              urlResult.violations.forEach(violation => {
                html += `
                  <div class="violation-item">
                    <p><strong>Règle :</strong> ${violation.id} - ${violation.help}</p>
                    <p><strong>Impact :</strong> ${getImpactLabel(violation.impact)}</p>
                    <p><strong>Éléments concernés :</strong></p>
                `;
                
                violation.nodes.forEach(node => {
                  html += `
                    <div class="violation-target">${escapeHtml(node.html)}</div>
                    <p><strong>Suggestion :</strong> ${node.failureSummary ? node.failureSummary.replace(/^Fix .* of the following:/, 'Corriger les problèmes suivants :') : 'Aucune suggestion disponible'}</p>
                  `;
                });
                
                html += `</div>`;
              });
              
              html += `</div>`;
            }
          }
        });
      }

      html += `
          </div>
        </div>
      `;
    });
  });

  return html;
}

/**
 * Traduit le niveau d'impact en français
 * @param {string} impact - Niveau d'impact en anglais
 * @returns {string} - Niveau d'impact traduit
 */
function getImpactLabel(impact) {
  const impactLabels = {
    'minor': 'Mineur',
    'moderate': 'Modéré',
    'serious': 'Sérieux',
    'critical': 'Critique'
  };
  
  return impactLabels[impact] || impact;
}

/**
 * Échappe les caractères HTML
 * @param {string} html - Chaîne HTML à échapper
 * @returns {string} - Chaîne HTML échappée
 */
function escapeHtml(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  generateHtmlReport
};
