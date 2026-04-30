'use client';
import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageToggle() {
  const { locale, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'var(--gray-100)',
        border: '1px solid var(--gray-200)',
        borderRadius: '8px',
        padding: '6px 12px',
        fontSize: '13px',
        fontWeight: '600',
        fontFamily: 'var(--font-mono)',
        color: 'var(--gray-700)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        letterSpacing: '0.5px',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--green)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--green)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gray-200)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--gray-700)';
      }}
    >
      <span style={{ fontSize: '15px' }}>{locale === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
      <span>{locale === 'fr' ? 'FR' : 'EN'}</span>
      <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>|</span>
      <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>
        {locale === 'fr' ? 'EN' : 'FR'}
      </span>
    </button>
  );
}
