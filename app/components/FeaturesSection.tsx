"use client";
import { useLanguage } from '../i18n/LanguageContext';

const features = [
  {
    number: "01",
    tag: "Assistant IA",
    title: "Analyse automatique du CDC",
    desc: "Collez votre cahier des charges. Gemini extrait taches, durees estimees, complexite et risques en moins de 30 secondes.",
    stat: "< 30s",
    statLabel: "d'analyse",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    highlight: true,
    items: ["Extraction automatique des taches", "Estimation jours/complexite", "Detection des risques projet", "Fallback manuel si API indisponible"],
  },
  {
    number: "02",
    tag: "Board Kanban",
    title: "Visualisation sprint en temps reel",
    desc: "Board Kanban simple et efficace - To Do, In Progress, Done. Avancez vos tickets d'une colonne en un clic.",
    stat: "3",
    statLabel: "colonnes",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    items: ["Affichage par sprint actif", "Changement de statut instantane", "Filtres par assigne et type", "Priorites visuelles"],
  },
  {
    number: "03",
    tag: "Equipe & Ressources",
    title: "Distribution automatique des taches",
    desc: "Apres validation IA, selectionnez vos membres. La plateforme repartit equitablement les taches selon la charge estimee.",
    stat: "Infini",
    statLabel: "membres",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    items: ["Repartition equilibree", "Selection ou saisie libre", "Vue charge par developpeur", "Reassignation manuelle"],
  },
  {
    number: "04",
    tag: "Risques & Couts",
    title: "Suivi budgetaire et registre des risques",
    desc: "Criticite calculee automatiquement (probabilite x impact), registre trie, budget prevu vs reel avec ecart visible.",
    stat: "0",
    statLabel: "surprises",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    items: ["Criticite = probabilite x impact", "Registre trie par criticite", "Budget prevu / reel / ecart", "Plans de mitigation"],
  },
];

export default function FeaturesSection() {
  const { t } = useLanguage();
  return (
    <>
      <style>{`
        .features-section {
          padding: 120px 24px;
          background: var(--background);
        }
        
        .features-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 80px;
          gap: 40px;
        }
        
        .section-eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 16px;
        }
        
        .section-title {
          font-family: var(--font-sans);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          letter-spacing: -2px;
          line-height: 1.1;
          color: var(--foreground);
        }
        
        .section-desc {
          font-size: 16px;
          color: var(--muted-foreground);
          max-width: 360px;
          line-height: 1.7;
          text-align: right;
        }
        
        /* Bento Grid */
        .features-bento {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .feature-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 40px;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .feature-card:hover {
          border-color: var(--gray-300);
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }
        
        .feature-card.highlighted {
          background: var(--foreground);
          border-color: var(--foreground);
          grid-row: span 1;
        }
        
        .feature-card.highlighted:hover {
          border-color: var(--gray-700);
          box-shadow: var(--shadow-2xl);
        }
        
        .feature-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }
        
        .feature-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--muted);
          color: var(--foreground);
        }
        
        .feature-card.highlighted .feature-icon-wrap {
          background: var(--primary);
          color: var(--white);
        }
        
        .feature-number {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          color: var(--gray-400);
        }
        
        .feature-card.highlighted .feature-number {
          color: var(--gray-500);
        }
        
        .feature-tag {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          border-radius: var(--radius-full);
          padding: 6px 14px;
          margin-bottom: 16px;
          background: var(--muted);
          color: var(--muted-foreground);
        }
        
        .feature-card.highlighted .feature-tag {
          background: rgba(22,163,74,0.2);
          color: var(--green-light);
        }
        
        .feature-title {
          font-family: var(--font-sans);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--foreground);
          margin-bottom: 12px;
          line-height: 1.2;
        }
        
        .feature-card.highlighted .feature-title {
          color: var(--white);
        }
        
        .feature-desc {
          font-size: 15px;
          color: var(--muted-foreground);
          line-height: 1.7;
          margin-bottom: 28px;
        }
        
        .feature-card.highlighted .feature-desc {
          color: var(--gray-400);
        }
        
        .feature-items {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 32px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: var(--gray-600);
        }
        
        .feature-card.highlighted .feature-item {
          color: var(--gray-400);
        }
        
        .feature-item-check {
          width: 20px;
          height: 20px;
          border-radius: var(--radius-full);
          background: var(--primary-pale);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .feature-card.highlighted .feature-item-check {
          background: rgba(22,163,74,0.2);
          color: var(--green-light);
        }
        
        .feature-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--border-light);
        }
        
        .feature-card.highlighted .feature-footer {
          border-top-color: rgba(255,255,255,0.08);
        }
        
        .feature-stat {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        
        .feature-stat-val {
          font-family: var(--font-sans);
          font-size: 36px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -1px;
          color: var(--primary);
        }
        
        .feature-card.highlighted .feature-stat-val {
          color: var(--green-light);
        }
        
        .feature-stat-lbl {
          font-size: 14px;
          color: var(--muted-foreground);
        }
        
        .feature-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--foreground);
          text-decoration: none;
          transition: gap 0.2s ease;
        }
        
        .feature-card.highlighted .feature-link {
          color: var(--white);
        }
        
        .feature-link:hover {
          gap: 10px;
        }
        
        @media (max-width: 900px) {
          .features-bento { grid-template-columns: 1fr; }
          .section-header { flex-direction: column; align-items: flex-start; }
          .section-desc { text-align: left; }
        }
        
        @media (max-width: 600px) {
          .features-section { padding: 80px 20px; }
          .feature-card { padding: 28px; }
        }
      `}</style>

      <section className="features-section" id="fonctionnalites">
        <div className="features-inner">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">{t.features.eyebrow}</div>
              <h2 className="section-title text-balance">
                {t.features.title.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </h2>
            </div>
            <p className="section-desc">
              {t.features.desc}
            </p>
          </div>

          <div className="features-bento">
            {features.map((f) => (
              <div key={f.number} className={`feature-card ${f.highlight ? "highlighted" : ""}`}>
                <div className="feature-header">
                  <div className="feature-icon-wrap">
                    {f.icon}
                  </div>
                  <div className="feature-number">{f.number}</div>
                </div>
                
                <div className="feature-tag">{f.tag}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                
                <ul className="feature-items">
                  {f.items.map(item => (
                    <li key={item} className="feature-item">
                      <div className="feature-item-check">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 6l3 3 5-6"/>
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="feature-footer">
                  <div className="feature-stat">
                    <div className="feature-stat-val">{f.stat}</div>
                    <div className="feature-stat-lbl">{f.statLabel}</div>
                  </div>
                  <a href="#" className="feature-link">
                    En savoir plus 
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M9 4l4 4-4 4"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
