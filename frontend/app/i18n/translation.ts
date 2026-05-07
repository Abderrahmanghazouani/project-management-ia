export type Locale = 'fr' | 'en';

export const translations = {
  fr: {
    heroCTA: {
      badgeIA: 'IA opérationnelle',
      badgeEMSI: 'EMSI 2025-2026',
      title1: 'Gestion de projets',
      title2: 'intelligente',
      subtitle: "Une plateforme Agile complète propulsée par Gemini AI. Du cahier des charges au board Kanban, automatisez l'analyse, la planification et la distribution des tâches.",
      btnPrimary: 'Démarrer gratuitement',
      btnSecondary: 'Voir la démo',
      stats: {
        modules: 'Modules',
        analysis: 'Analyse IA',
        roles: 'Rôles',
        command: 'Commande'
      },
      cards: {
        gemini: { title: 'Gemini AI', sub: 'Analyse CDC' },
        kanban: { title: 'Kanban', sub: 'Board temps réel' },
        team: { title: 'Équipe', sub: 'Distribution auto' },
        tracking: { title: 'Suivi', sub: 'Coûts et risques' }
      }
    },
    nav: {
      features: 'Fonctionnalités',
      workflow: 'Workflow IA',
      modules: 'Modules',
      docs: 'Documentation',
      login: 'Connexion',
      start: 'Démarrer →',
      status: 'IA opérationnelle',
    },
    hero: {
      badge: 'Propulsé par Gemini AI · EMSI 2025–2026',
      new: 'Nouveau',
      title1: 'Gérez vos projets',
      title2: "avec l'",
      title3: 'intelligence',
      title4: 'artificielle',
      desc: "Du cahier des charges au board Kanban — une plateforme Agile complète qui analyse, planifie et distribue les tâches automatiquement.",
      cta1: 'Créer un projet →',
      cta2: 'Voir la démo ▶',
      dashIA: 'Gemini AI actif',
      dashUrl: 'localhost:3000/dashboard',
      dockerCmd: 'docker-compose up --build',
      sidebar: {
        dash: 'Dashboard',
        projects: 'Projets',
        backlog: 'Backlog',
        kanban: 'Kanban',
        sprints: 'Sprints',
        ai: 'Assistant IA'
      },
      stats: {
        sprint: 'Sprint 2 - Semaine 3',
        project: 'Projet: SI Gestion Projets',
        active: 'ACTIF',
        tickets: 'Tickets',
        completed: 'Terminés',
        risks: 'Risques'
      },
      kanban: {
        todo: 'TO DO',
        progress: 'IN PROGRESS',
        done: 'DONE'
      }
    },
    stats: {
      trustedBy: 'Utilisé par les équipes de',
      data: [
        { value: '12', label: 'Modules intégrés' },
        { value: '4',  label: 'Rôles utilisateurs' },
        { value: '30', label: "Secondes d'analyse IA", suffix: 's' },
        { value: '1',  label: 'Commande de déploiement' },
      ]
    },
    features: {
      eyebrow: 'Fonctionnalités',
      title: 'Tout ce dont votre\néquipe a besoin',
      desc: "De l'analyse IA au board Kanban, chaque outil est pensé pour les équipes Agile.",
      more: 'En savoir plus',
      list: [
        {
          tag: "Assistant IA",
          title: "Analyse automatique du CDC",
          desc: "Collez votre cahier des charges. Gemini extrait tâches, durées estimées, complexité et risques en moins de 30 secondes.",
          stat: "< 30s",
          statLabel: "d'analyse",
          items: ["Extraction automatique des tâches", "Estimation jours/complexité", "Détection des risques projet", "Fallback manuel si API indisponible"]
        },
        {
          tag: "Board Kanban",
          title: "Visualisation sprint en temps réel",
          desc: "Board Kanban simple et efficace - To Do, In Progress, Done. Avancez vos tickets d'une colonne en un clic.",
          stat: "3",
          statLabel: "colonnes",
          items: ["Affichage par sprint actif", "Changement de statut instantané", "Filtres par assigné et type", "Priorités visuelles"]
        },
        {
          tag: "Équipe & Ressources",
          title: "Distribution automatique des tâches",
          desc: "Après validation IA, sélectionnez vos membres. La plateforme répartit équitablement les tâches selon la charge estimée.",
          stat: "Infini",
          statLabel: "membres",
          items: ["Répartition équilibrée", "Sélection ou saisie libre", "Vue charge par développeur", "Réassignation manuelle"]
        },
        {
          tag: "Risques & Coûts",
          title: "Suivi budgétaire et registre des risques",
          desc: "Criticité calculée automatiquement (probabilité x impact), registre trié, budget prévu vs réel avec écart visible.",
          stat: "0",
          statLabel: "surprises",
          items: ["Criticité = probabilité x impact", "Registre trié par criticité", "Budget prévu / réel / écart", "Plans de mitigation"]
        }
      ]
    },
    workflow: {
      eyebrow: 'Workflow IA',
      title: 'Du cahier des charges\nau sprint en 4 étapes',
      steps: [
        { step: '01', icon: '📄', title: 'Déposez le CDC', desc: 'Collez ou saisissez votre cahier des charges dans le formulaire IA intégré.' },
        { step: '02', icon: '✦',  title: 'Gemini analyse',  desc: "L'IA génère automatiquement les tâches, durées estimées, complexité et risques.", highlight: true },
        { step: '03', icon: '✓',  title: 'Confirmez',       desc: "Validez ou ajustez l'estimation avant de définir votre équipe et démarrer." },
        { step: '04', icon: '⊞',  title: 'Gérez',           desc: "Kanban, sprints, coûts, livrables et risques — tout centralisé en un seul endroit." },
      ],
    },
    aiProcess: {
      badge: 'Automatisation par IA',
      eyebrow: 'Module M3 - Gemini API',
      title: 'Analyse <span class="highlight">intelligente</span>\ndu cahier des charges',
      desc: 'Déposez votre CDC, Gemini analyse et génère automatiquement les tâches, estimations, complexité et risques en moins de 30 secondes.',
      steps: [
        { num: '1', title: 'Dépôt du CDC', desc: 'Le client saisit ou colle le texte de son cahier des charges dans le formulaire intégré.' },
        { num: '2', title: 'Analyse Gemini', desc: "L'API Gemini analyse le CDC avec un prompt structuré et retourne un JSON structuré." },
        { num: '3', title: 'Confirmation', desc: "Le client valide ou rejette l'estimation. Si rejeté, saisie manuelle possible." },
        { num: '4', title: 'Distribution', desc: "Les tâches sont automatiquement réparties entre les membres de l'équipe." }
      ],
      jsonTitle: 'response.json - Format de réponse Gemini',
      jsonTasks: ["Authentification JWT", "Gestion de projets", "Board Kanban", "Intégration Gemini"],
      jsonComplexity: "Moyenne",
      jsonRisks: ["Dépendance API Gemini", "Délai serré"],
    },
    modulesShowcase: {
      eyebrow: '12 Modules',
      title: 'Architecture fonctionnelle complète',
      filters: {
        all: 'Tous',
        high: 'Haute',
        medium: 'Moyenne',
        low: 'Basse'
      },
      list: [
        { id: "M1", name: "Authentification", priority: "Haute", sprint: "S1", desc: "JWT, BCrypt, gestion des sessions et contrôle d'accès par rôle (RBAC)." },
        { id: "M2", name: "Gestion Projets", priority: "Haute", sprint: "S1", desc: "CRUD complet avec statuts (Actif, En pause, Terminé), dates et budget." },
        { id: "M3", name: "Assistant IA", priority: "Haute", sprint: "S2", desc: "Analyse CDC via Gemini API - extraction tâches, durées, complexité et risques.", highlight: true },
        { id: "M4", name: "Gestion Équipe", priority: "Haute", sprint: "S2", desc: "Sélection membres, distribution automatique des tâches selon charge estimée." },
        { id: "M5", name: "Backlog / Tickets", priority: "Haute", sprint: "S2", desc: "User Stories, Tasks, Bugs avec priorité, story points et assignation." },
        { id: "M6", name: "Board Kanban", priority: "Haute", sprint: "S2", desc: "3 colonnes (To Do, In Progress, Done) avec changement de statut en un clic." },
        { id: "M7", name: "Sprints & Planning", priority: "Moyenne", sprint: "S3", desc: "Création de sprints avec dates, objectifs et affectation de tickets." },
        { id: "M8", name: "Ressources", priority: "Moyenne", sprint: "S3", desc: "Allocation membres par projet, suivi de la charge et des disponibilités." },
        { id: "M9", name: "Suivi des Coûts", priority: "Moyenne", sprint: "S3", desc: "Budget prévu vs réel, calcul automatique de l'écart (économie/dépassement)." },
        { id: "M10", name: "Livrables", priority: "Moyenne", sprint: "S3", desc: "Gestion des livrables avec statuts (En attente, Livré, En retard) et fichiers." },
        { id: "M11", name: "Registre Risques", priority: "Moyenne", sprint: "S4", desc: "Criticité = probabilité x impact, plans de mitigation et tri automatique." },
        { id: "M12", name: "Administration", priority: "Basse", sprint: "S4", desc: "CRUD utilisateurs, gestion des rôles globaux et paramètres plateforme." }
      ]
    },
    roles: {
      eyebrow: '4 Rôles Utilisateurs',
      title: 'Un accès adapté à chaque profil',
      desc: 'Chaque rôle dispose de permissions spécifiques pour une collaboration optimale et sécurisée.',
      list: [
        { role: "Client", responsibilities: ["Dépose le cahier des charges", "Consulte l'estimation IA", "Confirme ou rejette l'analyse", "Sélectionne les membres d'équipe", "Suit l'avancement du projet"] },
        { role: "Manager", responsibilities: ["Crée et supervise les projets", "Gère le backlog et les tickets", "Ajuste la distribution des tâches", "Suit les coûts et les risques", "Crée les sprints et le planning"] },
        { role: "Développeur", responsibilities: ["Consulte ses tâches assignées", "Met à jour les statuts des tickets", "Commente les tickets", "Gère le workflow Kanban", "Visualise sa charge de travail"] },
        { role: "Admin", responsibilities: ["Gère tous les utilisateurs", "Attribue les rôles globaux", "Configure la plateforme", "Accède à toutes les fonctions", "Supervise la sécurité"] }
      ]
    },
    techStack: {
      eyebrow: 'Stack Technique',
      title: 'Architecture moderne et robuste',
      desc: 'Une stack éprouvée combinant performance, sécurité et maintenabilité pour des projets de qualité.',
      technologies: [
        { name: "Next.js 14", category: "Frontend", desc: "Framework React avec App Router, SSR et optimisations automatiques." },
        { name: "Spring Boot", category: "Backend", desc: "API REST Java avec validation, sécurité et architecture en couches." },
        { name: "PostgreSQL", category: "Database", desc: "Base relationnelle avec migrations Flyway/Liquibase et requêtes optimisées." },
        { name: "Gemini AI", category: "Intelligence", desc: "API Google pour l'analyse CDC, extraction de tâches et estimation automatique." },
        { name: "Docker", category: "DevOps", desc: "Conteneurisation complète avec Docker Compose - une commande pour tout déployer." },
        { name: "JWT + BCrypt", category: "Sécurité", desc: "Authentification stateless avec tokens signés et mots de passe hachés." }
      ],
      specs: [
        { label: "Performance API", value: "< 500ms", desc: "Temps de réponse hors IA" },
        { label: "Timeout IA", value: "30s", desc: "Avec fallback manuel" },
        { label: "Pagination", value: "20/page", desc: "Projets et tickets" },
        { label: "Tests", value: "JUnit 5", desc: "Couverture modules Haute" }
      ],
      terminal: {
        title: 'terminal - déploiement',
        clone: '# Clone le repository',
        start: '# Lance tous les services',
        success: 'Tous les services ont démarré sur localhost:3000'
      }
    },
    testimonials: {
      eyebrow: 'Témoignages',
      title: 'Ce que disent nos utilisateurs',
      list: [
        { quote: "ProjAI a transformé notre façon de gérer les sprints. L'analyse automatique du CDC nous fait gagner des heures chaque semaine.", author: "Sarah M.", role: "Chef de Projet", company: "Tech Solutions", avatar: "SM" },
        { quote: "La distribution automatique des tâches par l'IA est incroyablement précise. Notre équipe est mieux équilibrée que jamais.", author: "Mohamed K.", role: "Scrum Master", company: "DevStudio", avatar: "MK" },
        { quote: "Interface intuitive, déploiement Docker en une commande, et l'intégration Gemini est un vrai game-changer pour nos estimations.", author: "Amina B.", role: "Lead Developer", company: "Innovate Labs", avatar: "AB" }
      ]
    },
    terminal: {
      eyebrow: 'Dev-ready',
      title: 'Déployez en\nune commande',
      desc: 'Architecture Next.js + Spring Boot + PostgreSQL, conteneurisée avec Docker Compose. Une commande, tout se lance.',
    },
    cta: {
      label: 'EMSI · 2025–2026',
      title1: 'Prêt à transformer',
      title2: 'votre',
      title3: 'gestion de projets',
      desc: "Rejoignez l'équipe EMSI et découvrez comment l'intelligence artificielle peut révolutionner vos sprints Agile.",
      btn1: 'Créer mon premier projet →',
      btn2: 'Voir la documentation',
    },
    footer: {
      tagline: "Système intelligent de gestion de projets avec assistance IA. Développé à l'EMSI sous la direction de Mr Driss Essabar.",
      modules: 'Modules',
      suite: 'Suite',
    },
    auth: {
      backHome: 'Accueil',
      loginEyebrow: 'Connexion', registerEyebrow: 'Inscription',
      loginTitle: 'Bon retour 👋', registerTitle: 'Créer un compte',
      noAccount: 'Pas encore de compte ?', signUpLink: "S'inscrire gratuitement",
      alreadyAccount: 'Déjà un compte ?', signInLink: 'Se connecter',
      emailLabel: 'Adresse email', emailPlaceholder: 'vous@emsi.ma',
      passwordLabel: 'Mot de passe', passwordPlaceholder: '••••••••',
      confirmPassword: 'Confirmer', fullName: 'Nom complet',
      fullNamePlaceholder: 'Yassine Abderrazik', selectRole: 'Votre rôle',
      signIn: 'Se connecter', signingIn: 'Connexion...',
      createAccount: 'Créer mon compte', creating: 'Création...',
      show: 'Voir', hide: 'Cacher', rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié ?',
      orContinueWith: 'ou continuer avec', continueWithGoogle: 'Continuer avec Google',
      agreeToTerms: "J'accepte les", termsLink: "conditions d'utilisation",
      andThe: 'et la', privacyLink: 'politique de confidentialité',
      strengthWeak: 'Faible', strengthFair: 'Moyen', strengthGood: 'Bien', strengthStrong: 'Fort',
      panelDesc: "La plateforme Agile intelligente qui transforme votre cahier des charges en sprints en quelques secondes.",
      panel1: 'Analyse de CDC par Gemini AI en < 30s',
      panel2: 'Board Kanban & sprints intégrés',
      panel3: 'Distribution automatique des tâches',
      panel4: 'Registre des risques & suivi des coûts',
      builtBy: "Développé par l'équipe EMSI",
    },
    workflowPage: {
      badge: 'Processus intelligent',
      badgeIA: 'IA Gemini',
      stepLabel: 'Étape',
      heroTitle: "Comment l'IA transforme votre CDC en backlog opérationnel",
      heroSubtitle: 'Du texte brut à un projet structuré en moins de 30 secondes',
      btnAnalyse: "Essayer l'analyse →",
      btnDemo: 'Regarder la démo',
      timelineTitle: 'Le parcours de votre projet',
      steps: [
        { num: '01', title: 'Dépôt du CDC', desc: 'Saisie de votre Cahier des Charges. Minimum 100 caractères pour une analyse optimale. Supporte le texte brut avec prévisualisation immédiate.' },
        { num: '02', title: 'Analyse par Gemini AI', desc: "Traitement par l'API gemini-1.5-flash. Utilisation d'un prompt structuré pour extraire tâches, durées et risques en moins de 30 secondes." },
        { num: '03', title: 'Validation Client', desc: "Affichage détaillé de l'estimation : tâches, durées, complexité et risques. Vous confirmez ou rejetez pour ajuster les paramètres." },
        { num: '04', title: 'Distribution automatique', desc: "Sélection des membres de l'équipe et répartition équitable basée sur la charge. Ajustement manuel possible par le manager." },
      ],
      flowTitle: 'Architecture du flux',
      flowSubtitle: 'Une chaîne de valeur automatisée de bout en bout',
      flowNodes: {
        cdc: 'CDC',
        form: 'Formulaire',
        gemini: 'Gemini AI',
        analysis: 'Analyse IA',
        json: 'JSON',
        tasks: 'Tâches/Durées',
        validation: 'Validation',
        confirm: 'Client confirme',
        backlog: 'Backlog',
        tickets: 'Tickets créés',
      },
      jsonLabels: {
        complexity: 'Moyenne',
        risk1: 'Latence API',
        risk2: 'Cohérence des données'
      },
      advTitle: "Avantages de l'approche IA",
      advantages: [
        { icon: '⚡', title: 'Gain de temps', desc: 'Passez de plusieurs jours de planification à quelques secondes.' },
        { icon: '🎯', title: 'Précision', desc: "L'IA identifie des dépendances souvent oubliées par l'humain." },
        { icon: '🔍', title: 'Anticipation', desc: 'Détection proactive des risques techniques et fonctionnels.' },
        { icon: '🔄', title: 'Flexibilité', desc: 'Ré-analysez votre projet instantanément après chaque modification.' },
        { icon: '📐', title: 'Standardisation', desc: 'Format de backlog cohérent pour tous vos projets.' },
        { icon: '📈', title: 'Évolutivité', desc: 'Gerez des dizaines de projets simultanément sans surcharge.' }
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: "Que faire si l'API Gemini est indisponible ?", a: 'Un mode dégradé permet la saisie manuelle des tâches en attendant le rétablissement du service.' },
        { q: "Puis-je modifier l'estimation ?", a: "Oui, après l'analyse IA, vous avez la main pour ajuster chaque durée et titre de tâche." },
        { q: "L'IA apprend-elle ?", a: "Nos modèles sont affinés pour ProJAI mais ne conservent pas vos données privées pour l'entraînement global." },
        { q: 'Limite de taille du CDC ?', a: "Nous acceptons jusqu'à 50 000 caractères pour une analyse exhaustive." },
        { q: 'Les données sont-elles stockées ?', a: 'Seules les versions validées sont stockées en base de données pour votre suivi projet.' }
      ]
    },
    modulesPage: {
      badge: 'Fonctionnalités complètes',
      badgeCount: '12 modules',
      heroTitle: 'Tous les modules pour une gestion de projet Agile réussie',
      filters: {
        all: 'Tous',
        high: 'Haute',
        medium: 'Moyenne',
        low: 'Basse'
      },
      stats: {
        total: 'Modules totaux',
        high: 'Haute priorité',
        medium: 'Moyenne priorité',
        low: 'Basse priorité'
      },
      modules: [
        { id: "M1", sprint: "S1", priority: "Haute", icon: "🔐", title: "Authentification & Rôles", desc: "Gestion sécurisée des accès et des permissions utilisateurs.", features: ["JWT 24h", "BCrypt 10 rounds", "RBAC", "4 rôles", "Interface admin"] },
        { id: "M2", sprint: "S1", priority: "Haute", icon: "📁", title: "Gestion des Projets", desc: "Centralisation de tous vos projets avec suivi d'état en temps réel.", features: ["CRUD complet", "Statuts Dynamiques", "Filtres avancés", "Validation backend"] },
        { id: "M3", sprint: "S2", priority: "Haute", icon: "🤖", title: "Assistant IA (Gemini)", desc: "Intelligence artificielle pour la génération automatique de backlogs.", features: ["API Gemini 1.5", "Génération JSON", "Estimation durées", "Versionnage estimations"] },
        { id: "M4", sprint: "S2", priority: "Haute", icon: "👥", title: "Gestion d'Équipe", desc: "Optimisation de la collaboration et de la répartition des tâches.", features: ["Ajout membres", "Rôles projet", "Distribution auto", "Ajustement manuel"] },
        { id: "M5", sprint: "S2", priority: "Haute", icon: "📋", title: "Backlog & Tickets", desc: "Organisation granulaire des besoins fonctionnels et techniques.", features: ["Types diversifiés", "Priorisation", "Assignation", "Points d'effort"] },
        { id: "M6", sprint: "S2", priority: "Haute", icon: "📊", title: "Board Kanban", desc: "Visualisation fluide du workflow de développement.", features: ["Drag & Drop", "Filtres visuels", "Statuts temps réel", "Indicateurs priorité"] },
        { id: "M7", sprint: "S3", priority: "Moyenne", icon: "🗓️", title: "Sprints & Planning", desc: "Planification itérative pour un respect rigoureux des délais.", features: ["Création sprint", "Affectation tickets", "Board sprint", "Suivi avancement"] },
        { id: "M8", sprint: "S3", priority: "Moyenne", icon: "⚖️", title: "Ressources & Allocation", desc: "Équilibrage de la charge de travail entre les membres.", features: ["Charge par membre", "Compteur In Progress", "Rôles spécifiques", "Optimisation flux"] },
        { id: "M9", sprint: "S3", priority: "Moyenne", icon: "💰", title: "Suivi des Coûts", desc: "Contrôle budgétaire précis pour chaque phase du projet.", features: ["Budget prévu/réel", "Écart automatique", "Graphiques évolution", "Alertes dépassement"] },
        { id: "M10", sprint: "S3", priority: "Moyenne", icon: "📦", title: "Livrables", desc: "Gestion des sorties et validation des jalons critiques.", features: ["Gestion fichiers", "Suivi statut", "Dates limites", "Historique versions"] },
        { id: "M11", sprint: "S4", priority: "Moyenne", icon: "⚠️", title: "Registre des Risques", desc: "Identification et mitigation proactive des menaces projet.", features: ["Calcul criticité", "Plan mitigation", "Codes couleur", "Suivi dynamique"] },
        { id: "M12", sprint: "S4", priority: "Basse", icon: "⚙️", title: "Administration", desc: "Outils de configuration globale pour les super-utilisateurs.", features: ["Logs audit", "Paramètres système", "Modif rôles globaux", "Maintenance DB"] },
      ],
      tableTitle: 'Chronologie de déploiement',
      tableHeaders: {
        sprint: 'Sprint',
        period: 'Période',
        modules: 'Modules',
        desc: 'Description'
      },
      tableRows: [
        { s: "S1", p: "Semaine 1–2", m: "M1, M2", d: "Setup initial, Authentification et gestion de base des projets." },
        { s: "S2", p: "Semaine 3–4", m: "M3, M4, M5, M6", d: "Cœur intelligent : IA Gemini, Équipe, Backlog et Kanban." },
        { s: "S3", p: "Semaine 5–6", m: "M7, M8, M9, M10", d: "Gestion opérationnelle : Sprints, Ressources, Coûts et Livrables." },
        { s: "S4", p: "Semaine 7–8", m: "M11, M12", d: "Finalisation : Registre des risques, Administration et Tests." }
      ]
    },
    docsPage: {
      badge: 'Documentation complète',
      badgeVersion: 'v1.0',
      heroTitle: 'Tout ce que vous devez savoir sur ProJAI',
      heroSubtitle: 'API, déploiement, guides utilisateur — commencez en quelques minutes',
      searchPlaceholder: 'Rechercher dans la documentation...',
      navCards: [
        { icon: "🚀", title: "Démarrage rapide", sub: "Installez et lancez le projet en 5 min", color: "#F0FDF4" },
        { icon: "⚙️", title: "Guide technique", sub: "Architecture Spring Boot & Next.js", color: "#EFF6FF" },
        { icon: "📘", title: "Guide utilisateur", sub: "Comment utiliser l'IA et le Kanban", color: "#F5F3FF" },
        { icon: "🔌", title: "API Reference", sub: "Documentation Swagger & Endpoints", color: "#FEF2F2" },
        { icon: "🐳", title: "Déploiement", sub: "Docker, CI/CD et production", color: "#FFFBEB" },
        { icon: "❓", title: "FAQ", sub: "Réponses aux questions courantes", color: "#F9FAFB" }
      ],
      quickStartTitle: 'Prêts à coder ?',
      quickStartComments: {
        clone: '# 1. Cloner le repository',
        env: '# 2. Variables d\'environnement',
        docker: '# 3. Lancer avec Docker'
      },
      prereqs: [
        { icon: "🟢", label: "Node.js 18+" },
        { icon: "☕", label: "Java + Maven 17+" },
        { icon: "🐳", label: "Docker Compose (optionnel)" },
        { icon: "🤖", label: "Clé API Gemini (requis)" }
      ],
      stackTitle: 'Stack Technologique',
      stackHeaders: {
        layer: 'Couche',
        tech: 'Technologie',
        version: 'Version'
      },
      stackRows: [
        { l: "Frontend", t: "Next.js", v: "14.x", c: "#F5F3FF", tc: "#8B5CF6" },
        { l: "Backend", t: "Spring Boot", v: "3.x", c: "#FEF2F2", tc: "#EF4444" },
        { l: "Database", t: "PostgreSQL", v: "15", c: "#FFF7ED", tc: "#F97316" },
        { l: "IA", t: "Google Gemini", v: "1.5 Flash", c: "#F0FDF4", tc: "#16A34A" },
        { l: "Infra", t: "Docker", v: "Compose", c: "#EFF6FF", tc: "#3B82F6" }
      ],
      kpi: [
        { label: "Performance API", val: "<500ms" },
        { label: "Timeout IA", val: "30s" },
        { label: "Pagination", val: "20/page" },
        { label: "Tests Coverage", val: "80%+" }
      ],
      apiTitle: 'Référence API',
      apiGroups: [
        { 
          group: "Authentification", 
          endpoints: [
            { m: "POST", p: "/api/auth/register", d: "Créer un compte", c: "#16A34A" },
            { m: "POST", p: "/api/auth/login", d: "Se connecter (JWT)", c: "#16A34A" },
            { m: "GET", p: "/api/auth/me", d: "Profil utilisateur", c: "#3B82F6" }
          ]
        },
        { 
          group: "Projets", 
          endpoints: [
            { m: "GET", p: "/api/projets", d: "Lister (paginé 20/page)", c: "#3B82F6" },
            { m: "POST", p: "/api/projets", d: "Créer un projet", c: "#16A34A" },
            { m: "PUT", p: "/api/projets/{id}", d: "Modifier", c: "#F59E0B" },
            { m: "DELETE", p: "/api/projets/{id}", d: "Supprimer", c: "#EF4444" }
          ]
        }
      ],
      envTitle: 'Variables d\'environnement',
      envBackend: '.env Backend',
      envFrontend: '.env.local Frontend',
      envPlaceholders: {
        gemini: 'votre_cle_api',
        jwt: 'votre_secret_32chars',
        github: 'votre-org'
      },
      rbacTitle: 'Droits & Rôles (RBAC)',
      rbacHeaders: ['Fonctionnalité', 'Admin', 'Manager', 'Dev', 'Client'],
      rbacRows: [
        ["Gérer utilisateurs", "✓", "✓", "—", "—"],
        ["Analyser CDC (IA)", "✓", "✓", "—", "✓"],
        ["Gérer backlog", "✓", "✓", "✓", "—"],
        ["Voir board Kanban", "✓", "✓", "✓", "✓"]
      ],
      dodTitle: 'Definition of Done',
      dodItems: ["Conforme aux critères d'acceptation", "Tests unitaires modules Haute", "Documentation Swagger à jour", "Code review effectuée"],
      coverageTitle: 'Couverture de tests',
      coverageBars: [
        { m: "M1 Authentification", p: 80 },
        { m: "M3 IA Gemini", p: 70 },
        { m: "M5 Backlog", p: 80 }
      ],
      faqSupportTitle: 'FAQ & Support',
      faq: [
        { q: "Comment obtenir une clé API Gemini ?", a: "Rendez-vous sur makersuite.google.com/app/apikey. Le plan gratuit offre 60 req/min." },
        { q: "Puis-je utiliser sans Docker ?", a: "Oui, configurez PostgreSQL manuellement et utilisez mvn spring-boot:run + npm run dev." },
        { q: "Les données sont-elles chiffrées ?", a: "Oui, BCrypt 10 rounds pour les mots de passe et HMAC-SHA256 pour les tokens JWT." }
      ],
      supportCards: {
        email: { title: 'Email', sub: 'support@projai.com' },
        chat: { title: 'Chat direct', sub: 'Disponible 9h–18h' },
        github: { title: 'GitHub', sub: 'votre-org/projai' }
      }
    }
  },

  en: {
    heroCTA: {
      badgeIA: 'AI operational',
      badgeEMSI: 'EMSI 2025-2026',
      title1: 'Intelligent project',
      title2: 'management',
      subtitle: "A complete Agile platform powered by Gemini AI. From specs to Kanban board, automate analysis, planning and task distribution.",
      btnPrimary: 'Start for free',
      btnSecondary: 'Watch demo',
      stats: {
        modules: 'Modules',
        analysis: 'AI Analysis',
        roles: 'Roles',
        command: 'Command'
      },
      cards: {
        gemini: { title: 'Gemini AI', sub: 'Specs analysis' },
        kanban: { title: 'Kanban', sub: 'Real-time board' },
        team: { title: 'Team', sub: 'Auto distribution' },
        tracking: { title: 'Tracking', sub: 'Costs & risks' }
      }
    },
    nav: {
      features: 'Features',
      workflow: 'AI Workflow',
      modules: 'Modules',
      docs: 'Documentation',
      login: 'Sign In',
      start: 'Get Started →',
      status: 'AI operational',
    },
    hero: {
      badge: 'Powered by Gemini AI · EMSI 2025–2026',
      new: 'New',
      title1: 'Manage your projects',
      title2: 'with ',
      title3: 'artificial',
      title4: 'intelligence',
      desc: 'From specs to Kanban board — a complete Agile platform that automatically analyzes, plans and distributes tasks.',
      cta1: 'Create a project →',
      cta2: 'Watch the demo ▶',
      dashIA: 'Gemini AI active',
      dashUrl: 'localhost:3000/dashboard',
      dockerCmd: 'docker-compose up --build',
      sidebar: {
        dash: 'Dashboard',
        projects: 'Projects',
        backlog: 'Backlog',
        kanban: 'Kanban',
        sprints: 'Sprints',
        ai: 'AI Assistant'
      },
      stats: {
        sprint: 'Sprint 2 - Week 3',
        project: 'Project: Management SI',
        active: 'ACTIVE',
        tickets: 'Tickets',
        completed: 'Completed',
        risks: 'Risks'
      },
      kanban: {
        todo: 'TO DO',
        progress: 'IN PROGRESS',
        done: 'DONE'
      }
    },
    stats: {
      trustedBy: 'Trusted by teams at',
      data: [
        { value: '12', label: 'Integrated modules' },
        { value: '4',  label: 'User roles' },
        { value: '30', label: 'Seconds of AI analysis', suffix: 's' },
        { value: '1',  label: 'Deployment command' },
      ]
    },
    features: {
      eyebrow: 'Features',
      title: 'Everything your\nteam needs',
      desc: 'From AI analysis to Kanban board, every tool is built for Agile development teams.',
      more: 'Learn more',
      list: [
        {
          tag: "AI Assistant",
          title: "Automatic Specs Analysis",
          desc: "Paste your specifications. Gemini extracts tasks, estimated durations, complexity and risks in less than 30 seconds.",
          stat: "< 30s",
          statLabel: "analysis",
          items: ["Automatic task extraction", "Days/complexity estimation", "Project risk detection", "Manual fallback if API unavailable"]
        },
        {
          tag: "Kanban Board",
          title: "Real-time Sprint Visualization",
          desc: "Simple and effective Kanban board - To Do, In Progress, Done. Move your tickets by one column in one click.",
          stat: "3",
          statLabel: "columns",
          items: ["Active sprint display", "Instant status change", "Filters by assignee and type", "Visual priorities"]
        },
        {
          tag: "Team & Resources",
          title: "Automatic Task Distribution",
          desc: "After AI validation, select your members. The platform fairly distributes tasks based on estimated load.",
          stat: "Infinite",
          statLabel: "members",
          items: ["Balanced distribution", "Free selection or entry", "Member load view", "Manual reassignment"]
        },
        {
          tag: "Risks & Costs",
          title: "Budget Tracking & Risk Register",
          desc: "Automatically calculated criticality (probability x impact), sorted register, planned vs. actual budget with visible variance.",
          stat: "0",
          statLabel: "surprises",
          items: ["Criticality = probability x impact", "Register sorted by criticality", "Planned / actual / variance budget", "Mitigation plans"]
        }
      ]
    },
    workflow: {
      eyebrow: 'AI Workflow',
      title: 'From specs to sprint\nin 4 steps',
      steps: [
        { step: '01', icon: '📄', title: 'Upload specs',    desc: 'Paste or type your project specifications into the integrated AI form.' },
        { step: '02', icon: '✦',  title: 'Gemini analyzes', desc: 'AI automatically generates tasks, time estimates, complexity and risks.', highlight: true },
        { step: '03', icon: '✓',  title: 'Confirm',         desc: 'Validate or adjust the estimate before defining your team and starting.' },
        { step: '04', icon: '⊞',  title: 'Manage',          desc: 'Kanban, sprints, costs, deliverables and risks — all centralized in one place.' },
      ],
    },
    aiProcess: {
      badge: 'AI-Powered Automation',
      eyebrow: 'Module M3 - Gemini API',
      title: 'Intelligent <span class="highlight">analysis</span>\nof your specs',
      desc: 'Upload your specs, Gemini analyzes and automatically generates tasks, estimates, complexity and risks in less than 30 seconds.',
      steps: [
        { num: '1', title: 'Specs Upload', desc: 'The client types or pastes their project specifications into the integrated form.' },
        { num: '2', title: 'Gemini Analysis', desc: 'Gemini API analyzes the specs with a structured prompt and returns structured JSON.' },
        { num: '3', title: 'Confirmation', desc: 'The client validates or rejects the estimate. If rejected, manual entry is possible.' },
        { num: '4', title: 'Distribution', desc: 'Tasks are automatically distributed among team members.' }
      ],
      jsonTitle: 'response.json - Gemini Response Format',
      jsonTasks: ["JWT Authentication", "Project Management", "Kanban Board", "Gemini Integration"],
      jsonComplexity: "Medium",
      jsonRisks: ["Gemini API Dependency", "Tight Deadlines"],
    },
    modulesShowcase: {
      eyebrow: '12 Modules',
      title: 'Complete functional architecture',
      filters: {
        all: 'All',
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      },
      list: [
        { id: "M1", name: "Authentication", priority: "High", sprint: "S1", desc: "JWT, BCrypt, session management, and RBAC access control." },
        { id: "M2", name: "Project Management", priority: "High", sprint: "S1", desc: "Full CRUD with statuses (Active, Paused, Done), dates, and budget." },
        { id: "M3", name: "AI Assistant", priority: "High", sprint: "S2", desc: "Specs analysis via Gemini API - tasks, durations, complexity, and risk extraction.", highlight: true },
        { id: "M4", name: "Team Management", priority: "High", sprint: "S2", desc: "Member selection, automatic task distribution based on estimated load." },
        { id: "M5", name: "Backlog / Tickets", priority: "High", sprint: "S2", desc: "User Stories, Tasks, Bugs with priority, story points, and assignment." },
        { id: "M6", name: "Kanban Board", priority: "High", sprint: "S2", desc: "3 columns (To Do, In Progress, Done) with one-click status change." },
        { id: "M7", name: "Sprints & Planning", priority: "Medium", sprint: "S3", desc: "Sprint creation with dates, goals, and ticket assignment." },
        { id: "M8", name: "Resources", priority: "Medium", sprint: "S3", desc: "Member allocation per project, load and availability tracking." },
        { id: "M9", name: "Cost Tracking", priority: "Medium", sprint: "S3", desc: "Planned vs. actual budget, automatic variance calculation." },
        { id: "M10", name: "Deliverables", priority: "Medium", sprint: "S3", desc: "Deliverable management with statuses (Pending, Delivered, Overdue) and files." },
        { id: "M11", name: "Risk Register", priority: "Medium", sprint: "S4", desc: "Criticality = probability x impact, mitigation plans, and auto-sorting." },
        { id: "M12", name: "Administration", priority: "Low", sprint: "S4", desc: "User CRUD, global role management, and platform settings." }
      ]
    },
    roles: {
      eyebrow: '4 User Roles',
      title: 'Access adapted to each profile',
      desc: 'Each role has specific permissions for optimal and secure collaboration.',
      list: [
        { role: "Client", responsibilities: ["Uploads specifications", "Consults AI estimate", "Confirms or rejects analysis", "Selects team members", "Tracks project progress"] },
        { role: "Manager", responsibilities: ["Creates and supervises projects", "Manages backlog and tickets", "Adjusts task distribution", "Tracks costs and risks", "Creates sprints and planning"] },
        { role: "Developer", responsibilities: ["Consults assigned tasks", "Updates ticket statuses", "Comments on tickets", "Manages Kanban workflow", "Visualizes their workload"] },
        { role: "Admin", responsibilities: ["Manages all users", "Assigns global roles", "Configures the platform", "Accesses all features", "Supervises security"] }
      ]
    },
    techStack: {
      eyebrow: 'Tech Stack',
      title: 'Modern and robust architecture',
      desc: 'A proven stack combining performance, security, and maintainability for high-quality projects.',
      technologies: [
        { name: "Next.js 14", category: "Frontend", desc: "React framework with App Router, SSR, and automatic optimizations." },
        { name: "Spring Boot", category: "Backend", desc: "Java REST API with validation, security, and layered architecture." },
        { name: "PostgreSQL", category: "Database", desc: "Relational DB with Flyway/Liquibase migrations and optimized queries." },
        { name: "Gemini AI", category: "Intelligence", desc: "Google API for specs analysis, task extraction, and auto estimation." },
        { name: "Docker", category: "DevOps", desc: "Full containerization with Docker Compose - one command to deploy everything." },
        { name: "JWT + BCrypt", category: "Security", desc: "Stateless authentication with signed tokens and hashed passwords." }
      ],
      specs: [
        { label: "API Performance", value: "< 500ms", desc: "Response time excluding AI" },
        { label: "AI Timeout", value: "30s", desc: "With manual fallback" },
        { label: "Pagination", value: "20/page", desc: "Projects and tickets" },
        { label: "Tests", value: "JUnit 5", desc: "High priority modules coverage" }
      ],
      terminal: {
        title: 'terminal - deployment',
        clone: '# Clone the repository',
        start: '# Start all services',
        success: 'All services started successfully on localhost:3000'
      }
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What our users say',
      list: [
        { quote: "ProjAI transformed how we manage sprints. Automatic specs analysis saves us hours every week.", author: "Sarah M.", role: "Project Manager", company: "Tech Solutions", avatar: "SM" },
        { quote: "The automatic task distribution by AI is incredibly accurate. Our team is better balanced than ever.", author: "Mohamed K.", role: "Scrum Master", company: "DevStudio", avatar: "MK" },
        { quote: "Intuitive interface, Docker deployment in one command, and Gemini integration is a real game-changer for our estimates.", author: "Amina B.", role: "Lead Developer", company: "Innovate Labs", avatar: "AB" }
      ]
    },
    terminal: {
      eyebrow: 'Dev-ready',
      title: 'Deploy with\none command',
      desc: 'Next.js + Spring Boot + PostgreSQL architecture, containerized with Docker Compose. One command, everything starts.',
    },
    cta: {
      label: 'EMSI · 2025–2026',
      title1: 'Ready to transform',
      title2: 'your',
      title3: 'project management',
      desc: 'Join the EMSI team and discover how artificial intelligence can revolutionize your Agile sprints.',
      btn1: 'Create my first project →',
      btn2: 'View documentation',
    },
    footer: {
      tagline: 'Intelligent project management platform with AI assistance. Developed at EMSI under the supervision of Mr Driss Essabar.',
      modules: 'Modules',
      suite: 'More',
    },
    auth: {
      backHome: 'Home',
      loginEyebrow: 'Sign In', registerEyebrow: 'Create Account',
      loginTitle: 'Welcome back 👋', registerTitle: 'Create an account',
      noAccount: "Don't have an account?", signUpLink: 'Sign up for free',
      alreadyAccount: 'Already have an account?', signInLink: 'Sign in',
      emailLabel: 'Email address', emailPlaceholder: 'you@emsi.ma',
      passwordLabel: 'Password', passwordPlaceholder: '••••••••',
      confirmPassword: 'Confirm', fullName: 'Full name',
      fullNamePlaceholder: 'Yassine Abderrazik', selectRole: 'Your role',
      signIn: 'Sign in', signingIn: 'Signing in...',
      createAccount: 'Create account', creating: 'Creating...',
      show: 'Show', hide: 'Hide', rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      orContinueWith: 'or continue with', continueWithGoogle: 'Continue with Google',
      agreeToTerms: 'I agree to the', termsLink: 'terms of service',
      andThe: 'and the', privacyLink: 'privacy policy',
      strengthWeak: 'Weak', strengthFair: 'Fair', strengthGood: 'Good', strengthStrong: 'Strong',
      panelDesc: 'The intelligent Agile platform that transforms your project specs into organized sprints in seconds.',
      panel1: 'CDC analysis by Gemini AI in < 30s',
      panel2: 'Kanban board & integrated sprints',
      panel3: 'Automatic task distribution',
      panel4: 'Risk register & cost tracking',
      builtBy: 'Built by the EMSI team',
    },
    workflowPage: {
      badge: 'Intelligent Process',
      badgeIA: 'Gemini AI',
      stepLabel: 'Step',
      heroTitle: 'How AI transforms your specs into an operational backlog',
      heroSubtitle: 'From raw text to a structured project in less than 30 seconds',
      btnAnalyse: 'Try Analysis →',
      btnDemo: 'Watch Demo',
      timelineTitle: 'Your Project Journey',
      steps: [
        { num: '01', title: 'Specs Upload', desc: 'Input your Specifications. Minimum 100 characters for optimal analysis. Supports raw text with immediate preview.' },
        { num: '02', title: 'Gemini AI Analysis', desc: 'Processed by gemini-1.5-flash API. Uses a structured prompt to extract tasks, durations, and risks in less than 30 seconds.' },
        { num: '03', title: 'Client Validation', desc: 'Detailed display of the estimate: tasks, durations, complexity, and risks. You confirm or reject to adjust parameters.' },
        { num: '04', title: 'Automatic Distribution', desc: 'Selection of team members and fair distribution based on workload. Manual adjustment possible by the manager.' },
      ],
      flowTitle: 'Flow Architecture',
      flowSubtitle: 'An automated end-to-end value chain',
      flowNodes: {
        cdc: 'Specs',
        form: 'Form',
        gemini: 'Gemini AI',
        analysis: 'AI Analysis',
        json: 'JSON',
        tasks: 'Tasks/Durations',
        validation: 'Validation',
        confirm: 'Client confirms',
        backlog: 'Backlog',
        tickets: 'Tickets created',
      },
      jsonLabels: {
        complexity: 'Medium',
        risk1: 'API Latency',
        risk2: 'Data Consistency'
      },
      advTitle: 'AI Approach Advantages',
      advantages: [
        { icon: '⚡', title: 'Time Saving', desc: 'Go from days of planning to just seconds.' },
        { icon: '🎯', title: 'Precision', desc: 'AI identifies dependencies often overlooked by humans.' },
        { icon: '🔍', title: 'Anticipation', desc: 'Proactive detection of technical and functional risks.' },
        { icon: '🔄', title: 'Flexibility', desc: 'Re-analyze your project instantly after each modification.' },
        { icon: '📐', title: 'Standardization', desc: 'Consistent backlog format for all your projects.' },
        { icon: '📈', title: 'Scalability', desc: 'Manage dozens of projects simultaneously without overload.' }
      ],
      faqTitle: 'Frequently Asked Questions',
      faq: [
        { q: 'What if Gemini API is unavailable?', a: 'A degraded mode allows manual task entry while waiting for service restoration.' },
        { q: 'Can I modify the estimate?', a: 'Yes, after AI analysis, you have control to adjust each duration and task title.' },
        { q: 'Does the AI learn?', a: 'Our models are fine-tuned for ProJAI but do not keep your private data for global training.' },
        { q: 'Specs size limit?', a: 'We accept up to 50,000 characters for an exhaustive analysis.' },
        { q: 'Is data stored?', a: 'Only validated versions are stored in the database for your project tracking.' }
      ]
    },
    modulesPage: {
      badge: 'Complete Features',
      badgeCount: '12 modules',
      heroTitle: 'All modules for successful Agile project management',
      filters: {
        all: 'All',
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      },
      stats: {
        total: 'Total Modules',
        high: 'High Priority',
        medium: 'Medium Priority',
        low: 'Low Priority'
      },
      modules: [
        { id: "M1", sprint: "S1", priority: "High", icon: "🔐", title: "Auth & Roles", desc: "Secure access management and user permissions.", features: ["JWT 24h", "BCrypt 10 rounds", "RBAC", "4 roles", "Admin interface"] },
        { id: "M2", sprint: "S1", priority: "High", icon: "📁", title: "Project Management", desc: "Centralization of all your projects with real-time status tracking.", features: ["Full CRUD", "Dynamic Status", "Advanced Filters", "Backend validation"] },
        { id: "M3", sprint: "S2", priority: "High", icon: "🤖", title: "AI Assistant (Gemini)", desc: "Artificial intelligence for automatic backlog generation.", features: ["Gemini 1.5 API", "JSON Generation", "Time estimation", "Estimate versioning"] },
        { id: "M4", sprint: "S2", priority: "High", icon: "👥", title: "Team Management", desc: "Optimization of collaboration and task distribution.", features: ["Add members", "Project roles", "Auto distribution", "Manual adjustment"] },
        { id: "M5", sprint: "S2", priority: "High", icon: "📋", title: "Backlog & Tickets", desc: "Granular organization of functional and technical needs.", features: ["Diverse types", "Prioritization", "Assignment", "Effort points"] },
        { id: "M6", sprint: "S2", priority: "High", icon: "📊", title: "Kanban Board", desc: "Fluid visualization of the development workflow.", features: ["Drag & Drop", "Visual filters", "Real-time status", "Priority indicators"] },
        { id: "M7", sprint: "S3", priority: "Medium", icon: "🗓️", title: "Sprints & Planning", desc: "Iterative planning for strict deadline compliance.", features: ["Sprint creation", "Ticket assignment", "Sprint board", "Progress tracking"] },
        { id: "M8", sprint: "S3", priority: "Medium", icon: "⚖️", title: "Resources & Allocation", desc: "Balancing workload among members.", features: ["Member load", "In Progress counter", "Specific roles", "Flow optimization"] },
        { id: "M9", sprint: "S3", priority: "Medium", icon: "💰", title: "Cost Tracking", desc: "Precise budget control for each project phase.", features: ["Planned/Actual budget", "Auto variance", "Progress charts", "Overrun alerts"] },
        { id: "M10", sprint: "S3", priority: "Medium", icon: "📦", title: "Deliverables", desc: "Management of outputs and validation of critical milestones.", features: ["File management", "Status tracking", "Deadlines", "Version history"] },
        { id: "M11", sprint: "S4", priority: "Medium", icon: "⚠️", title: "Risk Register", desc: "Proactive identification and mitigation of project threats.", features: ["Criticality calculation", "Mitigation plan", "Color codes", "Dynamic tracking"] },
        { id: "M12", sprint: "S4", priority: "Low", icon: "⚙️", title: "Administration", desc: "Global configuration tools for super-users.", features: ["Audit logs", "System settings", "Global role editing", "DB maintenance"] },
      ],
      tableTitle: 'Deployment Timeline',
      tableHeaders: {
        sprint: 'Sprint',
        period: 'Period',
        modules: 'Modules',
        desc: 'Description'
      },
      tableRows: [
        { s: "S1", p: "Week 1–2", m: "M1, M2", d: "Initial setup, Authentication and basic project management." },
        { s: "S2", p: "Week 3–4", m: "M3, M4, M5, M6", d: "Smart core: Gemini AI, Team, Backlog and Kanban." },
        { s: "S3", p: "Week 5–6", m: "M7, M8, M9, M10", d: "Operational management: Sprints, Resources, Costs and Deliverables." },
        { s: "S4", p: "Week 7–8", m: "M11, M12", d: "Finalization: Risk register, Administration and Testing." }
      ]
    },
    docsPage: {
      badge: 'Complete Documentation',
      badgeVersion: 'v1.0',
      heroTitle: 'Everything you need to know about ProJAI',
      heroSubtitle: 'API, deployment, user guides — start in minutes',
      searchPlaceholder: 'Search documentation...',
      navCards: [
        { icon: "🚀", title: "Quick Start", sub: "Install and launch in 5 min", color: "#F0FDF4" },
        { icon: "⚙️", title: "Technical Guide", sub: "Spring Boot & Next.js architecture", color: "#EFF6FF" },
        { icon: "📘", title: "User Guide", sub: "How to use AI and Kanban", color: "#F5F3FF" },
        { icon: "🔌", title: "API Reference", sub: "Swagger docs & endpoints", color: "#FEF2F2" },
        { icon: "🐳", title: "Deployment", sub: "Docker, CI/CD and production", color: "#FFFBEB" },
        { icon: "❓", title: "FAQ", sub: "Common questions and answers", color: "#F9FAFB" }
      ],
      quickStartTitle: 'Ready to code?',
      quickStartComments: {
        clone: '# 1. Clone the repository',
        env: '# 2. Environment variables',
        docker: '# 3. Launch with Docker'
      },
      prereqs: [
        { icon: "🟢", label: "Node.js 18+" },
        { icon: "☕", label: "Java + Maven 17+" },
        { icon: "🐳", label: "Docker Compose (optional)" },
        { icon: "🤖", label: "Gemini API Key (required)" }
      ],
      stackTitle: 'Tech Stack',
      stackHeaders: {
        layer: 'Layer',
        tech: 'Technology',
        version: 'Version'
      },
      stackRows: [
        { l: "Frontend", t: "Next.js", v: "14.x", c: "#F5F3FF", tc: "#8B5CF6" },
        { l: "Backend", t: "Spring Boot", v: "3.x", c: "#FEF2F2", tc: "#EF4444" },
        { l: "Database", t: "PostgreSQL", v: "15", c: "#FFF7ED", tc: "#F97316" },
        { l: "AI", t: "Google Gemini", v: "1.5 Flash", c: "#F0FDF4", tc: "#16A34A" },
        { l: "Infra", t: "Docker", v: "Compose", c: "#EFF6FF", tc: "#3B82F6" }
      ],
      kpi: [
        { label: "API Performance", val: "<500ms" },
        { label: "AI Timeout", val: "30s" },
        { label: "Pagination", val: "20/page" },
        { label: "Tests Coverage", val: "80%+" }
      ],
      apiTitle: 'API Reference',
      apiGroups: [
        { 
          group: "Authentication", 
          endpoints: [
            { m: "POST", p: "/api/auth/register", d: "Create account", c: "#16A34A" },
            { m: "POST", p: "/api/auth/login", d: "Login (JWT)", c: "#16A34A" },
            { m: "GET", p: "/api/auth/me", d: "User profile", c: "#3B82F6" }
          ]
        },
        { 
          group: "Projects", 
          endpoints: [
            { m: "GET", p: "/api/projets", d: "List (paginated 20/page)", c: "#3B82F6" },
            { m: "POST", p: "/api/projets", d: "Create project", c: "#16A34A" },
            { m: "PUT", p: "/api/projets/{id}", d: "Edit", c: "#F59E0B" },
            { m: "DELETE", p: "/api/projets/{id}", d: "Delete", c: "#EF4444" }
          ]
        }
      ],
      envTitle: 'Environment Variables',
      envBackend: '.env Backend',
      envFrontend: '.env.local Frontend',
      envPlaceholders: {
        gemini: 'your_api_key',
        jwt: 'your_secret_32chars',
        github: 'your-org'
      },
      rbacTitle: 'Rights & Roles (RBAC)',
      rbacHeaders: ['Feature', 'Admin', 'Manager', 'Dev', 'Client'],
      rbacRows: [
        ["User management", "✓", "✓", "—", "—"],
        ["Analyze CDC (AI)", "✓", "✓", "—", "✓"],
        ["Manage backlog", "✓", "✓", "✓", "—"],
        ["View Kanban board", "✓", "✓", "✓", "✓"]
      ],
      dodTitle: 'Definition of Done',
      dodItems: ["Compliant with acceptance criteria", "Unit tests for High modules", "Swagger docs updated", "Code review completed"],
      coverageTitle: 'Test Coverage',
      coverageBars: [
        { m: "M1 Authentication", p: 80 },
        { m: "M3 Gemini AI", p: 70 },
        { m: "M5 Backlog", p: 80 }
      ],
      faqSupportTitle: 'FAQ & Support',
      faq: [
        { q: "How to get a Gemini API key?", a: "Go to makersuite.google.com/app/apikey. The free plan offers 60 req/min." },
        { q: "Can I use without Docker?", a: "Yes, configure PostgreSQL manually and use mvn spring-boot:run + npm run dev." },
        { q: "Is data encrypted?", a: "Yes, BCrypt 10 rounds for passwords and HMAC-SHA256 for JWT tokens." }
      ],
      supportCards: {
        email: { title: 'Email', sub: 'support@projai.com' },
        chat: { title: 'Direct Chat', sub: 'Available 9am–6pm' },
        github: { title: 'GitHub', sub: 'your-org/projai' }
      }
    }
  },
};
