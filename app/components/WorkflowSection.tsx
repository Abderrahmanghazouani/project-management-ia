"use client";
import { useLanguage } from '../i18n/LanguageContext';

export default function WorkflowSection() {
  const { t } = useLanguage();
  const steps = t.workflow.steps;
  
  return (
    <>
      <style>{`
        .workflow-section {
          padding: 120px 24px;
          background: var(--white);
          position: relative;
          overflow: hidden;
        }
        
        .workflow-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 1000px;
          background: radial-gradient(circle, var(--primary-pale) 0%, transparent 60%);
          pointer-events: none;
          opacity: 0.5;
        }
        
        .workflow-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        
        .workflow-head {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .workflow-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
        }
        
        /* Connection line */
        .workflow-steps::before {
          content: '';
          position: absolute;
          top: 40px;
          left: 80px;
          right: 80px;
          height: 2px;
          background: linear-gradient(90deg, var(--border) 0%, var(--primary) 50%, var(--border) 100%);
          z-index: 0;
        }
        
        .workflow-step {
          position: relative;
          z-index: 1;
          text-align: center;
        }
        
        .step-icon-wrap {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          border-radius: var(--radius-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          background: var(--white);
          border: 2px solid var(--border);
          box-shadow: var(--shadow-md);
          transition: all 0.3s ease;
        }
        
        .step-icon-wrap.highlight {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
          box-shadow: 0 12px 40px rgba(22,163,74,0.3);
        }
        
        .workflow-step:hover .step-icon-wrap {
          transform: translateY(-4px) scale(1.05);
        }
        
        .step-num {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--muted-foreground);
          margin-bottom: 12px;
        }
        
        .step-title {
          font-family: var(--font-sans);
          font-size: 20px;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 12px;
          letter-spacing: -0.3px;
        }
        
        .step-desc {
          font-size: 14px;
          color: var(--muted-foreground);
          line-height: 1.6;
          max-width: 220px;
          margin: 0 auto;
        }

        /* Terminal Section */
        .terminal-section {
          padding: 120px 24px;
          background: var(--muted);
        }
        
        .terminal-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        
        .terminal-content {
          max-width: 480px;
        }
        
        .terminal-card {
          background: var(--foreground);
          border-radius: var(--radius-2xl);
          overflow: hidden;
          box-shadow: var(--shadow-2xl);
        }
        
        .terminal-header {
          background: var(--black);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        
        .win-dot { 
          width: 12px; 
          height: 12px; 
          border-radius: 50%; 
        }
        
        .terminal-body {
          padding: 28px;
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 2.2;
        }
        
        .t-line { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
        }
        
        .t-prompt { 
          color: var(--green-light); 
          user-select: none; 
        }
        
        .t-cmd { color: #E2E8F0; }
        .t-success { color: var(--green-light); }
        .t-info { color: var(--gray-500); }
        
        .t-cursor {
          display: inline-block;
          width: 8px; 
          height: 16px;
          background: var(--green-light);
          animation: blink 1s step-end infinite;
          vertical-align: middle;
          border-radius: 1px;
        }

        .stack-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 40px;
        }
        
        .stack-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          transition: all 0.2s ease;
        }
        
        .stack-item:hover {
          border-color: var(--primary-muted);
          box-shadow: var(--shadow-md);
        }
        
        .stack-icon {
          width: 40px; 
          height: 40px;
          background: var(--muted);
          border-radius: var(--radius-lg);
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        
        .stack-name { 
          font-size: 14px; 
          font-weight: 600; 
          color: var(--foreground); 
        }
        
        .stack-role { 
          font-size: 12px; 
          color: var(--muted-foreground); 
          font-family: var(--font-mono);
          margin-top: 2px;
        }
        
        @media (max-width: 1024px) {
          .workflow-steps { grid-template-columns: repeat(2, 1fr); gap: 40px; }
          .workflow-steps::before { display: none; }
          .terminal-inner { grid-template-columns: 1fr; gap: 48px; }
          .terminal-content { max-width: 100%; }
        }
        
        @media (max-width: 600px) {
          .workflow-steps { grid-template-columns: 1fr; }
          .stack-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* WORKFLOW */}
      <section className="workflow-section" id="workflow-ia">
        <div className="workflow-inner">
          <div className="workflow-head">
            <div className="section-eyebrow" style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--primary)", marginBottom: 16 }}>
              {t.workflow.eyebrow}
            </div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1.1, color: "var(--foreground)" }} className="text-balance">
              {t.workflow.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h2>
          </div>

          <div className="workflow-steps">
            {steps.map((s) => (
              <div key={s.step} className="workflow-step">
                <div className={`step-icon-wrap ${'highlight' in s && s.highlight ? "highlight" : ""}`}>
                  {s.icon}
                </div>
                <div className="step-num">{s.step}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TERMINAL */}
      <section className="terminal-section">
        <div className="terminal-inner">
          <div className="terminal-content">
            <div className="section-eyebrow" style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--primary)", marginBottom: 16 }}>
              {t.terminal.eyebrow}
            </div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(32px,4vw,48px)", fontWeight: 700, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1, color: "var(--foreground)" }} className="text-balance">
              {t.terminal.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h2>
            <p style={{ color: "var(--muted-foreground)", fontSize: 16, lineHeight: 1.7 }}>
              {t.terminal.desc}
            </p>

            <div className="stack-grid">
              {[
                { icon: "N", name: "Next.js 14", role: "App Router" },
                { icon: "S", name: "Spring Boot", role: "REST API" },
                { icon: "P", name: "PostgreSQL", role: "Database" },
                { icon: "G", name: "Gemini 1.5", role: "AI Engine" },
              ].map(s => (
                <div key={s.name} className="stack-item">
                  <div className="stack-icon">{s.icon}</div>
                  <div>
                    <div className="stack-name">{s.name}</div>
                    <div className="stack-role">{s.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="terminal-card">
            <div className="terminal-header">
              <div className="win-dot" style={{ background: "#EF4444" }} />
              <div className="win-dot" style={{ background: "#F59E0B" }} />
              <div className="win-dot" style={{ background: "#22C55E" }} />
              <span style={{ marginLeft: 12, fontSize: 12, color: "#64748B", fontFamily: "var(--font-mono)" }}>
                terminal
              </span>
            </div>
            <div className="terminal-body">
              <div className="t-line t-info">
                <span># Clone the project</span>
              </div>
              <div className="t-line">
                <span className="t-prompt">$</span>
                <span className="t-cmd">git clone https://github.com/emsi/projAI</span>
              </div>
              <div className="t-line">
                <span className="t-prompt">$</span>
                <span className="t-cmd">cd projAI</span>
              </div>
              <div style={{ height: 12 }} />
              <div className="t-line t-info">
                <span># Start all services</span>
              </div>
              <div className="t-line">
                <span className="t-prompt">$</span>
                <span className="t-cmd">docker-compose up --build</span>
              </div>
              <div style={{ height: 16 }} />
              <div className="t-line">
                <span className="t-success">OK</span>
                <span className="t-success">PostgreSQL ready on :5432</span>
              </div>
              <div className="t-line">
                <span className="t-success">OK</span>
                <span className="t-success">Spring Boot started on :8080</span>
              </div>
              <div className="t-line">
                <span className="t-success">OK</span>
                <span className="t-success">Next.js ready on :3000</span>
              </div>
              <div style={{ height: 12 }} />
              <div className="t-line">
                <span className="t-prompt">$</span>
                <span className="t-cursor" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
