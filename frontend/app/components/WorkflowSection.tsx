"use client";
import { useLanguage } from '../i18n/LanguageContext';

const defaultColor = "var(--gray-900)";
const defaultGreen = "var(--green)";


export default function WorkflowSection() {
  const { t } = useLanguage();
  const steps = t.workflow.steps;
  return (
    <>
      <style>{`
        .workflow-section {
          padding: 100px 40px;
          background: var(--gray-50);
          border-top: 1px solid var(--gray-100);
          border-bottom: 1px solid var(--gray-100);
        }
        .workflow-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .workflow-head {
          text-align: center;
          margin-bottom: 72px;
        }
        .workflow-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }
        .workflow-steps::before {
          content: '';
          position: absolute;
          top: 28px;
          left: calc(12.5%);
          width: calc(75%);
          height: 1px;
          background: var(--gray-200);
          z-index: 0;
        }
        .workflow-step {
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }
        .step-dot {
          width: 56px; height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 20px;
          transition: transform 0.2s;
          position: relative;
        }
        .step-dot.normal {
          background: var(--white);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
        }
        .step-dot.green {
          background: var(--green);
          color: white;
          box-shadow: 0 8px 32px rgba(22,163,74,0.35);
        }
        .workflow-step:hover .step-dot { transform: translateY(-3px); }
        .step-num {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: var(--gray-400);
          margin-bottom: 10px;
        }
        .step-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 400;
          color: var(--black);
          margin-bottom: 10px;
          letter-spacing: -0.3px;
        }
        .step-desc {
          font-size: 14px;
          color: var(--gray-500);
          line-height: 1.65;
        }

        /* Terminal block */
        .terminal-section {
          padding: 100px 40px;
          background: var(--white);
        }
        .terminal-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .terminal-card {
          background: var(--gray-900);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
        }
        .terminal-header {
          background: var(--black);
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 7px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .win-dot { width: 10px; height: 10px; border-radius: 50%; }
        .terminal-body {
          padding: 24px;
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 2;
        }
        .t-line { display: flex; align-items: center; gap: 6px; }
        .t-prompt { color: #4ADE80; user-select: none; }
        .t-cmd { color: #E2E8F0; }
        .t-success { color: #4ADE80; }
        .t-info { color: #94A3B8; }
        .t-cursor {
          display: inline-block;
          width: 7px; height: 14px;
          background: var(--green);
          animation: blink 1s step-end infinite;
          vertical-align: middle;
        }

        .stack-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid var(--gray-100);
        }
        .stack-item:last-child { border-bottom: none; }
        .stack-icon {
          width: 36px; height: 36px;
          background: var(--gray-100);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .stack-name { font-size: 14px; font-weight: 600; color: var(--black); }
        .stack-role { font-size: 12px; color: var(--gray-400); font-family: var(--font-mono); }
      `}</style>

      {/* WORKFLOW */}
      <section className="workflow-section" id="workflow-ia">
        <div className="workflow-inner">
          <div className="workflow-head">
            <div className="section-eyebrow" style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--green)", marginBottom: 12 }}>
              {t.workflow.eyebrow}
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)", fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, color: "var(--black)", whiteSpace: "pre-line" }}>
              {t.workflow.title}
            </h2>
          </div>

          <div className="workflow-steps">
            {steps.map((s) => (
              <div key={s.step} className="workflow-step">
                <div className={`step-dot ${'highlight' in s && s.highlight ? "green" : "normal"}`}>
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
          <div>
            <div className="section-eyebrow" style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--green)", marginBottom: 12 }}>
              {t.terminal.eyebrow}
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 400, letterSpacing: -2, marginBottom: 20, lineHeight: 1.1, color: "var(--black)", whiteSpace: "pre-line" }}>
              {t.terminal.title}
            </h2>
            <p style={{ color: "var(--gray-500)", fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
              {t.terminal.desc}
            </p>

            <div>
              {[
                { icon: "▲", name: "Next.js 14", role: "App Router · TypeScript" },
                { icon: "☕", name: "Spring Boot", role: "REST API · JWT · BCrypt" },
                { icon: "🐘", name: "PostgreSQL", role: "Flyway migrations · RBAC" },
                { icon: "✦", name: "Gemini 1.5 Flash", role: "Analyse CDC · Chatbot" },
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
              <span style={{ marginLeft: 8, fontSize: 11, color: "#64748B", fontFamily: "var(--font-mono)" }}>
                bash — projAI
              </span>
            </div>
            <div className="terminal-body">
              <div className="t-line t-info">
                <span># Cloner le projet</span>
              </div>
              <div className="t-line">
                <span className="t-prompt">$</span>
                <span className="t-cmd">git clone https://github.com/emsi/projAI</span>
              </div>
              <div className="t-line">
                <span className="t-prompt">$</span>
                <span className="t-cmd">cd projAI</span>
              </div>
              <div className="t-line t-info">
                <span># Lancer tous les services</span>
              </div>
              <div className="t-line">
                <span className="t-prompt">$</span>
                <span className="t-cmd">docker-compose up --build</span>
              </div>
              <div style={{ height: 8 }} />
              <div className="t-line">
                <span className="t-success">✓</span>
                <span className="t-success">PostgreSQL ready on :5432</span>
              </div>
              <div className="t-line">
                <span className="t-success">✓</span>
                <span className="t-success">Spring Boot started on :8080</span>
              </div>
              <div className="t-line">
                <span className="t-success">✓</span>
                <span className="t-success">Next.js ready on :3000</span>
              </div>
              <div style={{ height: 8 }} />
              <div className="t-line" style={{ color: "#A78BFA" }}>
                <span>🚀 Application running!</span>
              </div>
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