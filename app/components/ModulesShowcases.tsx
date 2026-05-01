"use client";
import { useState } from 'react';

const modules = [
  {
    id: "M1",
    name: "Authentification",
    priority: "Haute",
    sprint: "S1",
    desc: "JWT, BCrypt, gestion des sessions et controle d'acces par role (RBAC).",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    id: "M2",
    name: "Gestion Projets",
    priority: "Haute",
    sprint: "S1",
    desc: "CRUD complet avec statuts (Actif, En pause, Termine), dates et budget.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: "M3",
    name: "Assistant IA",
    priority: "Haute",
    sprint: "S2",
    desc: "Analyse CDC via Gemini API - extraction taches, durees, complexite et risques.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    highlight: true,
  },
  {
    id: "M4",
    name: "Gestion Equipe",
    priority: "Haute",
    sprint: "S2",
    desc: "Selection membres, distribution automatique des taches selon charge estimee.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: "M5",
    name: "Backlog / Tickets",
    priority: "Haute",
    sprint: "S2",
    desc: "User Stories, Tasks, Bugs avec priorite, story points et assignation.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
    ),
  },
  {
    id: "M6",
    name: "Board Kanban",
    priority: "Haute",
    sprint: "S2",
    desc: "3 colonnes (To Do, In Progress, Done) avec changement de statut en un clic.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    id: "M7",
    name: "Sprints & Planning",
    priority: "Moyenne",
    sprint: "S3",
    desc: "Creation de sprints avec dates, objectifs et affectation de tickets.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
  },
  {
    id: "M8",
    name: "Ressources",
    priority: "Moyenne",
    sprint: "S3",
    desc: "Allocation membres par projet, suivi de la charge et des disponibilites.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="19" y1="8" x2="19" y2="14"/>
        <line x1="22" y1="11" x2="16" y2="11"/>
      </svg>
    ),
  },
  {
    id: "M9",
    name: "Suivi des Couts",
    priority: "Moyenne",
    sprint: "S3",
    desc: "Budget prevu vs reel, calcul automatique de l'ecart (economie/depassement).",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    id: "M10",
    name: "Livrables",
    priority: "Moyenne",
    sprint: "S3",
    desc: "Gestion des livrables avec statuts (En attente, Livre, En retard) et fichiers.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7,10 12,15 17,10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
  {
    id: "M11",
    name: "Registre Risques",
    priority: "Moyenne",
    sprint: "S4",
    desc: "Criticite = probabilite x impact, plans de mitigation et tri automatique.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    id: "M12",
    name: "Administration",
    priority: "Basse",
    sprint: "S4",
    desc: "CRUD utilisateurs, gestion des roles globaux et parametres plateforme.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

export default function ModulesShowcase() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const filteredModules = activeFilter 
    ? modules.filter(m => m.priority === activeFilter)
    : modules;

  return (
    <>
      <style>{`
        .modules-section {
          padding: 140px 24px;
          background: var(--background);
          position: relative;
        }
        
        .modules-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .modules-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 60px;
          gap: 40px;
          flex-wrap: wrap;
        }
        
        .modules-title-wrap {
          flex: 1;
          min-width: 300px;
        }
        
        .modules-eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 16px;
        }
        
        .modules-title {
          font-family: var(--font-sans);
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 700;
          letter-spacing: -2px;
          line-height: 1.1;
          color: var(--foreground);
        }
        
        .filter-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .filter-tab {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          padding: 10px 20px;
          font-size: 13px;
          font-weight: 600;
          color: var(--muted-foreground);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .filter-tab:hover {
          border-color: var(--gray-300);
          color: var(--foreground);
        }
        
        .filter-tab.active {
          background: var(--foreground);
          border-color: var(--foreground);
          color: var(--white);
        }
        
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        
        .module-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 28px;
          position: relative;
          transition: all 0.3s ease;
          cursor: default;
        }
        
        .module-card:hover {
          border-color: var(--gray-200);
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }
        
        .module-card.ai-highlight {
          background: linear-gradient(135deg, var(--green-pale) 0%, var(--white) 100%);
          border-color: var(--green-muted);
        }
        
        .module-card.ai-highlight:hover {
          border-color: var(--green);
          box-shadow: 0 12px 40px rgba(34,197,94,0.15);
        }
        
        .module-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        
        .module-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-lg);
          background: var(--muted);
          color: var(--foreground);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .module-card.ai-highlight .module-icon {
          background: var(--green);
          color: var(--white);
        }
        
        .module-card:hover .module-icon {
          transform: scale(1.05);
        }
        
        .module-badges {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }
        
        .module-id {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--gray-400);
        }
        
        .module-priority {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.5px;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }
        
        .priority-haute {
          background: rgba(239,68,68,0.1);
          color: #EF4444;
        }
        
        .priority-moyenne {
          background: rgba(245,158,11,0.1);
          color: #F59E0B;
        }
        
        .priority-basse {
          background: rgba(107,114,128,0.1);
          color: #6B7280;
        }
        
        .module-name {
          font-family: var(--font-sans);
          font-size: 17px;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }
        
        .module-desc {
          font-size: 13px;
          color: var(--muted-foreground);
          line-height: 1.6;
          margin-bottom: 16px;
        }
        
        .module-sprint {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--green);
          background: var(--green-pale);
          border: 1px solid var(--green-muted);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          display: inline-block;
        }
        
        @media (max-width: 1100px) {
          .modules-grid { grid-template-columns: repeat(3, 1fr); }
        }
        
        @media (max-width: 800px) {
          .modules-grid { grid-template-columns: repeat(2, 1fr); }
          .modules-header { flex-direction: column; align-items: flex-start; }
        }
        
        @media (max-width: 500px) {
          .modules-section { padding: 100px 20px; }
          .modules-grid { grid-template-columns: 1fr; }
          .module-card { padding: 24px; }
        }
      `}</style>

      <section className="modules-section" id="modules">
        <div className="modules-inner">
          <div className="modules-header">
            <div className="modules-title-wrap">
              <div className="modules-eyebrow">12 Modules</div>
              <h2 className="modules-title text-balance">Architecture fonctionnelle complete</h2>
            </div>
            
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${activeFilter === null ? 'active' : ''}`}
                onClick={() => setActiveFilter(null)}
              >
                Tous (12)
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'Haute' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Haute')}
              >
                Haute (6)
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'Moyenne' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Moyenne')}
              >
                Moyenne (5)
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'Basse' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Basse')}
              >
                Basse (1)
              </button>
            </div>
          </div>

          <div className="modules-grid">
            {filteredModules.map((m) => (
              <div 
                key={m.id} 
                className={`module-card ${m.highlight ? 'ai-highlight' : ''}`}
              >
                <div className="module-header">
                  <div className="module-icon">
                    {m.icon}
                  </div>
                  <div className="module-badges">
                    <span className="module-id">{m.id}</span>
                    <span className={`module-priority priority-${m.priority.toLowerCase()}`}>
                      {m.priority}
                    </span>
                  </div>
                </div>
                
                <h3 className="module-name">{m.name}</h3>
                <p className="module-desc">{m.desc}</p>
                <span className="module-sprint">Sprint {m.sprint}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
