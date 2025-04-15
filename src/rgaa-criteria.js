/**
 * Définition des critères RGAA 4.1 pour les tests d'accessibilité
 * Source: https://accessibilite.numerique.gouv.fr/
 */

const rgaaCriteria = {
  // Thématique 1 : Images
  "1.1": {
    id: "1.1",
    description: "Chaque image porteuse d'information a-t-elle une alternative textuelle ?",
    axeRules: ["image-alt"],
    category: "Images"
  },
  "1.2": {
    id: "1.2",
    description: "Chaque image de décoration est-elle correctement ignorée par les technologies d'assistance ?",
    axeRules: ["presentation-role-conflict"],
    category: "Images"
  },
  "1.3": {
    id: "1.3",
    description: "Pour chaque image porteuse d'information ayant une alternative textuelle, cette alternative est-elle pertinente ?",
    axeRules: ["image-alt"],
    category: "Images"
  },
  "1.4": {
    id: "1.4",
    description: "Pour chaque image utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative permet-elle d'identifier la nature et la fonction de l'image ?",
    axeRules: ["image-alt"],
    category: "Images"
  },
  "1.5": {
    id: "1.5",
    description: "Pour chaque image utilisée comme CAPTCHA, une solution d'accès alternatif au contenu ou à la fonction du CAPTCHA est-elle présente ?",
    axeRules: [],
    category: "Images"
  },
  "1.6": {
    id: "1.6",
    description: "Chaque image porteuse d'information a-t-elle, si nécessaire, une description détaillée ?",
    axeRules: ["image-alt"],
    category: "Images"
  },
  "1.7": {
    id: "1.7",
    description: "Pour chaque image porteuse d'information ayant une description détaillée, cette description est-elle pertinente ?",
    axeRules: [],
    category: "Images"
  },
  "1.8": {
    id: "1.8",
    description: "Chaque image texte porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée ?",
    axeRules: [],
    category: "Images"
  },
  "1.9": {
    id: "1.9",
    description: "Chaque légende d'image est-elle, si nécessaire, correctement reliée à l'image correspondante ?",
    axeRules: ["figure-caption"],
    category: "Images"
  },

  // Thématique 2 : Cadres
  "2.1": {
    id: "2.1",
    description: "Chaque cadre a-t-il un titre de cadre ?",
    axeRules: ["frame-title"],
    category: "Cadres"
  },
  "2.2": {
    id: "2.2",
    description: "Pour chaque cadre ayant un titre de cadre, ce titre de cadre est-il pertinent ?",
    axeRules: ["frame-title"],
    category: "Cadres"
  },

  // Thématique 3 : Couleurs
  "3.1": {
    id: "3.1",
    description: "Dans chaque page web, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?",
    axeRules: ["color-contrast"],
    category: "Couleurs"
  },
  "3.2": {
    id: "3.2",
    description: "Dans chaque page web, le contraste entre la couleur du texte et la couleur de son arrière-plan est-il suffisamment élevé ?",
    axeRules: ["color-contrast"],
    category: "Couleurs"
  },
  "3.3": {
    id: "3.3",
    description: "Dans chaque page web, les couleurs utilisées dans les composants d'interface ou les éléments graphiques porteurs d'informations sont-elles suffisamment contrastées ?",
    axeRules: ["color-contrast"],
    category: "Couleurs"
  },

  // Thématique 4 : Multimédia
  "4.1": {
    id: "4.1",
    description: "Chaque média temporel pré-enregistré a-t-il, si nécessaire, une transcription textuelle ou une audio-description ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.2": {
    id: "4.2",
    description: "Pour chaque média temporel pré-enregistré ayant une transcription textuelle ou une audio-description synchronisée, celles-ci sont-elles pertinentes ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.3": {
    id: "4.3",
    description: "Chaque média temporel synchronisé pré-enregistré a-t-il, si nécessaire, des sous-titres synchronisés ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.4": {
    id: "4.4",
    description: "Pour chaque média temporel synchronisé pré-enregistré ayant des sous-titres synchronisés, ces sous-titres sont-ils pertinents ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.5": {
    id: "4.5",
    description: "Chaque média temporel pré-enregistré a-t-il, si nécessaire, une audio-description synchronisée ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.6": {
    id: "4.6",
    description: "Pour chaque média temporel pré-enregistré ayant une audio-description synchronisée, celle-ci est-elle pertinente ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.7": {
    id: "4.7",
    description: "Chaque média temporel est-il clairement identifiable ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.8": {
    id: "4.8",
    description: "Chaque média non temporel a-t-il, si nécessaire, une alternative ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.9": {
    id: "4.9",
    description: "Pour chaque média non temporel ayant une alternative, cette alternative est-elle pertinente ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.10": {
    id: "4.10",
    description: "Chaque son déclenché automatiquement est-il contrôlable par l'utilisateur ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.11": {
    id: "4.11",
    description: "La consultation de chaque média temporel est-elle, si nécessaire, contrôlable par le clavier et tout dispositif de pointage ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.12": {
    id: "4.12",
    description: "La consultation de chaque média non temporel est-elle contrôlable par le clavier et tout dispositif de pointage ?",
    axeRules: [],
    category: "Multimédia"
  },
  "4.13": {
    id: "4.13",
    description: "Chaque média temporel et non temporel est-il compatible avec les technologies d'assistance ?",
    axeRules: [],
    category: "Multimédia"
  },

  // Thématique 5 : Tableaux
  "5.1": {
    id: "5.1",
    description: "Chaque tableau de données complexe a-t-il un résumé ?",
    axeRules: ["table-duplicate-name"],
    category: "Tableaux"
  },
  "5.2": {
    id: "5.2",
    description: "Pour chaque tableau de données complexe ayant un résumé, celui-ci est-il pertinent ?",
    axeRules: [],
    category: "Tableaux"
  },
  "5.3": {
    id: "5.3",
    description: "Pour chaque tableau de mise en forme, le contenu linéarisé reste-t-il compréhensible ?",
    axeRules: ["layout-table"],
    category: "Tableaux"
  },
  "5.4": {
    id: "5.4",
    description: "Chaque tableau de données a-t-il un titre ?",
    axeRules: ["table-fake-caption"],
    category: "Tableaux"
  },
  "5.5": {
    id: "5.5",
    description: "Pour chaque tableau de données ayant un titre, celui-ci est-il pertinent ?",
    axeRules: [],
    category: "Tableaux"
  },
  "5.6": {
    id: "5.6",
    description: "Pour chaque tableau de données, chaque en-tête de colonnes et chaque en-tête de lignes sont-ils correctement déclarés ?",
    axeRules: ["td-headers-attr", "th-has-data-cells"],
    category: "Tableaux"
  },
  "5.7": {
    id: "5.7",
    description: "Pour chaque tableau de données, la technique appropriée permettant d'associer chaque cellule avec ses en-têtes est-elle utilisée ?",
    axeRules: ["td-has-header"],
    category: "Tableaux"
  },
  "5.8": {
    id: "5.8",
    description: "Chaque tableau de mise en forme ne doit pas utiliser d'éléments propres aux tableaux de données. Cette règle est-elle respectée ?",
    axeRules: ["layout-table"],
    category: "Tableaux"
  },

  // Thématique 6 : Liens
  "6.1": {
    id: "6.1",
    description: "Chaque lien est-il explicite (hors cas particuliers) ?",
    axeRules: ["link-name"],
    category: "Liens"
  },
  "6.2": {
    id: "6.2",
    description: "Dans chaque page web, chaque lien, à l'exception des ancres, a-t-il un intitulé ?",
    axeRules: ["link-name"],
    category: "Liens"
  },

  // Thématique 7 : Scripts
  "7.1": {
    id: "7.1",
    description: "Chaque script est-il, si nécessaire, compatible avec les technologies d'assistance ?",
    axeRules: ["aria-hidden-focus"],
    category: "Scripts"
  },
  "7.2": {
    id: "7.2",
    description: "Pour chaque script ayant une alternative, cette alternative est-elle pertinente ?",
    axeRules: [],
    category: "Scripts"
  },
  "7.3": {
    id: "7.3",
    description: "Chaque script est-il contrôlable par le clavier et par tout dispositif de pointage (hors cas particuliers) ?",
    axeRules: ["keyboard"],
    category: "Scripts"
  },
  "7.4": {
    id: "7.4",
    description: "Pour chaque script qui initie un changement de contexte, l'utilisateur est-il averti ou en a-t-il le contrôle ?",
    axeRules: [],
    category: "Scripts"
  },
  "7.5": {
    id: "7.5",
    description: "Dans chaque page web, les messages de statut sont-ils correctement restitués par les technologies d'assistance ?",
    axeRules: ["aria-roles", "aria-valid-attr-value"],
    category: "Scripts"
  },

  // Thématique 8 : Éléments obligatoires
  "8.1": {
    id: "8.1",
    description: "Chaque page web est-elle définie par un type de document ?",
    axeRules: ["html-has-lang"],
    category: "Éléments obligatoires"
  },
  "8.2": {
    id: "8.2",
    description: "Pour chaque page web, le code source est-il valide selon le type de document spécifié ?",
    axeRules: [],
    category: "Éléments obligatoires"
  },
  "8.3": {
    id: "8.3",
    description: "Dans chaque page web, la langue par défaut est-elle présente ?",
    axeRules: ["html-has-lang"],
    category: "Éléments obligatoires"
  },
  "8.4": {
    id: "8.4",
    description: "Pour chaque page web ayant une langue par défaut, le code de langue est-il pertinent ?",
    axeRules: ["html-lang-valid"],
    category: "Éléments obligatoires"
  },
  "8.5": {
    id: "8.5",
    description: "Chaque page web a-t-elle un titre de page ?",
    axeRules: ["document-title"],
    category: "Éléments obligatoires"
  },
  "8.6": {
    id: "8.6",
    description: "Pour chaque page web ayant un titre de page, ce titre est-il pertinent ?",
    axeRules: ["document-title"],
    category: "Éléments obligatoires"
  },
  "8.7": {
    id: "8.7",
    description: "Dans chaque page web, chaque changement de langue est-il indiqué dans le code source ?",
    axeRules: ["html-xml-lang-mismatch"],
    category: "Éléments obligatoires"
  },
  "8.8": {
    id: "8.8",
    description: "Dans chaque page web, le code de langue de chaque changement de langue est-il valide et pertinent ?",
    axeRules: ["html-lang-valid"],
    category: "Éléments obligatoires"
  },
  "8.9": {
    id: "8.9",
    description: "Dans chaque page web, les balises ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?",
    axeRules: ["presentation-role-conflict"],
    category: "Éléments obligatoires"
  },
  "8.10": {
    id: "8.10",
    description: "Dans chaque page web, les changements du sens de lecture sont-ils signalés ?",
    axeRules: [],
    category: "Éléments obligatoires"
  },

  // Thématique 9 : Structuration de l'information
  "9.1": {
    id: "9.1",
    description: "Dans chaque page web, l'information est-elle structurée par l'utilisation appropriée de titres ?",
    axeRules: ["heading-order"],
    category: "Structuration de l'information"
  },
  "9.2": {
    id: "9.2",
    description: "Dans chaque page web, la structure du document est-elle cohérente ?",
    axeRules: ["landmark-one-main"],
    category: "Structuration de l'information"
  },
  "9.3": {
    id: "9.3",
    description: "Dans chaque page web, chaque liste est-elle correctement structurée ?",
    axeRules: ["list"],
    category: "Structuration de l'information"
  },
  "9.4": {
    id: "9.4",
    description: "Dans chaque page web, chaque citation est-elle correctement indiquée ?",
    axeRules: [],
    category: "Structuration de l'information"
  },

  // Thématique 10 : Présentation de l'information
  "10.1": {
    id: "10.1",
    description: "Dans le site web, des feuilles de styles sont-elles utilisées pour contrôler la présentation de l'information ?",
    axeRules: [],
    category: "Présentation de l'information"
  },
  "10.2": {
    id: "10.2",
    description: "Dans chaque page web, le contenu visible reste-t-il présent lorsque les feuilles de styles sont désactivées ?",
    axeRules: [],
    category: "Présentation de l'information"
  },
  "10.3": {
    id: "10.3",
    description: "Dans chaque page web, l'information reste-t-elle compréhensible lorsque les feuilles de styles sont désactivées ?",
    axeRules: [],
    category: "Présentation de l'information"
  },
  "10.4": {
    id: "10.4",
    description: "Dans chaque page web, le texte reste-t-il lisible lorsque la taille des caractères est augmentée jusqu'à 200%, au moins ?",
    axeRules: [],
    category: "Présentation de l'information"
  },
  "10.5": {
    id: "10.5",
    description: "Dans chaque page web, les déclarations CSS de couleurs de fond d'élément et de police sont-elles correctement utilisées ?",
    axeRules: ["color-contrast"],
    category: "Présentation de l'information"
  },
  "10.6": {
    id: "10.6",
    description: "Dans chaque page web, chaque lien dont la nature n'est pas évidente est-il visible par rapport au texte environnant ?",
    axeRules: ["link-in-text-block"],
    category: "Présentation de l'information"
  },
  "10.7": {
    id: "10.7",
    description: "Dans chaque page web, pour chaque élément recevant le focus, la prise de focus est-elle visible ?",
    axeRules: [],
    category: "Présentation de l'information"
  },
  "10.8": {
    id: "10.8",
    description: "Pour chaque page web, les contenus cachés ont-ils vocation à être ignorés par les technologies d'assistance ?",
    axeRules: ["aria-hidden-body"],
    category: "Présentation de l'information"
  },
  "10.9": {
    id: "10.9",
    description: "Dans chaque page web, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?",
    axeRules: [],
    category: "Présentation de l'information"
  },
  "10.10": {
    id: "10.10",
    description: "Dans chaque page web, l'information ne doit pas être donnée par la position uniquement. Cette règle est-elle respectée ?",
    axeRules: [],
    category: "Présentation de l'information"
  },
  "10.11": {
    id: "10.11",
    description: "Pour chaque page web, les contenus peuvent-ils être présentés sans avoir recours à la fois à un défilement vertical pour une fenêtre ayant une hauteur de 256px ou à un défilement horizontal pour une fenêtre ayant une largeur de 320px ?",
    axeRules: [],
    category: "Présentation de l'information"
  },
  "10.12": {
    id: "10.12",
    description: "Dans chaque page web, les propriétés d'espacement du texte peuvent-elles être redéfinies par l'utilisateur sans perte de contenu ou de fonctionnalité ?",
    axeRules: [],
    category: "Présentation de l'information"
  },
  "10.13": {
    id: "10.13",
    description: "Dans chaque page web, les contenus additionnels apparaissant à la prise de focus ou au survol d'un composant d'interface sont-ils contrôlables par l'utilisateur ?",
    axeRules: [],
    category: "Présentation de l'information"
  },
  "10.14": {
    id: "10.14",
    description: "Dans chaque page web, les contenus additionnels apparaissant via les styles CSS uniquement peuvent-ils être rendus visibles au clavier et par tout dispositif de pointage ?",
    axeRules: [],
    category: "Présentation de l'information"
  },

  // Thématique 11 : Formulaires
  "11.1": {
    id: "11.1",
    description: "Chaque champ de formulaire a-t-il une étiquette ?",
    axeRules: ["label"],
    category: "Formulaires"
  },
  "11.2": {
    id: "11.2",
    description: "Chaque étiquette associée à un champ de formulaire est-elle pertinente ?",
    axeRules: ["label"],
    category: "Formulaires"
  },
  "11.3": {
    id: "11.3",
    description: "Dans chaque formulaire, chaque étiquette associée à un champ de formulaire ayant la même fonction et répété plusieurs fois dans une même page ou dans un ensemble de pages est-elle cohérente ?",
    axeRules: [],
    category: "Formulaires"
  },
  "11.4": {
    id: "11.4",
    description: "Dans chaque formulaire, chaque étiquette de champ et son champ associé sont-ils accolés ?",
    axeRules: [],
    category: "Formulaires"
  },
  "11.5": {
    id: "11.5",
    description: "Dans chaque formulaire, les champs de même nature sont-ils regroupés, si nécessaire ?",
    axeRules: ["fieldset"],
    category: "Formulaires"
  },
  "11.6": {
    id: "11.6",
    description: "Dans chaque formulaire, chaque regroupement de champs de formulaire a-t-il une légende ?",
    axeRules: ["fieldset"],
    category: "Formulaires"
  },
  "11.7": {
    id: "11.7",
    description: "Dans chaque formulaire, chaque légende associée à un regroupement de champs de même nature est-elle pertinente ?",
    axeRules: [],
    category: "Formulaires"
  },
  "11.8": {
    id: "11.8",
    description: "Dans chaque formulaire, les items de même nature d'une liste de choix sont-ils regroupés de manière pertinente ?",
    axeRules: ["select-name"],
    category: "Formulaires"
  },
  "11.9": {
    id: "11.9",
    description: "Dans chaque formulaire, l'intitulé de chaque bouton est-il pertinent ?",
    axeRules: ["button-name"],
    category: "Formulaires"
  },
  "11.10": {
    id: "11.10",
    description: "Dans chaque formulaire, le contrôle de saisie est-il utilisé de manière pertinente ?",
    axeRules: ["aria-input-field-name"],
    category: "Formulaires"
  },
  "11.11": {
    id: "11.11",
    description: "Dans chaque formulaire, le contrôle de saisie est-il accompagné, si nécessaire, de suggestions facilitant la correction des erreurs de saisie ?",
    axeRules: [],
    category: "Formulaires"
  },
  "11.12": {
    id: "11.12",
    description: "Pour chaque formulaire qui modifie ou supprime des données, ou qui transmet des réponses à un test ou à un examen, ou dont la validation a des conséquences financières ou juridiques, la saisie des données vérifie-t-elle une de ces conditions ?",
    axeRules: [],
    category: "Formulaires"
  },
  "11.13": {
    id: "11.13",
    description: "La finalité d'un champ de saisie peut-elle être déduite pour faciliter le remplissage automatique des champs avec les données de l'utilisateur ?",
    axeRules: ["autocomplete-valid"],
    category: "Formulaires"
  },

  // Thématique 12 : Navigation
  "12.1": {
    id: "12.1",
    description: "Chaque ensemble de pages dispose-t-il de deux systèmes de navigation différents, au moins (hors cas particuliers) ?",
    axeRules: [],
    category: "Navigation"
  },
  "12.2": {
    id: "12.2",
    description: "Dans chaque ensemble de pages, le menu et les barres de navigation sont-ils toujours à la même place ?",
    axeRules: [],
    category: "Navigation"
  },
  "12.3": {
    id: "12.3",
    description: "La page « plan du site » est-elle pertinente ?",
    axeRules: [],
    category: "Navigation"
  },
  "12.4": {
    id: "12.4",
    description: "Dans chaque ensemble de pages, la page « plan du site » est-elle atteignable de manière identique ?",
    axeRules: [],
    category: "Navigation"
  },
  "12.5": {
    id: "12.5",
    description: "Dans chaque ensemble de pages, le moteur de recherche est-il atteignable de manière identique ?",
    axeRules: [],
    category: "Navigation"
  },
  "12.6": {
    id: "12.6",
    description: "Les zones de regroupement de contenus présentes dans plusieurs pages web (zones d'en-tête, de navigation principale, de contenu principal, de pied de page et de moteur de recherche) peuvent-elles être atteintes ou évitées ?",
    axeRules: ["landmark-banner-is-top-level", "landmark-contentinfo-is-top-level", "landmark-main-is-top-level", "landmark-no-duplicate-banner", "landmark-no-duplicate-contentinfo", "landmark-one-main"],
    category: "Navigation"
  },
  "12.7": {
    id: "12.7",
    description: "Dans chaque page web, un lien d'évitement ou d'accès rapide à la zone de contenu principal est-il présent ?",
    axeRules: ["skip-link"],
    category: "Navigation"
  },
  "12.8": {
    id: "12.8",
    description: "Dans chaque page web, l'ordre de tabulation est-il cohérent ?",
    axeRules: ["tabindex"],
    category: "Navigation"
  },
  "12.9": {
    id: "12.9",
    description: "Dans chaque page web, la navigation ne doit pas contenir de piège au clavier. Cette règle est-elle respectée ?",
    axeRules: ["keyboard-trap"],
    category: "Navigation"
  },
  "12.10": {
    id: "12.10",
    description: "Dans chaque page web, les raccourcis clavier n'utilisant qu'une seule touche (lettre minuscule ou majuscule, ponctuation, chiffre ou symbole) sont-ils contrôlables par l'utilisateur ?",
    axeRules: [],
    category: "Navigation"
  },
  "12.11": {
    id: "12.11",
    description: "Dans chaque page web, les contenus additionnels apparaissant au survol, à la prise de focus ou à l'activation d'un composant d'interface sont-ils, si nécessaire, atteignables au clavier ?",
    axeRules: [],
    category: "Navigation"
  },

  // Thématique 13 : Consultation
  "13.1": {
    id: "13.1",
    description: "Pour chaque page web, l'utilisateur a-t-il le contrôle de chaque limite de temps modifiant le contenu ?",
    axeRules: [],
    category: "Consultation"
  },
  "13.2": {
    id: "13.2",
    description: "Dans chaque page web, l'ouverture d'une nouvelle fenêtre ne doit pas être déclenchée sans action de l'utilisateur. Cette règle est-elle respectée ?",
    axeRules: [],
    category: "Consultation"
  },
  "13.3": {
    id: "13.3",
    description: "Dans chaque page web, chaque document bureautique en téléchargement possède-t-il, si nécessaire, une version accessible ?",
    axeRules: [],
    category: "Consultation"
  },
  "13.4": {
    id: "13.4",
    description: "Pour chaque document bureautique ayant une version accessible, cette version offre-t-elle la même information ?",
    axeRules: [],
    category: "Consultation"
  },
  "13.5": {
    id: "13.5",
    description: "Dans chaque page web, chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) a-t-il une alternative ?",
    axeRules: [],
    category: "Consultation"
  },
  "13.6": {
    id: "13.6",
    description: "Dans chaque page web, pour chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) ayant une alternative, cette alternative est-elle pertinente ?",
    axeRules: [],
    category: "Consultation"
  },
  "13.7": {
    id: "13.7",
    description: "Dans chaque page web, les changements brusques de luminosité ou les effets de flash sont-ils correctement utilisés ?",
    axeRules: [],
    category: "Consultation"
  },
  "13.8": {
    id: "13.8",
    description: "Dans chaque page web, chaque contenu en mouvement ou clignotant est-il contrôlable par l'utilisateur ?",
    axeRules: [],
    category: "Consultation"
  },
  "13.9": {
    id: "13.9",
    description: "Dans chaque page web, le contenu proposé est-il consultable quelle que soit l'orientation de l'écran ?",
    axeRules: [],
    category: "Consultation"
  },
  "13.10": {
    id: "13.10",
    description: "Dans chaque page web, les fonctionnalités utilisables ou disponibles au moyen d'un geste complexe peuvent-elles être également disponibles au moyen d'un geste simple ?",
    axeRules: [],
    category: "Consultation"
  },
  "13.11": {
    id: "13.11",
    description: "Dans chaque page web, les actions déclenchées au moyen d'un dispositif de pointage sur un point unique de l'écran peuvent-elles faire l'objet d'une annulation ?",
    axeRules: [],
    category: "Consultation"
  },
  "13.12": {
    id: "13.12",
    description: "Dans chaque page web, les fonctionnalités qui impliquent un mouvement de l'appareil ou vers l'appareil peuvent-elles être satisfaites de manière alternative ?",
    axeRules: [],
    category: "Consultation"
  }
};

module.exports = rgaaCriteria;
