"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Default state - transparent on dark hero */
        .navbar .nav-logo,
        .navbar .nav-link,
        .navbar .btn-nav-ghost {
          color: rgba(255,255,255,0.9);
        }
        
        .navbar .nav-center {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .navbar .nav-link:hover {
          color: var(--white);
          background: rgba(255,255,255,0.1);
        }
        
        .navbar .nav-link.active {
          color: var(--white);
          background: rgba(255,255,255,0.15);
        }
        
        .navbar .status-indicator {
          background: rgba(34,197,94,0.15);
          border-color: rgba(34,197,94,0.3);
          color: var(--green-light);
        }
        
        .navbar .btn-nav-primary {
          background: var(--green);
          box-shadow: 0 4px 20px rgba(34,197,94,0.3);
        }
        
        .navbar .menu-icon,
        .navbar .menu-icon::before,
        .navbar .menu-icon::after {
          background: var(--white);
        }
        
        /* Scrolled state - white background */
        .navbar.scrolled {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          box-shadow: var(--shadow-md);
          height: 72px;
        }
        
        .navbar.scrolled .nav-logo,
        .navbar.scrolled .btn-nav-ghost {
          color: var(--foreground);
        }
        
        .navbar.scrolled .nav-center {
          background: var(--muted);
          border-color: transparent;
        }
        
        .navbar.scrolled .nav-link {
          color: var(--muted-foreground);
        }
        
        .navbar.scrolled .nav-link:hover {
          color: var(--foreground);
          background: var(--white);
          box-shadow: var(--shadow-sm);
        }
        
        .navbar.scrolled .nav-link.active {
          color: var(--foreground);
          background: var(--white);
          box-shadow: var(--shadow-sm);
        }
        
        .navbar.scrolled .status-indicator {
          background: var(--primary-pale);
          border-color: var(--primary-muted);
          color: var(--primary);
        }
        
        .navbar.scrolled .btn-nav-primary {
          background: var(--foreground);
          box-shadow: none;
        }
        
        .navbar.scrolled .btn-nav-primary:hover {
          background: var(--gray-800);
        }
        
        .navbar.scrolled .menu-icon,
        .navbar.scrolled .menu-icon::before,
        .navbar.scrolled .menu-icon::after {
          background: var(--foreground);
        }
        
        .nav-inner {
          max-width: 1320px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-sans);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
          transition: color 0.3s ease;
        }
        
        .nav-logo-mark {
          width: 40px; 
          height: 40px;
          background: linear-gradient(135deg, var(--green) 0%, var(--green-light) 100%);
          border-radius: var(--radius-lg);
          display: flex; 
          align-items: center; 
          justify-content: center;
          color: var(--white);
          font-size: 18px;
          font-family: var(--font-mono);
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(34,197,94,0.3);
        }
        
        .nav-center {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 5px;
          border-radius: var(--radius-full);
          transition: all 0.3s ease;
        }
        
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          padding: 10px 18px;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border: 1px solid;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .status-dot {
          width: 8px; 
          height: 8px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse-green 2s ease-in-out infinite;
        }
        
        .btn-nav-ghost {
          font-size: 14px;
          font-weight: 500;
          background: transparent;
          border: none;
          padding: 10px 18px;
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .btn-nav-ghost:hover {
          background: rgba(255,255,255,0.1);
        }
        
        .navbar.scrolled .btn-nav-ghost:hover {
          background: var(--muted);
        }
        
        .btn-nav-primary {
          font-size: 14px;
          font-weight: 600;
          color: var(--white);
          border: none;
          border-radius: var(--radius-lg);
          padding: 12px 24px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        
        .btn-nav-primary:hover {
          transform: translateY(-2px);
        }

        /* Mobile menu button */
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
        }
        
        .menu-icon {
          width: 24px;
          height: 2px;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .menu-icon::before,
        .menu-icon::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          transition: all 0.3s ease;
        }
        
        .menu-icon::before { top: -7px; }
        .menu-icon::after { bottom: -7px; }

        @media (max-width: 1024px) {
          .nav-center { display: none; }
          .status-indicator { display: none; }
        }
        
        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
          .menu-toggle { display: block; }
          .nav-actions > *:not(.menu-toggle) { display: none; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <div className="nav-logo-mark">P</div>
            <span>Proj<span style={{ color: 'var(--primary)' }}>AI</span></span>
          </Link>

          {/* Center Nav Links */}
          <div className="nav-center">
            {[t.nav.features, t.nav.workflow, t.nav.modules, t.nav.docs].map((link, index) => (
              <button 
                key={link} 
                className={`nav-link ${index === 0 ? 'active' : ''}`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="nav-actions">
            <div className="status-indicator">
              <div className="status-dot" />
              <span>{t.nav.status}</span>
            </div>
            <LanguageToggle />
            <Link href="/auth" className="btn-nav-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              {t.nav.login}
            </Link>
            <button className="btn-nav-primary">
              {t.nav.start}
            </button>
            <button className="menu-toggle">
              <div className="menu-icon" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}