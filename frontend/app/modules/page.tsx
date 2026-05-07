"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { Footer, CTASection } from "../components/CTAAndFooter";
import { useLanguage } from "../i18n/LanguageContext";

export default function ModulesPage() {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState("Tous");

  const modulesData = t.modulesPage.modules;

  const filteredModules = filter === "Tous" 
    ? modulesData 
    : modulesData.filter(m => m.priority === filter || (filter === "Haute" && m.priority === "High") || (filter === "Moyenne" && m.priority === "Medium") || (filter === "Basse" && m.priority === "Low"));

  const stats = {
    total: modulesData.length,
    haute: modulesData.filter(m => m.priority === "Haute" || m.priority === "High").length,
    moyenne: modulesData.filter(m => m.priority === "Moyenne" || m.priority === "Medium").length,
    basse: modulesData.filter(m => m.priority === "Basse" || m.priority === "Low").length,
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
          margin-bottom: 40px;
          animation: fadeUp 0.6s ease 0.1s forwards;
          opacity: 0;
          position: relative;
          z-index: 1;
        }

        /* Filter Pills */
        .filters {
          display: flex;
          gap: 12px;
          margin-bottom: 40px;
          animation: fadeUp 0.6s ease 0.2s forwards;
          opacity: 0;
          position: relative;
          z-index: 1;
        }

        .filter-btn {
          padding: 10px 24px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s ease;
          cursor: pointer;
          border: 1px solid var(--border);
          background: var(--white);
          color: var(--muted-foreground);
        }

        .filter-btn.active {
          background: var(--foreground);
          color: var(--white);
          border-color: var(--foreground);
          box-shadow: var(--shadow-md);
        }

        /* Stats Bar */
        .stats-bar {
          background: var(--gray-50);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 40px 24px;
          display: flex;
          justify-content: center;
          gap: 80px;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 40px;
          font-weight: 800;
          color: var(--green);
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--muted-foreground);
        }

        /* Modules Grid */
        .section-modules {
          padding: 80px 24px;
          background: var(--white);
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .module-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 32px;
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
        }

        .module-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--green-muted);
        }

        .module-id {
          position: absolute;
          top: 32px;
          right: 32px;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          color: var(--gray-400);
        }

        .module-icon-box {
          width: 56px;
          height: 56px;
          background: var(--green-pale);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 24px;
        }

        .badge-group {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .badge {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge-priority-haute { background: #FEE2E2; color: #EF4444; }
        .badge-priority-moyenne { background: #FFEDD5; color: #F59E0B; }
        .badge-priority-basse { background: #DCFCE7; color: #16A34A; }
        .badge-sprint { background: var(--gray-100); color: var(--gray-600); }

        .module-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--foreground);
        }

        .module-desc {
          font-size: 14px;
          color: var(--muted-foreground);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: auto;
        }

        .feature-item {
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--gray-700);
        }

        .feature-item::before {
          content: '•';
          color: var(--green);
          font-weight: 800;
        }

        /* Sprint Recap Table */
        .section-table {
          padding: 100px 24px;
          background: var(--gray-50);
        }

        .table-container {
          max-width: 1000px;
          margin: 0 auto;
          background: var(--white);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        th {
          background: var(--gray-50);
          padding: 20px 24px;
          font-size: 13px;
          font-weight: 700;
          color: var(--gray-500);
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid var(--border);
        }

        td {
          padding: 24px;
          border-bottom: 1px solid var(--border-light);
          font-size: 15px;
        }

        .sprint-badge {
          background: var(--green-pale);
          color: var(--green);
          font-weight: 700;
          padding: 6px 12px;
          border-radius: var(--radius-md);
          font-size: 13px;
        }

        .module-pill {
          font-family: var(--font-mono);
          background: var(--green-pale);
          color: var(--green);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .modules-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .modules-grid { grid-template-columns: 1fr; }
          .stats-bar { gap: 40px; }
          .hero-title { font-size: 40px; }
        }

        @media (max-width: 480px) {
          .stats-bar { flex-direction: column; gap: 32px; }
          .table-container { overflow-x: auto; }
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
          <span>{t.modulesPage.badge}</span>
          <span className="pill-green">{t.modulesPage.badgeCount}</span>
        </div>
        <h1 className="hero-title">{t.modulesPage.heroTitle}</h1>
        
        <div className="filters">
          {[
            { key: "Tous", label: t.modulesPage.filters.all, count: stats.total },
            { key: "Haute", label: t.modulesPage.filters.high, count: stats.haute },
            { key: "Moyenne", label: t.modulesPage.filters.medium, count: stats.moyenne },
            { key: "Basse", label: t.modulesPage.filters.low, count: stats.basse }
          ].map((f) => (
            <button 
              key={f.key} 
              className={`filter-btn ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">{t.modulesPage.stats.total}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" style={{ color: "#EF4444" }}>{stats.haute}</span>
          <span className="stat-label">{t.modulesPage.stats.high}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" style={{ color: "#F59E0B" }}>{stats.moyenne}</span>
          <span className="stat-label">{t.modulesPage.stats.medium}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" style={{ color: "var(--green)" }}>{stats.basse}</span>
          <span className="stat-label">{t.modulesPage.stats.low}</span>
        </div>
      </div>

      {/* Modules Grid */}
      <section className="section-modules">
        <div className="modules-grid">
          {filteredModules.map((module, i) => (
            <div 
              key={module.id} 
              className="module-card" 
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="module-id">{module.id}</span>
              <div className="module-icon-box">{module.icon}</div>
              <div className="badge-group">
                <span className={`badge badge-priority-${module.priority.toLowerCase() === 'haute' || module.priority.toLowerCase() === 'high' ? 'haute' : module.priority.toLowerCase() === 'moyenne' || module.priority.toLowerCase() === 'medium' ? 'moyenne' : 'basse'}`}>
                  {module.priority}
                </span>
                <span className="badge badge-sprint">Sprint {module.sprint}</span>
              </div>
              <h3 className="module-title">{module.title}</h3>
              <p className="module-desc">{module.desc}</p>
              <ul className="feature-list">
                {module.features.map((feature, j) => (
                  <li key={j} className="feature-item">{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Sprint Recap Table */}
      <section className="section-table">
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 60 }}>{t.modulesPage.tableTitle}</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{t.modulesPage.tableHeaders.sprint}</th>
                <th>{t.modulesPage.tableHeaders.period}</th>
                <th>{t.modulesPage.tableHeaders.modules}</th>
                <th>{t.modulesPage.tableHeaders.desc}</th>
              </tr>
            </thead>
            <tbody>
              {t.modulesPage.tableRows.map((row, i) => (
                <tr key={i}>
                  <td><span className="sprint-badge">{row.s}</span></td>
                  <td style={{ color: "var(--muted-foreground)", fontWeight: 500 }}>{row.p}</td>
                  <td>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {row.m.split(', ').map(mod => <span key={mod} className="module-pill">{mod}</span>)}
                    </div>
                  </td>
                  <td style={{ fontSize: 14, color: "var(--gray-600)" }}>{row.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
