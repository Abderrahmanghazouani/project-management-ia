"use client";
import { useLanguage } from '../i18n/LanguageContext';

const features = [
  {
    number: "01",
    tag: "Assistant IA",
    title: "Analyse automatique du CDC",
    desc: "Collez votre cahier des charges. Gemini extrait tâches, durées estimées, complexité et risques en moins de 30 secondes. Confirmez ou ajustez avant de démarrer.",
    stat: "< 30s",
    statLabel: "d'analyse",
    accent: "var(--green)",
    accentBg: "var(--green-pale)",
    highlight: true,
    items: ["Extraction automatique des tâches", "Estimation jours/complexité", "Détection des risques projet", "Fallback manuel si API indisponible"],
  },
  {
    number: "02",
    tag: "Board Kanban",
    title: "Visualisation sprint en temps réel",
    desc: "Board Kanban simple et efficace — To Do, In Progress, Done. Avancez vos tickets d'une colonne en un clic, sans drag-and-drop complexe.",
    stat: "3",
    statLabel: "colonnes",
    accent: "var(--black)",
    accentBg: "var(--gray-100)",
    items: ["Affichage par sprint actif", "Changement de statut instantané", "Filtres par assigné et type", "Priorités visuelles"],
  },
  {
    number: "03",
    tag: "Équipe & Ressources",
    title: "Distribution automatique des tâches",
    desc: "Après validation IA, sélectionnez vos membres. La plateforme répartit équitablement les tâches selon la charge estimée. Le manager ajuste avant validation.",
    stat: "∞",
    statLabel: "membres",
    accent: "var(--black)",
    accentBg: "var(--gray-100)",
    items: ["Répartition ⌈tâches/membres⌉", "Sélection ou saisie libre", "Vue charge par développeur", "Réassignation manuelle"],
  },
  {
    number: "04",
    tag: "Risques & Coûts",
    title: "Suivi budgétaire et registre des risques",
    desc: "Criticité calculée automatiquement (probabilité × impact), registre trié, budget prévu vs réel avec écart visible. Aucune surprise en fin de sprint.",
    stat: "0",
    statLabel: "surprises",
    accent: "var(--black)",
    accentBg: "var(--gray-100)",
    items: ["Criticité = probabilité × impact", "Registre trié par criticité", "Budget prévu / réel / écart", "Plans de mitigation"],
  },
];

export default function FeaturesSection() {
  const { t } = useLanguage();
  return (
    <>
      <style>{`
        .features-section {
          padding: 100px 40px;
          background: var(--white);
        }
        .features-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 64px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--gray-100);
        }
        .section-eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 12px;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 400;
          letter-spacing: -2px;
          line-height: 1.05;
          color: var(--black);
        }
        .section-desc {
          font-size: 15px;
          color: var(--gray-500);
          max-width: 320px;
          line-height: 1.7;
          text-align: right;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: var(--gray-100);
          border: 1px solid var(--gray-100);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        .feature-card {
          background: var(--white);
          padding: 40px;
          position: relative;
          transition: background 0.2s;
        }
        .feature-card:hover { background: var(--gray-50); }
        .feature-card.highlighted { 
          background: var(--gray-900); 
          border: 1px solid rgba(22,163,74,0.3);
          box-shadow: 0 0 40px rgba(22,163,74,0.08) inset;
        }
        .feature-card.highlighted:hover { background: var(--gray-800); }
        .feature-number {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: var(--gray-300);
          margin-bottom: 20px;
        }
        .feature-card.highlighted .feature-number { color: var(--gray-600); }
        .feature-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          border-radius: 4px;
          padding: 3px 10px;
          margin-bottom: 16px;
        }
        .feature-title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 400;
          letter-spacing: -0.5px;
          color: var(--black);
          margin-bottom: 14px;
          line-height: 1.2;
        }
        .feature-card.highlighted .feature-title { color: var(--white); }
        .feature-desc {
          font-size: 14px;
          color: var(--gray-500);
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .feature-card.highlighted .feature-desc { color: var(--gray-400); }
        .feature-items {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 28px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--gray-600);
        }
        .feature-card.highlighted .feature-item { color: var(--gray-400); }
        .feature-item-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .feature-stat-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding-top: 20px;
          border-top: 1px solid var(--gray-100);
        }
        .feature-card.highlighted .feature-stat-row { border-top-color: rgba(255,255,255,0.08); }
        .feature-stat-val {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 400;
          line-height: 1;
          letter-spacing: -1px;
        }
        .feature-stat-lbl {
          font-size: 13px;
          color: var(--gray-400);
        }
        .feature-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 24px;
          font-size: 13px;
          font-weight: 600;
          color: var(--black);
          text-decoration: none;
        }
        .feature-card.highlighted .feature-link {
          color: var(--white);
        }
        .feature-link span {
          transition: transform 0.2s;
        }
        .feature-link:hover span {
          transform: translateX(4px);
        }
      `}</style>

      <section className="features-section" id="fonctionnalités">
        <div className="features-inner">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">{t.features.eyebrow}</div>
              <h2 className="section-title" style={{ whiteSpace: "pre-line" }}>
                {t.features.title}
              </h2>
            </div>
            <p className="section-desc">
              {t.features.desc}
            </p>
          </div>

          <div className="features-grid">
            {features.map((f) => (
              <div key={f.number} className={`feature-card ${f.highlight ? "highlighted" : ""}`}>
                <div className="feature-number">{f.number}</div>
                <div
                  className="feature-tag"
                  style={{
                    background: f.highlight ? "rgba(34,197,94,0.15)" : f.accentBg,
                    color: f.highlight ? "var(--green-light)" : f.accent,
                  }}
                >
                  {f.tag}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                <ul className="feature-items">
                  {f.items.map(item => (
                    <li key={item} className="feature-item">
                      <div
                        className="feature-item-dot"
                        style={{ background: f.highlight ? "var(--green-light)" : f.accent }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="feature-stat-row">
                  <div className="feature-stat-val" style={{ color: f.highlight ? "var(--green-light)" : f.accent }}>
                    {f.stat}
                  </div>
                  <div className="feature-stat-lbl">{f.statLabel}</div>
                </div>
                <a href="#" className="feature-link">
                  En savoir plus <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}