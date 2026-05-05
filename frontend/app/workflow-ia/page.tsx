"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { Footer, CTASection } from "../components/CTAAndFooter";

export default function WorkflowIAPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main>
      <Navbar solid />
      
      <style>{`
        .hero {
          padding: 160px 24px 100px;
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
        }

        .hero-subtitle {
          color: var(--muted-foreground);
          font-size: 20px;
          max-width: 600px;
          margin-bottom: 40px;
          animation: fadeUp 0.6s ease 0.2s forwards;
          opacity: 0;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          animation: fadeUp 0.6s ease 0.3s forwards;
          opacity: 0;
        }

        .btn-primary {
          background: var(--foreground);
          color: var(--white);
          padding: 16px 32px;
          border-radius: var(--radius-lg);
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          background: var(--gray-800);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .btn-secondary {
          background: var(--white);
          color: var(--foreground);
          border: 1px solid var(--border);
          padding: 16px 32px;
          border-radius: var(--radius-lg);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background: var(--gray-50);
          border-color: var(--gray-300);
        }

        /* Timeline Section */
        .section-timeline {
          padding: 100px 24px;
          background: var(--gray-50);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .timeline-container {
          max-width: 800px;
          width: 100%;
          position: relative;
          padding-left: 40px;
        }

        .timeline-line {
          position: absolute;
          left: 19px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--green);
          opacity: 0.2;
        }

        .timeline-step {
          position: relative;
          margin-bottom: 60px;
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
        }

        .timeline-dot {
          position: absolute;
          left: -30px;
          top: 0;
          width: 20px;
          height: 20px;
          background: var(--white);
          border: 4px solid var(--green);
          border-radius: 50%;
          z-index: 2;
        }

        .step-number {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--green);
          margin-bottom: 8px;
          display: block;
        }

        .step-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--foreground);
        }

        .step-content {
          background: var(--white);
          padding: 24px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
        }

        /* Flow Diagram */
        .section-flow {
          padding: 100px 24px;
          background: var(--white);
          text-align: center;
        }

        .flow-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 60px;
        }

        .flow-node {
          background: var(--white);
          border: 1px solid var(--border);
          padding: 24px;
          border-radius: var(--radius-lg);
          width: 200px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
        }

        .flow-node.highlight {
          background: var(--green);
          color: var(--white);
          border-color: var(--green);
          box-shadow: 0 0 30px rgba(22, 163, 74, 0.3);
        }

        .flow-node.highlight .node-subtitle {
          color: rgba(255,255,255,0.8);
        }

        .node-icon {
          font-size: 32px;
          margin-bottom: 12px;
          display: block;
        }

        .node-title {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .node-subtitle {
          font-size: 13px;
          color: var(--muted-foreground);
        }

        .flow-arrow {
          color: var(--border);
          font-size: 24px;
        }

        /* JSON Block */
        .json-block {
          background: var(--gray-900);
          border-radius: var(--radius-xl);
          padding: 24px;
          max-width: 600px;
          margin: 60px auto;
          text-align: left;
          box-shadow: var(--shadow-xl);
          font-family: var(--font-mono);
          position: relative;
        }

        .mac-toolbar {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .dot { width: 12px; height: 12px; border-radius: 50%; }

        .json-content {
          color: var(--white);
          font-size: 14px;
          line-height: 1.6;
        }

        .json-key { color: #93C5FD; }
        .json-string { color: #86EFAC; }
        .json-number { color: #FCA5A5; }

        /* Advantages Grid */
        .section-advantages {
          padding: 100px 24px;
          background: var(--white);
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .adv-card {
          padding: 40px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .adv-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--green);
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: left;
        }

        .adv-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }

        .adv-card:hover::before {
          transform: scaleX(1);
        }

        .adv-icon {
          font-size: 32px;
          margin-bottom: 20px;
          display: block;
        }

        .adv-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        /* FAQ Section */
        .section-faq {
          padding: 100px 24px;
          background: var(--gray-50);
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          margin-bottom: 16px;
          overflow: hidden;
        }

        .faq-question {
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s ease;
        }

        .faq-question:hover {
          background: var(--gray-50);
        }

        .faq-icon {
          transition: transform 0.3s ease;
          color: var(--green);
        }

        .faq-item.open .faq-icon {
          transform: rotate(45deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0, 1, 0, 1);
          padding: 0 24px;
          color: var(--muted-foreground);
        }

        .faq-item.open .faq-answer {
          max-height: 500px;
          padding: 0 24px 24px;
          transition: all 0.3s cubic-bezier(1, 0, 1, 0);
        }

        @media (max-width: 768px) {
          .grid-3 { grid-template-columns: 1fr 1fr; }
          .flow-grid { flex-direction: column; }
          .flow-arrow { transform: rotate(90deg); }
        }

        @media (max-width: 480px) {
          .grid-3 { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; width: 100%; }
          .btn-primary, .btn-secondary { width: 100%; text-align: center; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="badge-pill">
          <span>Processus intelligent</span>
          <span className="pill-green">IA Gemini</span>
        </div>
        <h1 className="hero-title">Comment l'IA transforme votre CDC en backlog opérationnel</h1>
        <p className="hero-subtitle">Du texte brut à un projet structuré en moins de 30 secondes</p>
        <div className="hero-actions">
          <Link href="/auth" className="btn-primary">Essayer l'analyse →</Link>
          <button className="btn-secondary">▷ Regarder la démo</button>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-timeline">
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 60 }}>Le parcours de votre projet</h2>
        <div className="timeline-container">
          <div className="timeline-line" />
          
          {[
            { 
              num: "01", 
              title: "Dépôt du CDC", 
              desc: "Saisie de votre Cahier des Charges. Minimum 100 caractères pour une analyse optimale. Supporte le texte brut avec prévisualisation immédiate." 
            },
            { 
              num: "02", 
              title: "Analyse par Gemini AI", 
              desc: "Traitement par l'API gemini-1.5-flash. Utilisation d'un prompt structuré pour extraire tâches, durées et risques en moins de 30 secondes." 
            },
            { 
              num: "03", 
              title: "Validation Client", 
              desc: "Affichage détaillé de l'estimation : tâches, durées, complexité et risques. Vous confirmez ou rejetez pour ajuster les paramètres." 
            },
            { 
              num: "04", 
              title: "Distribution automatique", 
              desc: "Sélection des membres de l'équipe et répartition équitable basée sur la charge. Ajustement manuel possible par le manager." 
            }
          ].map((step, i) => (
            <div key={i} className="timeline-step" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="timeline-dot" />
              <span className="step-number">Step {step.num}</span>
              <h3 className="step-title">{step.title}</h3>
              <div className="step-content">
                <p style={{ color: "var(--muted-foreground)" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Flow */}
      <section className="section-flow">
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Architecture du flux</h2>
        <p style={{ color: "var(--muted-foreground)", marginBottom: 60 }}>Une chaîne de valeur automatisée de bout en bout</p>
        
        <div className="flow-grid">
          <div className="flow-node">
            <span className="node-icon">📝</span>
            <div className="node-title">CDC</div>
            <div className="node-subtitle">Formulaire</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node highlight">
            <span className="node-icon">🤖</span>
            <div className="node-title">Gemini AI</div>
            <div className="node-subtitle">Analyse IA</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <span className="node-icon">📄</span>
            <div className="node-title">JSON</div>
            <div className="node-subtitle">Tâches/Durées</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <span className="node-icon">✅</span>
            <div className="node-title">Validation</div>
            <div className="node-subtitle">Client confirme</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <span className="node-icon">📋</span>
            <div className="node-title">Backlog</div>
            <div className="node-subtitle">Tickets créés</div>
          </div>
        </div>

        {/* JSON Block */}
        <div className="json-block">
          <div className="mac-toolbar">
            <div className="dot" style={{ background: "#FF5F56" }} />
            <div className="dot" style={{ background: "#FFBD2E" }} />
            <div className="dot" style={{ background: "#27C93F" }} />
          </div>
          <pre className="json-content">
            <code>
              {"{"}
              <br />
              &nbsp;&nbsp;<span className="json-key">"tasks"</span>: [
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"{"} <span className="json-key">"title"</span>: <span className="json-string">"Setup Auth"</span>, <span className="json-key">"estimated_days"</span>: <span className="json-number">2</span> {"}"},
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"{"} <span className="json-key">"title"</span>: <span className="json-string">"DB Schema"</span>, <span className="json-key">"estimated_days"</span>: <span className="json-number">3</span> {"}"},
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"{"} <span className="json-key">"title"</span>: <span className="json-string">"AI Integration"</span>, <span className="json-key">"estimated_days"</span>: <span className="json-number">5</span> {"}"},
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"{"} <span className="json-key">"title"</span>: <span className="json-string">"UI Components"</span>, <span className="json-key">"estimated_days"</span>: <span className="json-number">4</span> {"}"}
              <br />
              &nbsp;&nbsp;],
              <br />
              &nbsp;&nbsp;<span className="json-key">"total_days"</span>: <span className="json-number">14</span>,
              <br />
              &nbsp;&nbsp;<span className="json-key">"complexity"</span>: <span className="json-string">"Moyenne"</span>,
              <br />
              &nbsp;&nbsp;<span className="json-key">"risks"</span>: [<span className="json-string">"API Latency"</span>, <span className="json-string">"Data Consistency"</span>]
              <br />
              {"}"}
            </code>
          </pre>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-advantages">
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 60 }}>Avantages de l'approche IA</h2>
        <div className="grid-3">
          {[
            { icon: "⚡", title: "Gain de temps", desc: "Passez de plusieurs jours de planification à quelques secondes." },
            { icon: "🎯", title: "Précision", desc: "L'IA identifie des dépendances souvent oubliées par l'humain." },
            { icon: "🔍", title: "Anticipation", desc: "Détection proactive des risques techniques et fonctionnels." },
            { icon: "🔄", title: "Flexibilité", desc: "Ré-analysez votre projet instantanément après chaque modification." },
            { icon: "📐", title: "Standardisation", desc: "Format de backlog cohérent pour tous vos projets." },
            { icon: "📈", title: "Évolutivité", desc: "Gérez des dizaines de projets simultanément sans surcharge." }
          ].map((adv, i) => (
            <div key={i} className="adv-card">
              <span className="adv-icon">{adv.icon}</span>
              <h3 className="adv-title">{adv.title}</h3>
              <p style={{ color: "var(--muted-foreground)", fontSize: 14 }}>{adv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-faq">
        <div className="faq-container">
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 60 }}>Questions fréquentes</h2>
          
          {[
            { q: "Que faire si l'API Gemini est indisponible ?", a: "Un mode dégradé permet la saisie manuelle des tâches en attendant le rétablissement du service." },
            { q: "Puis-je modifier l'estimation ?", a: "Oui, après l'analyse IA, vous avez la main pour ajuster chaque durée et titre de tâche." },
            { q: "L'IA apprend-elle ?", a: "Nos modèles sont affinés pour ProJAI mais ne conservent pas vos données privées pour l'entraînement global." },
            { q: "Limite de taille du CDC ?", a: "Nous acceptons jusqu'à 50 000 caractères pour une analyse exhaustive." },
            { q: "Les données sont-elles stockées ?", a: "Seules les versions validées sont stockées en base de données pour votre suivi projet." }
          ].map((item, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(i)}>
                {item.q}
                <span className="faq-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
              </div>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
