"use client";
import { useState, useEffect } from "react";
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--gray-100);
          box-shadow: 0 1px 12px rgba(0,0,0,0.05);
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 20px;
          color: var(--black);
          letter-spacing: -0.3px;
        }
        .nav-logo-mark {
          width: 32px; height: 32px;
          background: var(--black);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: var(--white);
          font-size: 16px;
          font-family: var(--font-mono);
          font-weight: 500;
          flex-shrink: 0;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
        }
        .nav-links a {
          font-size: 14px;
          font-weight: 500;
          color: var(--gray-600);
          padding: 6px 14px;
          border-radius: var(--radius-sm);
          transition: all 0.15s;
        }
        .nav-links a:hover {
          color: var(--black);
          background: var(--gray-100);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .btn-nav-ghost {
          font-size: 14px;
          font-weight: 500;
          color: var(--gray-700);
          background: none;
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-sm);
          padding: 7px 18px;
          transition: all 0.15s;
        }
        .btn-nav-ghost:hover {
          border-color: var(--gray-400);
          color: var(--black);
        }
        .btn-nav-primary {
          font-size: 14px;
          font-weight: 600;
          color: var(--white);
          background: var(--black);
          border: none;
          border-radius: var(--radius-sm);
          padding: 8px 18px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-nav-primary:hover {
          background: var(--gray-800);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--green-light);
          animation: pulse-green 2s infinite;
          flex-shrink: 0;
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* Logo */}
        <a href="/" className="nav-logo">
          <div className="nav-logo-mark">P</div>
          Proj<em>AI</em>
        </a>

        {/* Links */}
        <ul className="nav-links">
          {[t.nav.features, t.nav.workflow, t.nav.modules, t.nav.docs].map(link => (
            <li key={link}>
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--gray-500)", marginRight: "8px" }}>
            <div className="status-dot" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{t.nav.status}</span>
          </div>
          <LanguageToggle />
          <button className="btn-nav-ghost">{t.nav.login}</button>
          <button className="btn-nav-primary">
            {t.nav.start}
          </button>
        </div>
      </nav>
    </>
  );
}