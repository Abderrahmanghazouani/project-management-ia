"use client";

const technologies = [
  {
    name: "Next.js 14",
    category: "Frontend",
    desc: "Framework React avec App Router, SSR et optimisations automatiques.",
    color: "#000000",
  },
  {
    name: "Spring Boot",
    category: "Backend",
    desc: "API REST Java avec validation, securite et architecture en couches.",
    color: "#6DB33F",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    desc: "Base relationnelle avec migrations Flyway/Liquibase et requetes optimisees.",
    color: "#4169E1",
  },
  {
    name: "Gemini AI",
    category: "Intelligence",
    desc: "API Google pour l'analyse CDC, extraction de taches et estimation automatique.",
    color: "#4285F4",
  },
  {
    name: "Docker",
    category: "DevOps",
    desc: "Conteneurisation complete avec Docker Compose - une commande pour tout deployer.",
    color: "#2496ED",
  },
  {
    name: "JWT + BCrypt",
    category: "Securite",
    desc: "Authentification stateless avec tokens signes et mots de passe haches.",
    color: "#EF4444",
  },
];

const specs = [
  { label: "Performance API", value: "< 500ms", desc: "Temps de reponse hors IA" },
  { label: "Timeout IA", value: "30s", desc: "Avec fallback manuel" },
  { label: "Pagination", value: "20/page", desc: "Projets et tickets" },
  { label: "Tests", value: "JUnit 5", desc: "Couverture modules Haute" },
];

export default function TechStackSection() {
  return (
    <>
      <style>{`
        .tech-section {
          padding: 140px 24px;
          background: var(--muted);
          position: relative;
        }
        
        .tech-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
        }
        
        .tech-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .tech-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 80px;
          gap: 40px;
        }
        
        .tech-title-wrap {
          flex: 1;
        }
        
        .tech-eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 16px;
        }
        
        .tech-title {
          font-family: var(--font-sans);
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 700;
          letter-spacing: -2px;
          line-height: 1.1;
          color: var(--foreground);
        }
        
        .tech-desc {
          font-size: 16px;
          color: var(--muted-foreground);
          max-width: 380px;
          line-height: 1.7;
          text-align: right;
        }
        
        /* Tech grid */
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 60px;
        }
        
        .tech-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 32px;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .tech-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--card-color);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .tech-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
          border-color: var(--gray-200);
        }
        
        .tech-card:hover::before {
          opacity: 1;
        }
        
        .tech-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        
        .tech-name {
          font-family: var(--font-sans);
          font-size: 20px;
          font-weight: 700;
          color: var(--foreground);
          letter-spacing: -0.3px;
        }
        
        .tech-category {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          background: var(--muted);
          color: var(--muted-foreground);
        }
        
        .tech-card-desc {
          font-size: 14px;
          color: var(--muted-foreground);
          line-height: 1.7;
        }
        
        /* Specs row */
        .specs-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          padding: 40px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
        }
        
        .spec-item {
          text-align: center;
          padding: 20px;
          border-right: 1px solid var(--border-light);
        }
        
        .spec-item:last-child {
          border-right: none;
        }
        
        .spec-value {
          font-family: var(--font-sans);
          font-size: 36px;
          font-weight: 800;
          color: var(--green);
          letter-spacing: -1px;
          margin-bottom: 8px;
        }
        
        .spec-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 4px;
        }
        
        .spec-desc {
          font-size: 12px;
          color: var(--muted-foreground);
        }
        
        /* Terminal preview */
        .terminal-preview {
          margin-top: 60px;
          background: var(--foreground);
          border-radius: var(--radius-2xl);
          overflow: hidden;
          box-shadow: var(--shadow-2xl);
        }
        
        .terminal-header {
          background: var(--gray-800);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .terminal-dots {
          display: flex;
          gap: 8px;
        }
        
        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        
        .terminal-title {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--gray-500);
          margin-left: 12px;
        }
        
        .terminal-body {
          padding: 28px;
          font-family: var(--font-mono);
          font-size: 14px;
          line-height: 2;
        }
        
        .t-prompt {
          color: var(--green-light);
        }
        
        .t-cmd {
          color: var(--white);
        }
        
        .t-comment {
          color: var(--gray-600);
        }
        
        .t-output {
          color: var(--gray-400);
        }
        
        .t-success {
          color: var(--green-light);
        }
        
        @media (max-width: 1000px) {
          .tech-grid { grid-template-columns: repeat(2, 1fr); }
          .specs-row { grid-template-columns: repeat(2, 1fr); }
          .spec-item { border-right: none; border-bottom: 1px solid var(--border-light); }
          .spec-item:nth-child(3), .spec-item:nth-child(4) { border-bottom: none; }
        }
        
        @media (max-width: 700px) {
          .tech-section { padding: 100px 20px; }
          .tech-header { flex-direction: column; align-items: flex-start; }
          .tech-desc { text-align: left; }
          .tech-grid { grid-template-columns: 1fr; }
          .specs-row { grid-template-columns: 1fr; padding: 24px; }
          .spec-item { border-bottom: 1px solid var(--border-light); padding: 16px 0; }
          .spec-item:last-child { border-bottom: none; }
        }
      `}</style>

      <section className="tech-section" id="stack">
        <div className="tech-inner">
          <div className="tech-header">
            <div className="tech-title-wrap">
              <div className="tech-eyebrow">Stack Technique</div>
              <h2 className="tech-title text-balance">Architecture moderne et robuste</h2>
            </div>
            <p className="tech-desc">
              Une stack eprouvee combinant performance, securite et maintenabilite pour des projets de qualite.
            </p>
          </div>

          <div className="tech-grid">
            {technologies.map((tech) => (
              <div 
                key={tech.name} 
                className="tech-card"
                style={{ '--card-color': tech.color } as React.CSSProperties}
              >
                <div className="tech-card-header">
                  <h3 className="tech-name">{tech.name}</h3>
                  <span className="tech-category">{tech.category}</span>
                </div>
                <p className="tech-card-desc">{tech.desc}</p>
              </div>
            ))}
          </div>

          <div className="specs-row">
            {specs.map((spec) => (
              <div key={spec.label} className="spec-item">
                <div className="spec-value">{spec.value}</div>
                <div className="spec-label">{spec.label}</div>
                <div className="spec-desc">{spec.desc}</div>
              </div>
            ))}
          </div>

          <div className="terminal-preview">
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="terminal-dot" style={{ background: '#EF4444' }} />
                <div className="terminal-dot" style={{ background: '#F59E0B' }} />
                <div className="terminal-dot" style={{ background: '#22C55E' }} />
              </div>
              <span className="terminal-title">terminal - deploiement</span>
            </div>
            <div className="terminal-body">
              <div><span className="t-comment"># Clone le repository</span></div>
              <div><span className="t-prompt">$</span> <span className="t-cmd">git clone https://github.com/emsi/proj-ai.git</span></div>
              <div><span className="t-output">Cloning into &apos;proj-ai&apos;...</span></div>
              <div style={{ height: 8 }} />
              <div><span className="t-comment"># Lance tous les services</span></div>
              <div><span className="t-prompt">$</span> <span className="t-cmd">docker-compose up -d</span></div>
              <div><span className="t-output">Creating network &quot;proj-ai_default&quot;...</span></div>
              <div><span className="t-output">Creating proj-ai_db_1 ...</span></div>
              <div><span className="t-output">Creating proj-ai_backend_1 ...</span></div>
              <div><span className="t-output">Creating proj-ai_frontend_1 ...</span></div>
              <div><span className="t-success">All services started successfully on localhost:3000</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
