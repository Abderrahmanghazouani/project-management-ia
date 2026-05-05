"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { Footer, CTASection } from "../components/CTAAndFooter";

const modulesData = [
  { id: "M1", sprint: "S1", priority: "Haute", icon: "🔐", title: "Authentification & Rôles", desc: "Gestion sécurisée des accès et des permissions utilisateurs.", features: ["JWT 24h", "BCrypt 10 rounds", "RBAC", "4 rôles", "Interface admin"] },
  { id: "M2", sprint: "S1", priority: "Haute", icon: "📁", title: "Gestion des Projets", desc: "Centralisation de tous vos projets avec suivi d'état en temps réel.", features: ["CRUD complet", "Statuts Dynamiques", "Filtres avancés", "Validation backend"] },
  { id: "M3", sprint: "S2", priority: "Haute", icon: "🤖", title: "Assistant IA (Gemini)", desc: "Intelligence artificielle pour la génération automatique de backlogs.", features: ["API Gemini 1.5", "Génération JSON", "Estimation durées", "Versionnage estimations"] },
  { id: "M4", sprint: "S2", priority: "Haute", icon: "👥", title: "Gestion d'Équipe", desc: "Optimisation de la collaboration et de la répartition des tâches.", features: ["Ajout membres", "Rôles projet", "Distribution auto", "Ajustement manuel"] },
  { id: "M5", sprint: "S2", priority: "Haute", icon: "📋", title: "Backlog & Tickets", desc: "Organisation granulaire des besoins fonctionnels et techniques.", features: ["Types diversifiés", "Priorisation", "Assignation", "Points d'effort"] },
  { id: "M6", sprint: "S2", priority: "Haute", icon: "📊", title: "Board Kanban", desc: "Visualisation fluide du workflow de développement.", features: ["Drag & Drop", "Filtres visuels", "Statuts temps réel", "Indicateurs priorité"] },
  { id: "M7", sprint: "S3", priority: "Moyenne", icon: "🗓️", title: "Sprints & Planning", desc: "Planification itérative pour un respect rigoureux des délais.", features: ["Création sprint", "Affectation tickets", "Board sprint", "Suivi avancement"] },
  { id: "M8", sprint: "S3", priority: "Moyenne", icon: "⚖️", title: "Ressources & Allocation", desc: "Équilibrage de la charge de travail entre les membres.", features: ["Charge par membre", "Compteur In Progress", "Rôles spécifiques", "Optimisation flux"] },
  { id: "M9", sprint: "S3", priority: "Moyenne", icon: "💰", title: "Suivi des Coûts", desc: "Contrôle budgétaire précis pour chaque phase du projet.", features: ["Budget prévu/réel", "Écart automatique", "Graphiques évolution", "Alertes dépassement"] },
  { id: "M10", sprint: "S3", priority: "Moyenne", icon: "📦", title: "Livrables", desc: "Gestion des sorties et validation des jalons critiques.", features: ["Gestion fichiers", "Suivi statut", "Dates limites", "Historique versions"] },
  { id: "M11", sprint: "S4", priority: "Moyenne", icon: "⚠️", title: "Registre des Risques", desc: "Identification et mitigation proactive des menaces projet.", features: ["Calcul criticité", "Plan mitigation", "Codes couleur", "Suivi dynamique"] },
  { id: "M12", sprint: "S4", priority: "Basse", icon: "⚙️", title: "Administration", desc: "Outils de configuration globale pour les super-utilisateurs.", features: ["Logs audit", "Paramètres système", "Modif rôles globaux", "Maintenance DB"] },
];

export default function ModulesPage() {
  const [filter, setFilter] = useState("Tous");

  const filteredModules = filter === "Tous" 
    ? modulesData 
    : modulesData.filter(m => m.priority === filter);

  const stats = {
    total: modulesData.length,
    haute: modulesData.filter(m => m.priority === "Haute").length,
    moyenne: modulesData.filter(m => m.priority === "Moyenne").length,
    basse: modulesData.filter(m => m.priority === "Basse").length,
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
          <span>Fonctionnalités complètes</span>
          <span className="pill-green">12 modules</span>
        </div>
        <h1 className="hero-title">Tous les modules pour une gestion de projet Agile réussie</h1>
        
        <div className="filters">
          {["Tous", "Haute", "Moyenne", "Basse"].map((f) => (
            <button 
              key={f} 
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f} {f === "Tous" ? `(${stats.total})` : f === "Haute" ? `(${stats.haute})` : f === "Moyenne" ? `(${stats.moyenne})` : `(${stats.basse})`}
            </button>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Modules totaux</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" style={{ color: "#EF4444" }}>{stats.haute}</span>
          <span className="stat-label">Haute priorité</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" style={{ color: "#F59E0B" }}>{stats.moyenne}</span>
          <span className="stat-label">Moyenne priorité</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" style={{ color: "var(--green)" }}>{stats.basse}</span>
          <span className="stat-label">Basse priorité</span>
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
                <span className={`badge badge-priority-${module.priority.toLowerCase()}`}>{module.priority}</span>
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
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 60 }}>Chronologie de déploiement</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sprint</th>
                <th>Période</th>
                <th>Modules</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { s: "S1", p: "Semaine 1–2", m: "M1, M2", d: "Setup initial, Authentification et gestion de base des projets." },
                { s: "S2", p: "Semaine 3–4", m: "M3, M4, M5, M6", d: "Cœur intelligent : IA Gemini, Équipe, Backlog et Kanban." },
                { s: "S3", p: "Semaine 5–6", m: "M7, M8, M9, M10", d: "Gestion opérationnelle : Sprints, Ressources, Coûts et Livrables." },
                { s: "S4", p: "Semaine 7–8", m: "M11, M12", d: "Finalisation : Registre des risques, Administration et Tests." }
              ].map((row, i) => (
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
