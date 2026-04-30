"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from '../i18n/LanguageContext';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  // Subtle dot-grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 32;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,0,0,0.07)";
          ctx.fill();
        }
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 120px 40px 80px;
          background: var(--white);
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.6;
        }
        .hero-green-band {
          position: absolute;
          top: 0; right: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(135deg, transparent 0%, var(--green-pale) 100%);
          pointer-events: none;
        }
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid var(--gray-200);
          background: var(--white);
          border-radius: 100px;
          padding: 5px 14px 5px 8px;
          font-size: 12px;
          font-weight: 500;
          color: var(--gray-600);
          margin-bottom: 28px;
          box-shadow: var(--shadow-sm);
        }
        .eyebrow-badge {
          background: var(--black);
          color: var(--white);
          border-radius: 100px;
          padding: 2px 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3px;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(52px, 7vw, 96px);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: -3px;
          color: var(--black);
          margin-bottom: 24px;
        }
        .hero-title em {
          font-style: italic;
          color: var(--green);
        }
        .hero-title strong {
          font-style: normal;
          font-weight: 400;
          position: relative;
          display: inline-block;
        }
        .hero-title strong::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 0; right: 0;
          height: 3px;
          background: var(--green);
          border-radius: 2px;
          animation: scan-h 1s ease forwards 0.8s both;
        }
        .hero-desc {
          color: var(--gray-500);
          font-size: 18px;
          line-height: 1.8;
          max-width: 440px;
          margin-bottom: 40px;
          font-weight: 300;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .btn-hero-primary {
          background: var(--black);
          color: var(--white);
          border: none;
          border-radius: var(--radius-md);
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-hero-primary:hover {
          background: var(--gray-800);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .btn-hero-secondary {
          background: var(--white);
          color: var(--black);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .btn-hero-secondary:hover {
          border-color: var(--gray-400);
          box-shadow: var(--shadow-sm);
        }
        .hero-trust {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid var(--gray-100);
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--gray-500);
        }
        .trust-icon {
          width: 20px; height: 20px;
          background: var(--green-pale);
          border: 1px solid var(--green-muted);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
        }

        /* Dashboard card */
        .dashboard-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 20px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
          overflow: hidden;
          animation: float 6s ease-in-out infinite;
          position: relative;
        }
        .dashboard-topbar {
          background: var(--gray-50);
          border-bottom: 1px solid var(--gray-200);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .win-btn {
          width: 10px; height: 10px;
          border-radius: 50%;
        }
        .dashboard-body { padding: 20px; }
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .dash-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--gray-800);
        }
        .dash-sprint {
          font-size: 11px;
          font-family: var(--font-mono);
          background: var(--green-pale);
          color: var(--green);
          border: 1px solid var(--green-muted);
          border-radius: 4px;
          padding: 2px 8px;
          font-weight: 600;
        }
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 10px;
          margin-bottom: 16px;
        }
        .dash-stat {
          background: var(--gray-50);
          border: 1px solid var(--gray-100);
          border-radius: var(--radius-md);
          padding: 12px;
        }
        .dash-stat-val {
          font-size: 22px;
          font-weight: 700;
          color: var(--black);
          font-family: var(--font-display);
        }
        .dash-stat-lbl {
          font-size: 10px;
          color: var(--gray-400);
          margin-top: 2px;
          font-family: var(--font-mono);
        }
        .kanban-mini {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
          margin-bottom: 12px;
        }
        .kanban-col-mini {
          border-radius: var(--radius-sm);
          padding: 8px;
        }
        .kanban-col-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 6px;
          font-family: var(--font-mono);
        }
        .kanban-ticket-mini {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 5px;
          padding: 6px 8px;
          font-size: 10px;
          color: var(--gray-700);
          margin-bottom: 4px;
        }
        .ai-result-bar {
          background: linear-gradient(135deg, var(--green-pale), #ecfdf5);
          border: 1px solid var(--green-muted);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ai-icon {
          width: 28px; height: 28px;
          background: var(--green);
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 13px;
          flex-shrink: 0;
        }
        .ai-label { font-size: 12px; font-weight: 600; color: var(--gray-800); }
        .ai-sub { font-size: 10px; color: var(--gray-400); margin-top: 1px; }
        .ai-confirm {
          margin-left: auto;
          background: var(--green);
          color: white;
          border: none;
          border-radius: 5px;
          padding: 4px 10px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        /* Floating badges */
        .float-badge {
          position: absolute;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
      `}</style>

      <section className="hero">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-green-band" />

        <div className="hero-inner">
          {/* LEFT */}
          <div className="animate-fade-up">
            <div className="hero-eyebrow">
              <span className="eyebrow-badge">{t.hero.new}</span>
              {t.hero.badge}
            </div>

            <h1 className="hero-title">
              {t.hero.title1}<br />
              {t.hero.title2}<em>{t.hero.title3}</em><br />
              <strong>{t.hero.title4}</strong>
            </h1>

            <p className="hero-desc">
              {t.hero.desc}
            </p>

            <div className="hero-actions">
              <button className="btn-hero-primary">
                {t.hero.cta1}
              </button>
              <button className="btn-hero-secondary">
                {t.hero.cta2}
              </button>
            </div>

            <div className="hero-trust">
              {[
                { icon: "🔒", text: "JWT + BCrypt" },
                { icon: "🐳", text: "Docker ready" },
                { icon: "⚡", text: "< 500ms API" },
                { icon: "📋", text: "4 rôles" },
              ].map(t => (
                <div key={t.text} className="trust-item">
                  <div className="trust-icon">{t.icon}</div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Dashboard */}
          <div style={{ position: "relative" }} className="animate-fade-up delay-300">
            <div className="dashboard-card">
              <div className="dashboard-topbar">
                <div className="win-btn" style={{ background: "#EF4444" }} />
                <div className="win-btn" style={{ background: "#F59E0B" }} />
                <div className="win-btn" style={{ background: "#22C55E" }} />
                <span style={{ marginLeft: 8, fontSize: 12, color: "var(--gray-400)", fontFamily: "var(--font-mono)" }}>
                  projAI — Dashboard
                </span>
              </div>
              <div className="dashboard-body">
                <div className="dash-header">
                  <div className="dash-title">Sprint 2 · Semaine 3</div>
                  <div className="dash-sprint">ACTIF</div>
                </div>

                <div className="dash-stats">
                  {[
                    { v: "24", l: "TICKETS" },
                    { v: "17", l: "DONE" },
                    { v: "3", l: "RISQUES" },
                  ].map(s => (
                    <div key={s.l} className="dash-stat">
                      <div className="dash-stat-val">{s.v}</div>
                      <div className="dash-stat-lbl">{s.l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 10, color: "var(--gray-400)", fontFamily: "var(--font-mono)", marginBottom: 8, fontWeight: 600 }}>
                  KANBAN — Sprint actif
                </div>
                <div className="kanban-mini">
                  {[
                    { label: "TO DO", bg: "var(--gray-50)", border: "var(--gray-200)", labelColor: "var(--gray-400)", items: ["CDC Form", "Auth UI"] },
                    { label: "IN PROGRESS", bg: "#F5F3FF", border: "#E9D5FF", labelColor: "var(--purple)", items: ["Gemini API", "Kanban"] },
                    { label: "DONE", bg: "var(--green-pale)", border: "var(--green-muted)", labelColor: "var(--green)", items: ["JWT setup", "DB schema"] },
                  ].map(col => (
                    <div key={col.label} className="kanban-col-mini" style={{ background: col.bg, border: `1px solid ${col.border}` }}>
                      <div className="kanban-col-label" style={{ color: col.labelColor }}>{col.label}</div>
                      {col.items.map(item => (
                        <div key={item} className="kanban-ticket-mini">{item}</div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="ai-result-bar">
                  <div className="ai-icon">✦</div>
                  <div>
                    <div className="ai-label">Analyse IA terminée</div>
                    <div className="ai-sub">14 tâches · Complexité Moyenne · 3 risques</div>
                  </div>
                  <button className="ai-confirm">✓ Confirmé</button>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="float-badge animate-float" style={{ top: -18, right: -18, color: "var(--green)", borderColor: "var(--green-muted)", background: "var(--green-pale)" }}>
              <span>✦</span> Gemini AI actif
            </div>
            <div className="float-badge" style={{ bottom: -18, left: -18, animationDelay: "1.5s", animation: "float 5s ease-in-out 1.5s infinite" }}>
              🐳 <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>docker-compose up</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}