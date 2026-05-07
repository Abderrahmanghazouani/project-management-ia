"use client";
import { useLanguage } from "../i18n/LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <>
      <style>{`
        /* ... existing styles ... */
        .testimonials-section {
          padding: 120px 24px;
          background: var(--background);
        }
        
        .testimonials-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .testimonials-header {
          text-align: center;
          margin-bottom: 72px;
        }
        
        .testimonials-eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 16px;
        }
        
        .testimonials-title {
          font-family: var(--font-sans);
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          letter-spacing: -1.5px;
          line-height: 1.1;
          color: var(--foreground);
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        
        .testimonial-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 36px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .testimonial-card:hover {
          border-color: var(--primary-muted);
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }
        
        .testimonial-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
        }
        
        .star {
          color: var(--accent-amber);
          font-size: 16px;
        }
        
        .testimonial-quote {
          font-size: 16px;
          line-height: 1.7;
          color: var(--foreground);
          flex: 1;
          margin-bottom: 28px;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 24px;
          border-top: 1px solid var(--border-light);
        }
        
        .author-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--primary-pale), var(--primary-muted));
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: var(--primary);
          flex-shrink: 0;
        }
        
        .author-info {
          flex: 1;
        }
        
        .author-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--foreground);
        }
        
        .author-role {
          font-size: 13px;
          color: var(--muted-foreground);
          margin-top: 2px;
        }
        
        .author-company {
          font-weight: 500;
        }
        
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: 1fr; max-width: 500px; margin: 0 auto; }
        }
      `}</style>

      <section className="testimonials-section">
        <div className="testimonials-inner">
          <div className="testimonials-header">
            <div className="testimonials-eyebrow">{t.testimonials.eyebrow}</div>
            <h2 className="testimonials-title text-balance">
              {t.testimonials.title}
            </h2>
          </div>

          <div className="testimonials-grid">
            {t.testimonials.list.map((testi, i) => (
              <div 
                key={i} 
                className="testimonial-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="star">&#9733;</span>
                  ))}
                </div>
                <p className="testimonial-quote">&ldquo;{testi.quote}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testi.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testi.author}</div>
                    <div className="author-role">
                      {testi.role} <span className="author-company">@ {testi.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}