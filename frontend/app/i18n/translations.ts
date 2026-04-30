export type Locale = 'fr' | 'en';

export const translations = {
  fr: {
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
    },
    stats: [
      { value: '12', label: 'Modules intégrés' },
      { value: '4',  label: 'Rôles utilisateurs' },
      { value: '30', label: "Secondes d'analyse IA", suffix: 's' },
      { value: '1',  label: 'Commande de déploiement' },
    ],
    features: {
      eyebrow: 'Fonctionnalités',
      title: 'Tout ce dont votre\néquipe a besoin',
      desc: "De l'analyse IA au board Kanban, chaque outil est pensé pour les équipes Agile.",
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
  },

  en: {
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
      cta2: 'Watch demo ▶',
    },
    stats: [
      { value: '12', label: 'Integrated modules' },
      { value: '4',  label: 'User roles' },
      { value: '30', label: 'Seconds of AI analysis', suffix: 's' },
      { value: '1',  label: 'Deployment command' },
    ],
    features: {
      eyebrow: 'Features',
      title: 'Everything your\nteam needs',
      desc: 'From AI analysis to Kanban board, every tool is built for Agile development teams.',
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
  },
};
