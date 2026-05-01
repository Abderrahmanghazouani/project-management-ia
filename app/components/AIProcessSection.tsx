"use client";

export default function AIProcessSection() {
  return (
    <>
      <style>{`
        .ai-process-section {
          padding: 140px 24px;
          background: var(--foreground);
          position: relative;
          overflow: hidden;
        }
        
        /* Grid pattern */
        .ai-process-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        
        /* Glow */
        .ai-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1000px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        
        .ai-process-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        
        .ai-process-header {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .ai-process-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green-light);
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: var(--radius-full);
          padding: 10px 24px;
          margin-bottom: 28px;
        }
        
        .gemini-icon {
          width: 18px;
          height: 18px;
        }
        
        .ai-process-title {
          font-family: var(--font-sans);
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 700;
          letter-spacing: -2px;
          line-height: 1.1;
          color: var(--white);
          margin-bottom: 20px;
        }
        
        .ai-process-title .highlight {
          color: var(--green-light);
        }
        
        .ai-process-desc {
          font-size: 18px;
          color: var(--gray-400);
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.7;
        }
        
        /* Process flow */
        .process-flow {
          display: flex;
          align-items: stretch;
          gap: 24px;
          position: relative;
        }
        
        /* Connector line */
        .process-flow::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 80px;
          right: 80px;
          height: 2px;
          background: linear-gradient(90deg, var(--green) 0%, var(--green-light) 50%, var(--green) 100%);
          transform: translateY(-50%);
          opacity: 0.3;
          z-index: 0;
        }
        
        .process-step {
          flex: 1;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-2xl);
          padding: 36px 28px;
          text-align: center;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }
        
        .process-step:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-8px);
        }
        
        .process-step.active {
          background: rgba(34,197,94,0.08);
          border-color: rgba(34,197,94,0.3);
        }
        
        .process-step.active:hover {
          border-color: rgba(34,197,94,0.5);
        }
        
        .step-number {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          color: var(--gray-400);
          transition: all 0.3s ease;
        }
        
        .process-step:hover .step-number {
          transform: scale(1.1);
        }
        
        .process-step.active .step-number {
          background: var(--green);
          border-color: var(--green);
          color: var(--white);
          box-shadow: 0 0 30px rgba(34,197,94,0.4);
        }
        
        .step-icon {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-xl);
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: var(--gray-400);
          transition: all 0.3s ease;
        }
        
        .process-step.active .step-icon {
          background: rgba(34,197,94,0.15);
          color: var(--green-light);
        }
        
        .step-title {
          font-family: var(--font-sans);
          font-size: 20px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 12px;
          letter-spacing: -0.3px;
        }
        
        .step-desc {
          font-size: 14px;
          color: var(--gray-500);
          line-height: 1.7;
        }
        
        /* JSON Preview */
        .json-preview {
          margin-top: 80px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-2xl);
          overflow: hidden;
        }
        
        .json-header {
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .json-dots {
          display: flex;
          gap: 8px;
        }
        
        .json-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        
        .json-title {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--gray-500);
          margin-left: 12px;
        }
        
        .json-body {
          padding: 28px;
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.8;
          overflow-x: auto;
        }
        
        .json-key { color: #7DD3FC; }
        .json-string { color: #86EFAC; }
        .json-number { color: #FDE68A; }
        .json-bracket { color: var(--gray-500); }
        
        @media (max-width: 900px) {
          .process-flow {
            flex-direction: column;
            gap: 16px;
          }
          .process-flow::before { display: none; }
          .process-step { padding: 28px 24px; }
        }
        
        @media (max-width: 600px) {
          .ai-process-section { padding: 100px 20px; }
          .json-body { padding: 20px; font-size: 11px; }
        }
      `}</style>

      <section className="ai-process-section" id="ai-workflow">
        <div className="ai-glow" />
        
        <div className="ai-process-inner">
          <div className="ai-process-header">
            <div className="ai-process-eyebrow">
              <svg className="gemini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Module M3 - Gemini API
            </div>
            <h2 className="ai-process-title text-balance">
              Analyse <span className="highlight">intelligente</span><br />du cahier des charges
            </h2>
            <p className="ai-process-desc">
              Deposez votre CDC, Gemini analyse et genere automatiquement les taches, 
              estimations, complexite et risques en moins de 30 secondes.
            </p>
          </div>

          <div className="process-flow">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <h3 className="step-title">Depot du CDC</h3>
              <p className="step-desc">
                Le client saisit ou colle le texte de son cahier des charges dans le formulaire integre.
              </p>
            </div>

            <div className="process-step active">
              <div className="step-number">2</div>
              <div className="step-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="step-title">Analyse Gemini</h3>
              <p className="step-desc">
                L&apos;API Gemini analyse le CDC avec un prompt structure et retourne un JSON structure.
              </p>
            </div>

            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,11 12,14 22,4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <h3 className="step-title">Confirmation</h3>
              <p className="step-desc">
                Le client valide ou rejette l&apos;estimation. Si rejete, saisie manuelle possible.
              </p>
            </div>

            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="step-title">Distribution</h3>
              <p className="step-desc">
                Les taches sont automatiquement reparties entre les membres de l&apos;equipe.
              </p>
            </div>
          </div>

          <div className="json-preview">
            <div className="json-header">
              <div className="json-dots">
                <div className="json-dot" style={{ background: '#EF4444' }} />
                <div className="json-dot" style={{ background: '#F59E0B' }} />
                <div className="json-dot" style={{ background: '#22C55E' }} />
              </div>
              <span className="json-title">response.json - Format de reponse Gemini</span>
            </div>
            <div className="json-body">
              <code>
                <span className="json-bracket">{'{'}</span><br />
                &nbsp;&nbsp;<span className="json-key">&quot;tasks&quot;</span>: <span className="json-bracket">[</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-bracket">{'{'}</span> <span className="json-key">&quot;title&quot;</span>: <span className="json-string">&quot;Mise en place authentification JWT&quot;</span>, <span className="json-key">&quot;estimated_days&quot;</span>: <span className="json-number">3</span> <span className="json-bracket">{'}'}</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-bracket">{'{'}</span> <span className="json-key">&quot;title&quot;</span>: <span className="json-string">&quot;Creation module gestion projets&quot;</span>, <span className="json-key">&quot;estimated_days&quot;</span>: <span className="json-number">4</span> <span className="json-bracket">{'}'}</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-bracket">{'{'}</span> <span className="json-key">&quot;title&quot;</span>: <span className="json-string">&quot;Developpement Board Kanban&quot;</span>, <span className="json-key">&quot;estimated_days&quot;</span>: <span className="json-number">4</span> <span className="json-bracket">{'}'}</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-bracket">{'{'}</span> <span className="json-key">&quot;title&quot;</span>: <span className="json-string">&quot;Integration API Gemini&quot;</span>, <span className="json-key">&quot;estimated_days&quot;</span>: <span className="json-number">3</span> <span className="json-bracket">{'}'}</span><br />
                &nbsp;&nbsp;<span className="json-bracket">]</span>,<br />
                &nbsp;&nbsp;<span className="json-key">&quot;total_days&quot;</span>: <span className="json-number">14</span>,<br />
                &nbsp;&nbsp;<span className="json-key">&quot;complexity&quot;</span>: <span className="json-string">&quot;Moyenne&quot;</span>,<br />
                &nbsp;&nbsp;<span className="json-key">&quot;risks&quot;</span>: <span className="json-bracket">[</span><span className="json-string">&quot;Dependance API Gemini&quot;</span>, <span className="json-string">&quot;Delai serre equipe 3 personnes&quot;</span><span className="json-bracket">]</span><br />
                <span className="json-bracket">{'}'}</span>
              </code>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
