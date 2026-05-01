"use client";
import { useLanguage } from '../i18n/LanguageContext';

export default function HeroCTA() {
    const { t } = useLanguage();

    return (
        <>
            <style>{`
        .hero-cta {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 160px 24px 100px;
          background: var(--foreground);
        }
        
        /* Animated grid background */
        .hero-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 100% 80% at 50% 0%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 100% 80% at 50% 0%, black 40%, transparent 100%);
        }
        
        /* Green glow effects */
        .hero-glow-1 {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 600px;
          background: radial-gradient(ellipse at center, rgba(34, 197, 94, 0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        
        .hero-glow-2 {
          position: absolute;
          bottom: -100px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(22, 163, 74, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .hero-content {
          max-width: 1100px;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        
        .hero-badge-wrap {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-full);
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 500;
          color: var(--gray-400);
          animation: fadeUp 0.6s ease forwards;
        }
        
        .hero-badge.primary {
          background: rgba(34, 197, 94, 0.15);
          border-color: rgba(34, 197, 94, 0.3);
          color: var(--green-light);
        }
        
        .badge-dot {
          width: 8px;
          height: 8px;
          background: var(--green-light);
          border-radius: 50%;
          animation: pulse-green 2s ease-in-out infinite;
        }
        
        .hero-cta-title {
          font-family: var(--font-sans);
          font-size: clamp(52px, 10vw, 96px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -4px;
          color: #FFFFFF;
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease 0.1s forwards;
          opacity: 0;
        }
        
        .hero-cta-title .highlight {
          background: linear-gradient(135deg, var(--green) 0%, var(--green-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-subtitle {
          font-size: clamp(18px, 2.5vw, 22px);
          color: var(--gray-400);
          line-height: 1.7;
          max-width: 700px;
          margin: 0 auto 56px;
          font-weight: 400;
          animation: fadeUp 0.6s ease 0.2s forwards;
          opacity: 0;
        }
        
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 80px;
          animation: fadeUp 0.6s ease 0.3s forwards;
          opacity: 0;
        }
        
        .btn-hero-primary {
          background: var(--green);
          color: var(--white);
          border: none;
          border-radius: var(--radius-lg);
          padding: 20px 40px;
          font-size: 17px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.3);
        }
        
        .btn-hero-primary:hover {
          background: var(--green-light);
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(34, 197, 94, 0.4);
        }
        
        .btn-hero-secondary {
          background: rgba(255,255,255,0.05);
          color: var(--white);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--radius-lg);
          padding: 20px 40px;
          font-size: 17px;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .btn-hero-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.25);
        }
        
        /* Stats row */
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 64px;
          flex-wrap: wrap;
          animation: fadeUp 0.6s ease 0.4s forwards;
          opacity: 0;
        }
        
        .hero-stat {
          text-align: center;
        }
        
        .hero-stat-value {
          font-size: 48px;
          font-weight: 800;
          color: var(--white);
          letter-spacing: -2px;
          line-height: 1;
          font-family: var(--font-sans);
        }
        
        .hero-stat-value span {
          color: var(--green-light);
        }
        
        .hero-stat-label {
          font-size: 14px;
          color: var(--gray-500);
          margin-top: 8px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        /* Floating cards */
        .floating-cards {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .float-card {
          position: absolute;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-xl);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: float 8s ease-in-out infinite;
          backdrop-filter: blur(10px);
        }
        
        .float-card.card-1 {
          top: 20%;
          left: 5%;
          animation-delay: 0s;
        }
        
        .float-card.card-2 {
          top: 30%;
          right: 5%;
          animation-delay: 2s;
        }
        
        .float-card.card-3 {
          bottom: 25%;
          left: 8%;
          animation-delay: 4s;
        }
        
        .float-card.card-4 {
          bottom: 20%;
          right: 8%;
          animation-delay: 1s;
        }
        
        .float-icon {
          width: 40px;
          height: 40px;
          background: var(--green);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .float-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--white);
        }
        
        .float-sub {
          font-size: 11px;
          color: var(--gray-500);
        }
        
        @media (max-width: 900px) {
          .hero-stats { gap: 40px; }
          .floating-cards { display: none; }
        }
        
        @media (max-width: 600px) {
          .hero-cta { padding: 140px 20px 80px; }
          .hero-title { letter-spacing: -2px; }
          .hero-stats { gap: 32px; }
          .hero-stat-value { font-size: 36px; }
        }
      `}</style>

            <section className="hero-cta">
                <div className="hero-glow-1" />
                <div className="hero-glow-2" />

                <div className="floating-cards">
                    <div className="float-card card-1">
                        <div className="float-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div>
                            <div className="float-text">Gemini AI</div>
                            <div className="float-sub">Analyse CDC</div>
                        </div>
                    </div>

                    <div className="float-card card-2">
                        <div className="float-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                            </svg>
                        </div>
                        <div>
                            <div className="float-text">Kanban</div>
                            <div className="float-sub">Board temps reel</div>
                        </div>
                    </div>

                    <div className="float-card card-3">
                        <div className="float-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <div>
                            <div className="float-text">Equipe</div>
                            <div className="float-sub">Distribution auto</div>
                        </div>
                    </div>

                    <div className="float-card card-4">
                        <div className="float-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                            </svg>
                        </div>
                        <div>
                            <div className="float-text">Suivi</div>
                            <div className="float-sub">Couts et risques</div>
                        </div>
                    </div>
                </div>

                <div className="hero-content">
                    <div className="hero-badge-wrap">
                        <div className="hero-badge primary">
                            <span className="badge-dot" />
                            <span>IA operationnelle</span>
                        </div>
                        <div className="hero-badge">EMSI 2025-2026</div>
                    </div>

                    <h1 className="hero-cta-title text-balance">
                        Gestion de projets<br />
                        <span className="highlight">intelligente</span>
                    </h1>

                    <p className="hero-subtitle text-pretty">
                        Une plateforme Agile complete propulsee par Gemini AI. Du cahier des charges au board Kanban,
                        automatisez l&apos;analyse, la planification et la distribution des taches.
                    </p>

                    <div className="hero-actions">
                        <button className="btn-hero-primary">
                            Demarrer gratuitement
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button className="btn-hero-secondary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5,3 19,12 5,21" />
                            </svg>
                            Voir la demo
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-value">12<span>+</span></div>
                            <div className="hero-stat-label">Modules</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value"><span>&lt;</span>30s</div>
                            <div className="hero-stat-label">Analyse IA</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">4</div>
                            <div className="hero-stat-label">Roles</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">1</div>
                            <div className="hero-stat-label">Commande</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}