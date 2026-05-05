"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { Footer, CTASection } from "../components/CTAAndFooter";

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main>
      <Navbar solid />

      <style>{`
        .hero {
          padding: 160px 24px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: var(--background);
          text-align: center;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }
        
        .hero-glow {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(ellipse at center, #F0FDF4 0%, transparent 60%);
          pointer-events: none;
          opacity: 0.6;
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          padding: 8px 8px 8px 20px;
          font-size: 14px;
          font-weight: 500;
          color: var(--muted-foreground);
          margin-bottom: 32px;
          box-shadow: var(--shadow-sm);
          animation: fadeUp 0.6s ease forwards;
          position: relative;
          z-index: 1;
        }
        
        .pill-green {
          background: var(--green);
          color: var(--white);
          border-radius: var(--radius-full);
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
        }

        .hero-title {
          font-family: var(--font-sans);
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -2px;
          color: var(--foreground);
          max-width: 900px;
          margin-bottom: 24px;
          animation: fadeUp 0.6s ease 0.1s forwards;
          opacity: 0;
          position: relative;
          z-index: 1;
        }

        .hero-subtitle {
          color: var(--muted-foreground);
          font-size: 20px;
          max-width: 600px;
          margin-bottom: 48px;
          animation: fadeUp 0.6s ease 0.2s forwards;
          opacity: 0;
          position: relative;
          z-index: 1;
        }

        .search-container {
          width: 100%;
          max-width: 540px;
          position: relative;
          animation: fadeUp 0.6s ease 0.3s forwards;
          opacity: 0;
          z-index: 1;
        }

        .search-input {
          width: 100%;
          padding: 18px 24px 18px 56px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background: var(--white);
          font-size: 16px;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-md);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--green);
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted-foreground);
        }

        /* Quick Nav */
        .section-nav {
          padding: 80px 24px;
          background: var(--gray-50);
        }

        .nav-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .nav-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 32px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .nav-card:hover {
          transform: translateY(-5px);
          border-color: var(--green);
          box-shadow: var(--shadow-lg);
        }

        .nav-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          font-size: 24px;
        }

        .nav-card-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--foreground);
        }

        .nav-card-subtitle {
          font-size: 14px;
          color: var(--muted-foreground);
        }

        /* Quick Start */
        .section-quick-start {
          padding: 100px 24px;
          background: var(--white);
        }

        .qs-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          max-width: 1100px;
          margin: 0 auto;
          align-items: center;
        }

        .prereqs-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .prereq-item {
          display: flex;
          align-items: center;
          gap: 16px;
          font-weight: 500;
        }

        .code-block {
          background: var(--gray-900);
          border-radius: var(--radius-xl);
          padding: 32px;
          font-family: var(--font-mono);
          box-shadow: var(--shadow-xl);
        }

        .code-comment { color: #6B7280; }
        .code-cmd { color: #86EFAC; }
        .code-string { color: #FCA5A5; }

        /* Tech Stack Table */
        .section-stack {
          padding: 80px 24px;
          background: var(--gray-50);
        }

        .stack-table-container {
          max-width: 800px;
          margin: 0 auto;
          background: var(--white);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          overflow: hidden;
        }

        .layer-badge {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 800px;
          margin: 32px auto 0;
        }

        .kpi-card {
          background: var(--white);
          padding: 20px;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          text-align: center;
        }

        /* API Reference */
        .section-api {
          padding: 100px 24px;
          background: var(--white);
        }

        .api-group {
          max-width: 900px;
          margin: 0 auto 60px;
        }

        .group-title {
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 32px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--green);
          display: inline-block;
        }

        .endpoint-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 24px;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          margin-bottom: 12px;
          transition: all 0.2s ease;
        }

        .endpoint-card:hover {
          background: var(--gray-50);
        }

        .method {
          font-size: 11px;
          font-weight: 800;
          width: 70px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          color: var(--white);
        }

        .path { font-family: var(--font-mono); font-size: 14px; font-weight: 600; }

        /* Env Vars */
        .section-env {
          padding: 100px 24px;
          background: var(--gray-900);
          color: var(--white);
        }

        .env-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .env-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 32px;
          border-radius: var(--radius-xl);
        }

        .env-key { color: #93C5FD; }
        .env-val { color: #86EFAC; }

        /* RBAC Table */
        .section-rbac {
          padding: 100px 24px;
          background: var(--white);
        }

        /* Coverage */
        .section-tests {
          padding: 100px 24px;
          background: var(--gray-50);
        }

        .coverage-bar {
          height: 8px;
          background: var(--gray-200);
          border-radius: 4px;
          margin-top: 8px;
          overflow: hidden;
        }

        .coverage-fill {
          height: 100%;
          background: var(--green);
          border-radius: 4px;
        }

        /* FAQ documented in support style */
        .support-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 60px auto 0;
        }

        .support-card {
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(12px);
          padding: 32px;
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          color: var(--white);
        }

        @media (max-width: 1024px) {
          .nav-grid, .support-grid { grid-template-columns: repeat(2, 1fr); }
          .qs-grid, .env-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .nav-grid, .support-grid, .kpi-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 40px; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="badge-pill">
          <span>Documentation complète</span>
          <span className="pill-green">v1.0</span>
        </div>
        <h1 className="hero-title">Tout ce que vous devez savoir sur ProJAI</h1>
        <p className="hero-subtitle">API, déploiement, guides utilisateur — commencez en quelques minutes</p>
        
        <div className="search-container">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Rechercher dans la documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Quick Nav */}
      <section className="section-nav">
        <div className="nav-grid">
          {[
            { icon: "🚀", title: "Démarrage rapide", sub: "Installez et lancez le projet en 5 min", color: "#F0FDF4" },
            { icon: "⚙️", title: "Guide technique", sub: "Architecture Spring Boot & Next.js", color: "#EFF6FF" },
            { icon: "📘", title: "Guide utilisateur", sub: "Comment utiliser l'IA et le Kanban", color: "#F5F3FF" },
            { icon: "🔌", title: "API Reference", sub: "Documentation Swagger & Endpoints", color: "#FEF2F2" },
            { icon: "🐳", title: "Déploiement", sub: "Docker, CI/CD et production", color: "#FFFBEB" },
            { icon: "❓", title: "FAQ", sub: "Réponses aux questions courantes", color: "#F9FAFB" }
          ].map((item, i) => (
            <div key={i} className="nav-card">
              <div className="nav-icon-box" style={{ background: item.color }}>{item.icon}</div>
              <h3 className="nav-card-title">{item.title}</h3>
              <p className="nav-card-subtitle">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="section-quick-start">
        <div className="qs-grid">
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 40 }}>Prêts à coder ?</h2>
            <ul className="prereqs-list">
              <li className="prereq-item"><span style={{ color: "#22C55E" }}>🟢</span> Node.js 18+</li>
              <li className="prereq-item"><span style={{ color: "#78350F" }}>☕</span> Java + Maven 17+</li>
              <li className="prereq-item"><span style={{ color: "#2563EB" }}>🐳</span> Docker Compose (optionnel)</li>
              <li className="prereq-item"><span style={{ color: "#16A34A" }}>🤖</span> Clé API Gemini (requis)</li>
            </ul>
          </div>
          <div className="code-block">
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F56" }}></div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }}></div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27C93F" }}></div>
            </div>
            <pre style={{ fontSize: 14, color: "#fff", lineHeight: 1.8 }}>
              <code>
                <span className="code-comment"># 1. Cloner le repository</span><br />
                <span className="code-cmd">git clone</span> <span className="code-string">https://github.com/votre-org/projai.git</span> && <span className="code-cmd">cd</span> projai<br /><br />
                <span className="code-comment"># 2. Variables d'environnement</span><br />
                <span className="code-cmd">cp</span> .env.example .env<br /><br />
                <span className="code-comment"># 3. Lancer avec Docker</span><br />
                <span className="code-cmd">docker-compose up --build</span><br /><br />
                <span className="code-comment"># Frontend → http://localhost:3000</span><br />
                <span className="code-comment"># Backend → :8080/api</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-stack">
        <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, marginBottom: 48 }}>Stack Technologique</h2>
        <div className="stack-table-container">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "var(--gray-50)" }}>
              <tr>
                <th style={{ padding: 16, textAlign: "left", fontSize: 12 }}>Couche</th>
                <th style={{ padding: 16, textAlign: "left", fontSize: 12 }}>Technologie</th>
                <th style={{ padding: 16, textAlign: "left", fontSize: 12 }}>Version</th>
              </tr>
            </thead>
            <tbody>
              {[
                { l: "Frontend", t: "Next.js", v: "14.x", c: "#F5F3FF", tc: "#8B5CF6" },
                { l: "Backend", t: "Spring Boot", v: "3.x", c: "#FEF2F2", tc: "#EF4444" },
                { l: "Database", t: "PostgreSQL", v: "15", c: "#FFF7ED", tc: "#F97316" },
                { l: "IA", t: "Google Gemini", v: "1.5 Flash", c: "#F0FDF4", tc: "#16A34A" },
                { l: "Infra", t: "Docker", v: "Compose", c: "#EFF6FF", tc: "#3B82F6" }
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: 16 }}><span className="layer-badge" style={{ background: row.c, color: row.tc }}>{row.l}</span></td>
                  <td style={{ padding: 16, fontWeight: 600 }}>{row.t}</td>
                  <td style={{ padding: 16, color: "var(--muted-foreground)" }}>{row.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="kpi-grid">
          {[
            { label: "Performance API", val: "<500ms" },
            { label: "Timeout IA", val: "30s" },
            { label: "Pagination", val: "20/page" },
            { label: "Tests Coverage", val: "80%+" }
          ].map((kpi, i) => (
            <div key={i} className="kpi-card">
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--green)" }}>{kpi.val}</div>
              <div style={{ fontSize: 11, color: "var(--muted-foreground)", textTransform: "uppercase", marginTop: 4 }}>{kpi.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* API Reference */}
      <section className="section-api">
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 80 }}>Référence API</h2>
        
        {[
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
        ].map((group, i) => (
          <div key={i} className="api-group">
            <div className="group-title">{group.group}</div>
            {group.endpoints.map((ep, j) => (
              <div key={j} className="endpoint-card">
                <span className="method" style={{ background: ep.c }}>{ep.m}</span>
                <span className="path">{ep.p}</span>
                <span style={{ marginLeft: "auto", fontSize: 14, color: "var(--muted-foreground)" }}>{ep.d}</span>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Env Vars */}
      <section className="section-env">
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 60 }}>Variables d'environnement</h2>
        <div className="env-grid">
          <div className="env-card">
            <h3 style={{ marginBottom: 20, fontSize: 16 }}>.env Backend</h3>
            <pre style={{ fontSize: 14, fontFamily: "var(--font-mono)" }}>
              <span className="env-key">GEMINI_API_KEY</span>=<span className="env-val">votre_cle_api</span><br />
              <span className="env-key">JWT_SECRET</span>=<span className="env-val">votre_secret_32chars</span><br />
              <span className="env-key">POSTGRES_DB</span>=<span className="env-val">projai_db</span>
            </pre>
          </div>
          <div className="env-card">
            <h3 style={{ marginBottom: 20, fontSize: 16 }}>.env.local Frontend</h3>
            <pre style={{ fontSize: 14, fontFamily: "var(--font-mono)" }}>
              <span className="env-key">NEXT_PUBLIC_API_URL</span>=<span className="env-val">http://localhost:8080/api</span><br />
              <span className="env-key">NEXT_PUBLIC_WS_URL</span>=<span className="env-val">ws://localhost:8080/ws</span>
            </pre>
          </div>
        </div>
      </section>

      {/* RBAC */}
      <section className="section-rbac">
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 60 }}>Droits & Rôles (RBAC)</h2>
        <div style={{ maxWidth: 900, margin: "0 auto", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                <th style={{ padding: 16, textAlign: "left" }}>Fonctionnalité</th>
                <th style={{ padding: 16 }}>Admin</th>
                <th style={{ padding: 16 }}>Manager</th>
                <th style={{ padding: 16 }}>Dev</th>
                <th style={{ padding: 16 }}>Client</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Gérer utilisateurs", "✓", "✓", "—", "—"],
                ["Analyser CDC (IA)", "✓", "✓", "—", "✓"],
                ["Gérer backlog", "✓", "✓", "✓", "—"],
                ["Voir board Kanban", "✓", "✓", "✓", "✓"]
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: 16, fontWeight: 600 }}>{row[0]}</td>
                  {row.slice(1).map((cell, j) => (
                    <td key={j} style={{ padding: 16, textAlign: "center", color: cell === "✓" ? "var(--green)" : "var(--gray-400)" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tests & DoD */}
      <section className="section-tests">
        <div className="qs-grid">
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Definition of Done</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
              {["Conforme aux critères d'acceptation", "Tests unitaires modules Haute", "Documentation Swagger à jour", "Code review effectuée"].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
                  <span style={{ color: "var(--green)" }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Couverture de tests</h3>
            {[
              { m: "M1 Authentification", p: 80 },
              { m: "M3 IA Gemini", p: 70 },
              { m: "M5 Backlog", p: 80 }
            ].map((bar, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600 }}>
                  <span>{bar.m}</span>
                  <span>{bar.p}%</span>
                </div>
                <div className="coverage-bar">
                  <div className="coverage-fill" style={{ width: `${bar.p}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Support */}
      <section style={{ padding: "100px 24px", background: "var(--gray-900)" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 60 }}>FAQ & Support</h2>
        <div className="faq-container" style={{ maxWidth: 800, margin: "0 auto" }}>
          {[
            { q: "Comment obtenir une clé API Gemini ?", a: "Rendez-vous sur makersuite.google.com/app/apikey. Le plan gratuit offre 60 req/min." },
            { q: "Puis-je utiliser sans Docker ?", a: "Oui, configurez PostgreSQL manuellement et utilisez mvn spring-boot:run + npm run dev." },
            { q: "Les données sont-elles chiffrées ?", a: "Oui, BCrypt 10 rounds pour les mots de passe et HMAC-SHA256 pour les tokens JWT." }
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, marginBottom: 12, overflow: "hidden" }}>
              <div 
                onClick={() => toggleFaq(i)}
                style={{ padding: 24, cursor: "pointer", display: "flex", justifyContent: "space-between", color: "#fff", fontWeight: 600 }}
              >
                {item.q}
                <span style={{ transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "none", color: "var(--green)" }}>+</span>
              </div>
              {openFaq === i && <div style={{ padding: "0 24px 24px", color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{item.a}</div>}
            </div>
          ))}
        </div>

        <div className="support-grid">
          <div className="support-card">
            <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>✉️</span>
            <div style={{ fontWeight: 700 }}>Email</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>support@projai.com</div>
          </div>
          <div className="support-card">
            <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>💬</span>
            <div style={{ fontWeight: 700 }}>Chat direct</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Disponible 9h–18h</div>
          </div>
          <div className="support-card">
            <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>🐙</span>
            <div style={{ fontWeight: 700 }}>GitHub</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>votre-org/projai</div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
