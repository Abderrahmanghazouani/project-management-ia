"use client";
import React, { useState } from "react";
import styles from "./dashboard.module.css";

// --- TYPES ---
type ProjectStatus = "ACTIF" | "EN_PAUSE" | "TERMINE";
type TicketStatus = "TO_DO" | "IN_PROGRESS" | "DONE";
type TicketType = "USER_STORY" | "TASK" | "BUG";
type RiskStatus = "IDENTIFIE" | "EN_COURS" | "MITIGE" | "CLOS";
type DeliverableStatus = "EN_ATTENTE" | "LIVRE" | "EN_RETARD";

interface Project {
  refProjet: string;
  nom: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  budgetPrevu: number;
  budgetReel: number;
  statut: ProjectStatus;
  membres: number;
  tickets: number;
  progress: number;
  colorAccent: string;
}

interface Ticket {
  refTicket: string;
  titre: string;
  type: TicketType;
  priorite: "CRITIQUE" | "HAUTE" | "MOYENNE" | "BASSE";
  statut: TicketStatus;
  storyPoints: number;
  assignee: string;
}

interface Risk {
  refRisque: string;
  description: string;
  probabilite: string;
  impact: string;
  criticite: string;
  planMitigation: string;
  responsable: string;
  statut: RiskStatus;
}

interface Deliverable {
  refLivrable: string;
  nom: string;
  datePrevue: string;
  statut: DeliverableStatus;
  icon: string;
}

interface SprintTask {
  nom: string;
  assignee: string;
  progress: number;
  startPct: number;
  widthPct: number;
  color: string;
}

interface Sprint {
  refSprint: string;
  nom: string;
  objectif: string;
  dateDebut: string;
  dateFin: string;
  capacite: number;
  statut: "A_VENIR" | "ACTIF" | "TERMINE";
  refProjet: string;
}

interface Member {
  refMembre: string;
  matriculeUser: string;
  nom: string;
  prenom: string;
  email: string;
  roleProjet: string;
  roleSysteme: string;
  refProjet: string;
  avatar: string;
}

// --- MOCK DATA ---
const PROJECTS: Project[] = [
  {
    refProjet: "PRJ-001", nom: "PLATEFORME E-COMMERCE", description: "Gestion du catalogue et paiements",
    dateDebut: "15 JAN, 2026", dateFin: "30 MAR, 2026",
    budgetPrevu: 120000, budgetReel: 95000, statut: "ACTIF",
    membres: 5, tickets: 42, progress: 75, colorAccent: "#10B981"
  },
  {
    refProjet: "PRJ-002", nom: "REFONTE APP MOBILE", description: "Nouveau design UI/UX et React Native",
    dateDebut: "01 FÉV, 2026", dateFin: "15 AVR, 2026",
    budgetPrevu: 85000, budgetReel: 42000, statut: "ACTIF",
    membres: 4, tickets: 28, progress: 45, colorAccent: "#10B981"
  },
  {
    refProjet: "PRJ-003", nom: "INTÉGRATION API IA", description: "Analyse sémantique des documents",
    dateDebut: "01 MAR, 2026", dateFin: "01 MAI, 2026",
    budgetPrevu: 45000, budgetReel: 12000, statut: "EN_PAUSE",
    membres: 3, tickets: 15, progress: 20, colorAccent: "#64748B"
  },
  {
    refProjet: "PRJ-004", nom: "PORTAIL CLIENT NEXUS", description: "Espace client sécurisé B2B",
    dateDebut: "01 NOV, 2025", dateFin: "28 FÉV, 2026",
    budgetPrevu: 95000, budgetReel: 95000, statut: "TERMINE",
    membres: 6, tickets: 56, progress: 100, colorAccent: "#000"
  },
  {
    refProjet: "PRJ-005", nom: "DASHBOARD ANALYTIQUE", description: "Visualisation des KPIs en temps réel",
    dateDebut: "20 JAN, 2026", dateFin: "20 AVR, 2026",
    budgetPrevu: 110000, budgetReel: 65000, statut: "ACTIF",
    membres: 4, tickets: 31, progress: 60, colorAccent: "#10B981"
  },
  {
    refProjet: "PRJ-006", nom: "AUDIT SÉCURITÉ CYBER", description: "Analyse des vulnérabilités réseau",
    dateDebut: "15 FÉV, 2026", dateFin: "15 MAI, 2026",
    budgetPrevu: 65000, budgetReel: 8000, statut: "EN_PAUSE",
    membres: 2, tickets: 12, progress: 10, colorAccent: "#EF4444"
  },
];

const TICKETS: Ticket[] = [
  {
    refTicket: "TK-001", titre: "Auth JWT Backend", type: "USER_STORY", priorite: "CRITIQUE",
    statut: "DONE", storyPoints: 5, assignee: "Y.A"
  },
  {
    refTicket: "TK-002", titre: "Dashboard UI Design", type: "USER_STORY", priorite: "HAUTE",
    statut: "IN_PROGRESS", storyPoints: 8, assignee: "L.B"
  },
  {
    refTicket: "TK-003", titre: "Docker Compose setup", type: "TASK", priorite: "MOYENNE",
    statut: "TO_DO", storyPoints: 3, assignee: "S.E"
  },
  {
    refTicket: "TK-004", titre: "Fix Bug CSS Sidebar", type: "BUG", priorite: "CRITIQUE",
    statut: "TO_DO", storyPoints: 2, assignee: "A.G"
  },
];

const RISKS: Risk[] = [
  { refRisque: "RSK-001", description: "Indisponibilité API Gemini", probabilite: "Haut", impact: "Critique", criticite: "Élevée", planMitigation: "Utilisation de GPT-4 comme backup", responsable: "Y.A", statut: "EN_COURS" },
  { refRisque: "RSK-002", description: "Dépassement planning", probabilite: "Moyen", impact: "Haut", criticite: "Moyenne", planMitigation: "Réallocation des ressources S2", responsable: "S.E", statut: "IDENTIFIE" },
  { refRisque: "RSK-003", description: "Réponses IA incorrectes JSON", probabilite: "Moyen", impact: "Moyen", criticite: "Moyenne", planMitigation: "Validation par schéma Zod", responsable: "L.B", statut: "MITIGE" },
];

const DELIVERABLES: Deliverable[] = [
  { refLivrable: "LIV-001", nom: "Rapport tests JUnit S1", datePrevue: "2025-02-15", statut: "LIVRE", icon: "📋" },
  { refLivrable: "LIV-002", nom: "Swagger API Documentation", datePrevue: "2025-03-01", statut: "EN_ATTENTE", icon: "📖" },
  { refLivrable: "LIV-003", nom: "Docker Compose Final", datePrevue: "2025-01-30", statut: "EN_RETARD", icon: "🐳" },
  { refLivrable: "LIV-004", nom: "Slides Soutenance PDF", datePrevue: "2025-05-25", statut: "EN_ATTENTE", icon: "📊" },
];

const SPRINT_TASKS: SprintTask[] = [
  { nom: "Auth JWT", assignee: "Y.A", progress: 100, startPct: 2, widthPct: 30, color: "var(--green)" },
  { nom: "Board Kanban UI", assignee: "A.G", progress: 62, startPct: 20, widthPct: 45, color: "var(--purple)" },
  { nom: "Gemini API", assignee: "S.E", progress: 48, startPct: 35, widthPct: 40, color: "var(--accent-amber)" },
  { nom: "Docker Compose", assignee: "S.E", progress: 85, startPct: 5, widthPct: 55, color: "#6B7280" },
];

const MEMBERS: Member[] = [
  { refMembre: "MBR-001", matriculeUser: "MAT-001", nom: "Ait", prenom: "Yassine", email: "yassine@projai.com", roleProjet: "Architecte / Lead Dev", roleSysteme: "ADMIN", refProjet: "PRJ-001", avatar: "https://i.pravatar.cc/150?u=yassine" },
  { refMembre: "MBR-002", matriculeUser: "MAT-002", nom: "Ghazouani", prenom: "Abderrahman", email: "abder@projai.com", roleProjet: "Product Owner", roleSysteme: "USER", refProjet: "PRJ-001", avatar: "https://i.pravatar.cc/150?u=abder" },
  { refMembre: "MBR-003", matriculeUser: "MAT-003", nom: "El", prenom: "Soufiane", email: "soufiane@projai.com", roleProjet: "Fullstack Dev", roleSysteme: "USER", refProjet: "PRJ-001", avatar: "https://i.pravatar.cc/150?u=soufiane" },
  { refMembre: "MBR-004", matriculeUser: "MAT-004", nom: "Bennani", prenom: "Leila", email: "leila@projai.com", roleProjet: "UX/UI Designer", roleSysteme: "USER", refProjet: "PRJ-001", avatar: "https://i.pravatar.cc/150?u=leila" },
];

const IA_ESTIMATION = {
  refEstimation: "EST-2026-001",
  totalJours: 45,
  complexite: "Haute",
  risques: ["Dépendance API tierce", "Performance DB", "Sécurité des données"],
  statut: "EN_ATTENTE",
  message: "Estimation générée par ProjAI Intelligence v2.5",
  manuel: false,
  tasks: [
    { refTacheIa: "T-01", titre: "Architecture Backend", joursEstimes: 12 },
    { refTacheIa: "T-02", titre: "Intégration Frontend", joursEstimes: 15 },
    { refTacheIa: "T-03", titre: "Pipeline CI/CD", joursEstimes: 8 },
    { refTacheIa: "T-04", titre: "Tests & QA", joursEstimes: 10 },
  ]
};

// --- SVGs ---
const SvgGrid = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const SvgFolder = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;
const SvgLightning = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const SvgStats = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
const SvgUsers = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>;
const SvgList = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const SvgKanban = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>;
const SvgCalendar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const SvgShield = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const SvgSettings = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const SvgBell = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const SvgSearch = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const SvgChevronRight = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

// --- HELPERS ---
function getRiskCritColor(criticite: string) {
  if (criticite === "Élevée" || criticite === "Critique") return { bg: "rgba(239,68,68,.1)", color: "var(--accent-rose)" };
  if (criticite === "Moyenne" || criticite === "Haute") return { bg: "rgba(245,158,11,.1)", color: "#92400E" };
  if (criticite === "Faible") return { bg: "var(--green-pale)", color: "var(--green)" };
  return { bg: "var(--gray-100)", color: "var(--gray-500)" };
}

function getStatutBadgeClass(statut: string) {
  const s = statut.toUpperCase();
  if (s === "ACTIF" || s === "LIVRE" || s === "DONE") return styles.badgeGreen;
  if (s === "EN_PAUSE" || s === "EN_ATTENTE" || s === "TO_DO" || s === "A_VENIR") return styles.badgeGray;
  if (s === "TERMINE") return styles.badgeBlue;
  if (s === "EN_RETARD" || s === "BUG") return styles.badgeRed;
  if (s === "IN_PROGRESS") return styles.badgePurple;
  if (s === "USER_STORY") return styles.badgeBlue;
  if (s === "TASK") return styles.badgeGray;
  return styles.badgeGray;
}

function getPrioriteBadgeClass(prio: string) {
  const p = prio.toUpperCase();
  if (p === "CRITIQUE") return styles.badgeRed;
  if (p === "HAUTE") return styles.badgeAmber;
  if (p === "MOYENNE") return styles.badgeBlue;
  if (p === "BASSE") return styles.badgeGray;
  return styles.badgeGray;
}

function getTypeBadgeClass(type: string) {
  const t = type.toUpperCase();
  if (t === "USER_STORY") return styles.badgeBlue;
  if (t === "BUG") return styles.badgeRed;
  return styles.badgeGray;
}

// --- COMPONENTS ---

const DashboardTab = ({ handleRunAI, aiState, setActiveTab, onOpenModal }: any) => (
  <>
    <div className={styles.strategicHero}>
      <div className={styles.heroText}>
        <div className={styles.dateText}>Jeudi, 07 Mai 2026</div>
        <div className={styles.greetingText}>
          Bon retour, Yassine <span className={styles.dotGreen}></span>
        </div>
      </div>
      <button className={styles.blackBtn} onClick={onOpenModal}>
        <span>+</span> Nouveau Projet
      </button>
    </div>

    <div className={styles.strategicGrid}>
      <div className={styles.aiCardLarge}>
        <div className={styles.aiCardHeader}>
          <div className={styles.aiCardTitle}>
            <SvgLightning /> Intelligence Artificielle
          </div>
          <div className={styles.aiBadge}>GEMINI 1.5 PRO</div>
        </div>
        <div className={styles.aiContent}>
          <div className={styles.aiBigText}>Analyse de CDC prête pour import.</div>
          <p className={styles.aiSubText}>
            Importez votre cahier des charges. L'IA générera automatiquement le backlog technique et estimera les charges.
          </p>
        </div>
        <button className={styles.aiActionBtnLarge} onClick={handleRunAI}>
          {aiState === "running" ? "Analyse en cours..." : "Analyser maintenant"}
        </button>
      </div>

      <div className={styles.stratCard}>
        <div className={styles.stratCardHeader}>
          <div className={styles.stratCardTitle}><SvgGrid /> Accès Rapide</div>
        </div>
        <div className={styles.quickLinks}>
          <button className={styles.quickLink} onClick={() => setActiveTab("projects")}>Projets Récents <span>↗</span></button>
          <button className={styles.quickLink} onClick={() => setActiveTab("kanban")}>Voir Kanban <span>↗</span></button>
          <button className={styles.quickLink} onClick={() => setActiveTab("sprints")}>Sprint Plan <span>↗</span></button>
        </div>
      </div>

      <div className={styles.stratCard}>
        <div className={styles.stratCardHeader}>
          <div className={styles.stratCardTitle}><SvgUsers /> Équipe</div>
          <div className={styles.stratBadge}>4 Actifs</div>
        </div>
        <div className={styles.teamList}>
          {MEMBERS.slice(0, 3).map(m => (
            <div key={m.refMembre} className={styles.teamItem}>
              <div className={styles.teamAvatar}><img src={m.avatar} alt={`${m.prenom} ${m.nom}`} /></div>
              <div className={styles.teamName}>{m.prenom} {m.nom.charAt(0)}.</div>
            </div>
          ))}
        </div>
        <a href="#" className={styles.manageLink}>Gérer les accès →</a>
      </div>

      <div className={`${styles.stratCard} ${styles.progressCard}`}>
        <div className={styles.stratCardHeader}>
          <div className={styles.stratCardTitle}><SvgStats /> Sprint Progrès</div>
        </div>
        <div className={styles.progressInfo}>
          <div className={styles.progressLabel}>Tickets Terminés</div>
          <div className={styles.progressValue}>28 / 45</div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarFill} style={{ width: '62%' }}></div>
          </div>
          <div className={styles.estimatedDate}>Délai estimé: 12 Mai 2026</div>
          <div className={styles.statGrid}>
            <div className={styles.statBox}>
              <div className={styles.statBoxLabel}>Bloqué</div>
              <div className={`${styles.statBoxValue} ${styles.textRed}`}>02</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statBoxLabel}>En Test</div>
              <div className={`${styles.statBoxValue} ${styles.textBlue}`}>05</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statBoxLabel}>Points</div>
              <div className={styles.statBoxValue}>112</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const ProjectsTab = ({ onOpenModal }: any) => (
  <div className={styles.tabContent}>
    <div className={styles.projectPageHeader}>
      <div className={styles.projectTitleGroup}>
        <h1 className={styles.vortexaTitle}>PROJETS <span>VORTEXA</span></h1>
        <p className={styles.vortexaSubtitle}>GESTION ET SUIVI DU PORTEFEUILLE TECHNIQUE</p>
      </div>
      <button className={styles.blackBtn} onClick={onOpenModal}>+ NOUVEAU PROJET</button>
    </div>

    <div className={styles.projectControls}>
      <div className={styles.projectSearch}>
        <SvgSearch />
        <input type="text" placeholder="RECHERCHER UN PROJET..." />
      </div>
      <button className={styles.filterBtn}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        FILTRER
      </button>
    </div>

    <div className={styles.projectTableCard}>
      <div className={styles.projectTableHeader}>
        <span>NOM DU PROJET</span>
        <span>STATUT</span>
        <span>BUDGET</span>
        <span>DÉBUT</span>
        <span>FIN PRÉVUE</span>
        <span>PROGRESSION</span>
        <span></span>
      </div>

      <div className={styles.projectTableBody}>
        {PROJECTS.map(p => {
          let statusClass = styles.statusEnCours;
          let statusText = "EN COURS";
          let dotColor = "#10B981";

          if (p.statut === "TERMINE") {
            statusClass = styles.statusTermine;
            statusText = "TERMINÉ";
            dotColor = "#000";
          } else if (p.statut === "EN_PAUSE" && p.progress < 20) {
            statusClass = styles.statusPause;
            statusText = "EN PAUSE";
            dotColor = "#EF4444";
          } else if (p.statut === "EN_PAUSE") {
            statusClass = styles.statusPlanif;
            statusText = "PLANIFICATION";
            dotColor = "#3B82F6";
          }

          return (
            <div key={p.refProjet} className={styles.projectTableRow}>
              <div className={styles.projectNameCell}>
                <div className={styles.statusDot} style={{ background: dotColor }}></div>
                {p.nom}
              </div>
              <div>
                <span className={`${styles.projectStatBadge} ${statusClass}`}>{statusText}</span>
              </div>
              <div className={styles.cellData}>{p.budgetPrevu.toLocaleString()} DH</div>
              <div className={styles.cellDate}>{p.dateDebut}</div>
              <div className={styles.cellDate}>{p.dateFin}</div>
              <div className={styles.progressCell}>
                <div className={styles.progressTrackFull}>
                  <div className={styles.progressFillFull} style={{ width: `${p.progress}%`, background: dotColor === "#000" ? "#10B981" : dotColor }}></div>
                </div>
                <span className={styles.pctText}>{p.progress}%</span>
              </div>
              <div>
                <button className={styles.ellipsisBtn}>•••</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const KanbanTab = ({ tickets }: { tickets: Ticket[] }) => {
  const columns: { id: TicketStatus; title: string; color: string }[] = [
    { id: "TO_DO", title: "À FAIRE", color: "#64748B" },
    { id: "IN_PROGRESS", title: "EN COURS", color: "var(--purple)" },
    { id: "DONE", title: "TERMINÉ", color: "var(--green)" }
  ];

  const getTicketsByStatus = (status: TicketStatus) => {
    return tickets.filter(t => t.statut === status);
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.projectPageHeader}>
        <div className={styles.projectTitleGroup}>
          <h1 className={styles.vortexaTitle}>TABLEAU <span>KANBAN</span></h1>
          <p className={styles.vortexaSubtitle}>FLUX DE TRAVAIL ET GESTION DES TÂCHES</p>
        </div>
        <button className={styles.blackBtn}>+ NOUVELLE TÂCHE</button>
      </div>

      <div className={styles.kanbanBoardFull}>
        {columns.map(col => (
          <div key={col.id} className={styles.kanbanColFull}>
            <div className={styles.colHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }}></div>
                <h3 className={styles.colTitle}>{col.title}</h3>
              </div>
              <span className={styles.colCount}>{getTicketsByStatus(col.id).length}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {getTicketsByStatus(col.id).map(ticket => (
                <div key={ticket.refTicket} className={styles.projectTableCard} style={{ padding: '16px', borderRadius: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', color: '#999', fontWeight: 800 }}>{ticket.refTicket}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span className={`${styles.projectStatBadge} ${getTypeBadgeClass(ticket.type)}`} style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '9px' }}>{ticket.type}</span>
                      <span className={`${styles.projectStatBadge} ${getPrioriteBadgeClass(ticket.priorite)}`} style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '9px' }}>{ticket.priorite}</span>
                    </div>
                  </div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, marginBottom: '12px' }}>{ticket.titre}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div className={styles.dotGreen} style={{ width: '6px', height: '6px' }}></div>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#666' }}>{ticket.assignee}</span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 800, background: 'var(--gray-100)', padding: '2px 8px', borderRadius: '6px' }}>{ticket.storyPoints} SP</span>
                  </div>
                </div>
              ))}
              <button style={{ width: '100%', padding: '12px', borderRadius: '16px', border: '2px dashed #eee', background: 'transparent', color: '#999', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}>
                + AJOUTER
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TeamTab = () => (
  <div className={styles.tabContent}>
    <div className={styles.projectPageHeader}>
      <div className={styles.projectTitleGroup}>
        <h1 className={styles.vortexaTitle}>ÉQUIPE <span>PROJEXIA</span></h1>
        <p className={styles.vortexaSubtitle}>COLLABORATEURS ET RÔLES DU PROJET</p>
      </div>
      <button className={styles.blackBtn}>+ INVITER</button>
    </div>

    <div className={styles.teamGridFull}>
      {MEMBERS.map(m => (
        <div key={m.refMembre} className={styles.teamCardFull}>
          <div className={styles.teamAvatarLarge}>
            <img src={m.avatar} alt={`${m.prenom} ${m.nom}`} />
          </div>
          <h3 className={styles.teamNameLarge}>{m.prenom} {m.nom}</h3>
          <p className={styles.teamRoleLarge}>{m.roleProjet}</p>
          <div style={{ fontSize: '10px', color: '#999', fontWeight: 800, marginTop: '4px' }}>{m.matriculeUser} • {m.roleSysteme}</div>
          <p className={styles.teamEmail}>{m.email}</p>
          <button className={styles.viewProfileBtn}>VOIR PROFIL</button>
        </div>
      ))}
    </div>
  </div>
);

const BacklogTab = ({ tickets }: { tickets: Ticket[] }) => (
  <div className={styles.tabContent}>
    <div className={styles.projectPageHeader}>
      <div className={styles.projectTitleGroup}>
        <h1 className={styles.vortexaTitle}>BACKLOG <span>PRODUIT</span></h1>
        <p className={styles.vortexaSubtitle}>LISTE PRIORISÉE DES USER STORIES ET TÂCHES</p>
      </div>
      <button className={styles.blackBtn}>+ AJOUTER ITEM</button>
    </div>

    <div className={styles.projectTableCard}>
      <div className={styles.projectTableHeader} style={{ gridTemplateColumns: '120px 1fr 120px 120px 120px 40px' }}>
        <span>RÉFÉRENCE</span>
        <span>TITRE</span>
        <span>TYPE</span>
        <span>PRIORITÉ</span>
        <span>ESTIMATION</span>
        <span></span>
      </div>
      {tickets.map(t => (
        <div key={t.refTicket} className={styles.projectTableRow} style={{ gridTemplateColumns: '120px 1fr 120px 120px 120px 40px' }}>
          <div className={styles.cellData} style={{ color: '#999' }}>{t.refTicket}</div>
          <div className={styles.projectNameCell}>{t.titre}</div>
          <div>
            <span className={`${styles.projectStatBadge} ${getTypeBadgeClass(t.type)}`}>{t.type}</span>
          </div>
          <div>
            <span className={`${styles.projectStatBadge} ${getPrioriteBadgeClass(t.priorite)}`}>{t.priorite}</span>
          </div>
          <div className={styles.cellData}>{t.storyPoints} SP</div>
          <button className={styles.ellipsisBtn}>•••</button>
        </div>
      ))}
    </div>
  </div>
);

const RisksTab = () => (
  <div className={styles.tabContent}>
    <div className={styles.projectPageHeader}>
      <div className={styles.projectTitleGroup}>
        <h1 className={styles.vortexaTitle}>REGISTRE DES <span>RISQUES</span></h1>
        <p className={styles.vortexaSubtitle}>IDENTIFICATION ET MITIGATION DES MENACES TECHNIQUES</p>
      </div>
      <button className={styles.blackBtn}>+ NOUVEAU RISQUE</button>
    </div>

    <div className={styles.projectTableCard}>
      <div className={styles.projectTableHeader} style={{ gridTemplateColumns: '100px 1fr 100px 100px 120px 1fr 100px 120px 40px' }}>
        <span>RÉF</span>
        <span>DESCRIPTION</span>
        <span>PROBA</span>
        <span>IMPACT</span>
        <span>CRITICITÉ</span>
        <span>PLAN DE MITIGATION</span>
        <span>RESP.</span>
        <span>STATUT</span>
        <span></span>
      </div>
      <div className={styles.projectTableBody}>
        {RISKS.map(r => (
          <div key={r.refRisque} className={styles.projectTableRow} style={{ gridTemplateColumns: '100px 1fr 100px 100px 120px 1fr 100px 120px 40px' }}>
            <div className={styles.cellData} style={{ color: '#999' }}>{r.refRisque}</div>
            <div className={styles.projectNameCell}>{r.description}</div>
            <div className={styles.cellData}>{r.probabilite}</div>
            <div className={styles.cellData}>{r.impact}</div>
            <div>
              <span className={styles.projectStatBadge} style={{
                background: getRiskCritColor(r.criticite).bg,
                color: getRiskCritColor(r.criticite).color,
                fontWeight: 800
              }}>
                {r.criticite}
              </span>
            </div>
            <div className={styles.cellData} style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
              {r.planMitigation}
            </div>
            <div className={styles.cellData} style={{ fontWeight: 800 }}>{r.responsable}</div>
            <div>
              <span className={`${styles.projectStatBadge} ${getStatutBadgeClass(r.statut)}`}>
                {r.statut}
              </span>
            </div>
            <button className={styles.ellipsisBtn}>•••</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const IAEstimationTab = () => (
  <div className={styles.tabContent}>
    {IA_ESTIMATION.manuel && (
      <div className={styles.warningBanner} style={{ marginBottom: '24px', background: '#FFF7ED', border: '1px solid #FFEDD5', color: '#9A3412', padding: '12px 20px', borderRadius: '12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '18px' }}>⚠️</span>
        <div>
          <strong>Mode Manuel Activé :</strong> L'analyse automatique Gemini est actuellement indisponible. Cette estimation a été générée via le moteur de secours ProjAI.
        </div>
      </div>
    )}

    <div className={styles.projectPageHeader}>
      <div className={styles.projectTitleGroup}>
        <h1 className={styles.vortexaTitle}>ESTIMATION <span>PRÉDICTIVE</span></h1>
        <p className={styles.vortexaSubtitle}>{IA_ESTIMATION.message.toUpperCase()}</p>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button className={styles.cancelBtn} style={{ background: 'rgba(239, 68, 68, 0.08)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: 800 }}>REJETER</button>
        <button className={styles.blackBtn} style={{ background: 'var(--green)', boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)' }}>APPROUVER L'ESTIMATION</button>
      </div>
    </div>

    <div className={styles.aiMainGrid}>
      <div className={styles.aiSidebar}>
        <div className={styles.aiInfoCard} style={{ border: 'none', background: '#09090B', color: '#fff', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div className={styles.dotGreen}></div>
            <h4 className={styles.aiInfoTitle} style={{ color: '#fff', margin: 0, fontSize: '13px' }}>Indicateurs Clés</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className={styles.statBox}>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Charge Totale</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--green-light)' }}>{IA_ESTIMATION.totalJours} <span style={{ fontSize: '12px', opacity: 0.6 }}>J/H</span></div>
            </div>

            <div className={styles.statBox}>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Complexité</div>
              <div style={{ color: IA_ESTIMATION.complexite === 'Haute' ? 'var(--accent-rose)' : 'var(--accent-amber)', fontWeight: 800, fontSize: '16px' }}>{IA_ESTIMATION.complexite.toUpperCase()}</div>
            </div>

            <div className={styles.riskZone}>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>Points de vigilance</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {IA_ESTIMATION.risques.map((r, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#eee', padding: '10px', borderRadius: '12px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--accent-rose)' }}>●</span> {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.projectTableCard} style={{ borderRadius: '24px' }}>
        <div className={styles.projectTableHeader} style={{ gridTemplateColumns: '100px 1fr 150px' }}>
          <span>ID TASK</span>
          <span>LOT DE TRAVAIL SUGGÉRÉ</span>
          <span>ESTIMATION</span>
        </div>
        <div className={styles.projectTableBody}>
          {IA_ESTIMATION.tasks.map(t => (
            <div key={t.refTacheIa} className={styles.projectTableRow} style={{ gridTemplateColumns: '100px 1fr 150px', padding: '16px 20px' }}>
              <div className={styles.cellData} style={{ color: '#999', fontFamily: 'var(--font-mono)' }}>{t.refTacheIa}</div>
              <div className={styles.projectNameCell} style={{ fontSize: '13px' }}>{t.titre}</div>
              <div style={{ fontWeight: 800, color: 'var(--green)', textAlign: 'right', paddingRight: '20px' }}>{t.joursEstimes} Jours</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SettingsTab = () => (
  <div className={styles.tabContent}>
    <div className={styles.projectPageHeader}>
      <div className={styles.projectTitleGroup}>
        <h1 className={styles.vortexaTitle}>PARAMÈTRES <span>GÉNAUX</span></h1>
        <p className={styles.vortexaSubtitle}>CONFIGURATION DU PROFIL ET DU PROJET TECHNIQUE</p>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div className={styles.projectTableCard} style={{ padding: '32px' }}>
        <h3 style={{ marginBottom: '24px', fontWeight: 800, fontSize: '14px', letterSpacing: '0.05em' }}>MON PROFIL</h3>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Prénom & Nom</label>
          <input type="text" className={styles.formInput} defaultValue="Yassine Ait" />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Matricule</label>
            <input type="text" className={styles.formInput} defaultValue="MAT-001" disabled />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Rôle Système</label>
            <input type="text" className={styles.formInput} defaultValue="ADMIN" disabled />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email Professionnel</label>
          <input type="email" className={styles.formInput} defaultValue="y.ait@emsi.ma" />
        </div>
        <button className={styles.blackBtn} style={{ marginTop: '12px' }}>METTRE À JOUR LE PROFIL</button>
      </div>

      <div className={styles.projectTableCard} style={{ padding: '32px' }}>
        <h3 style={{ marginBottom: '24px', fontWeight: 800, fontSize: '14px', letterSpacing: '0.05em' }}>CONFIGURATION PROJET</h3>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nom du Projet Actif</label>
          <input type="text" className={styles.formInput} defaultValue="PLATEFORME E-COMMERCE" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Budget Prévu (DH)</label>
          <input type="number" className={styles.formInput} defaultValue="120000" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Langue du Dashboard</label>
          <select className={styles.formInput}>
            <option>Français (FR)</option>
            <option>English (US)</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Options d'IA</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <input type="checkbox" defaultChecked />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#666' }}>Activer l'auto-estimation après upload CDC</span>
          </div>
        </div>
        <button className={styles.blackBtn} style={{ marginTop: '12px', background: 'var(--green)' }}>ENREGISTRER LES MODIFICATIONS</button>
      </div>
    </div>

    <div className={styles.projectTableCard} style={{ marginTop: '24px', padding: '24px', border: '1px solid #FEE2E2', background: '#FFFDFD' }}>
      <h3 style={{ color: '#EF4444', marginBottom: '12px', fontWeight: 800, fontSize: '12px' }}>ZONE DE DANGER</h3>
      <p style={{ fontSize: '11px', color: '#666', marginBottom: '16px' }}>La suppression d'un projet est irréversible. Toutes les données associées (tickets, sprints, IA) seront perdues.</p>
      <button className={styles.cancelBtn} style={{ background: '#EF4444', color: '#fff', border: 'none', padding: '10px 20px' }}>SUPPRIMER LE PROJET DÉFINITIVEMENT</button>
    </div>
  </div>
);

const SprintsTab = () => {
  const SPRINTS: Sprint[] = [
    { refSprint: "SPR-01", nom: "Sprint 1: Fondation", objectif: "Initialisation API et Auth", dateDebut: "2026-01-01", dateFin: "2026-01-14", capacite: 40, statut: "TERMINE", refProjet: "PRJ-001" },
    { refSprint: "SPR-02", nom: "Sprint 2: Dashboard", objectif: "UI Stratégique et KPIs", dateDebut: "2026-01-15", dateFin: "2026-01-28", capacite: 35, statut: "ACTIF", refProjet: "PRJ-001" },
    { refSprint: "SPR-03", nom: "Sprint 3: IA Engine", objectif: "Intégration Gemini 1.5", dateDebut: "2026-02-01", dateFin: "2026-02-14", capacite: 45, statut: "A_VENIR", refProjet: "PRJ-001" },
  ];

  return (
    <div className={styles.tabContent}>
      <div className={styles.projectPageHeader}>
        <div className={styles.projectTitleGroup}>
          <h1 className={styles.vortexaTitle}>PLANNING DES <span>SPRINTS</span></h1>
          <p className={styles.vortexaSubtitle}>GANTT ET TIMELINE DE RÉALISATION TECHNIQUE</p>
        </div>
        <button className={styles.blackBtn}>+ CRÉER SPRINT</button>
      </div>

      <div className={styles.projectTableCard}>
        <div className={styles.projectTableHeader} style={{ gridTemplateColumns: '100px 1fr 200px 150px 100px 120px 40px' }}>
          <span>RÉF</span>
          <span>NOM DU SPRINT</span>
          <span>OBJECTIF</span>
          <span>PÉRIODE</span>
          <span>CAPACITÉ</span>
          <span>STATUT</span>
          <span></span>
        </div>
        <div className={styles.projectTableBody}>
          {SPRINTS.map(s => (
            <div key={s.refSprint} className={styles.projectTableRow} style={{ gridTemplateColumns: '100px 1fr 200px 150px 100px 120px 40px' }}>
              <div className={styles.cellData} style={{ color: '#999' }}>{s.refSprint}</div>
              <div className={styles.projectNameCell}>{s.nom}</div>
              <div className={styles.cellData} style={{ fontSize: '11px', color: '#666' }}>{s.objectif}</div>
              <div className={styles.cellDate} style={{ fontSize: '11px' }}>
                {s.dateDebut} <span style={{ color: '#ccc' }}>→</span> {s.dateFin}
              </div>
              <div className={styles.cellData} style={{ fontWeight: 800 }}>{s.capacite} SP</div>
              <div>
                <span className={`${styles.projectStatBadge} ${getStatutBadgeClass(s.statut)}`}>
                  {s.statut}
                </span>
              </div>
              <button className={styles.ellipsisBtn}>•••</button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.projectTableCard} style={{ marginTop: '24px', padding: '32px' }}>
        <h3 style={{ marginBottom: '20px', fontWeight: 800 }}>VUE CHRONOLOGIQUE</h3>
        <div className={styles.sprintGanttContainer}>
          <div className={styles.ganttHeader}>
            <div className={styles.ganttSpacer}></div>
            <div className={styles.ganttWeeks}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.ganttWeekLabel}>W{i + 1}</div>
              ))}
            </div>
          </div>
          <div className={styles.ganttBody}>
            {SPRINTS.map((s, idx) => (
              <div key={s.refSprint} className={styles.ganttRow}>
                <div className={styles.ganttSprintName}>{s.refSprint}</div>
                <div className={styles.ganttTrack}>
                  <div
                    className={styles.ganttBar}
                    style={{
                      left: `${idx * 15}%`,
                      width: '25%',
                      background: s.statut === 'ACTIF' ? 'var(--green)' : s.statut === 'TERMINE' ? 'var(--gray-900)' : '#f0f0f0',
                      color: s.statut === 'TERMINE' ? '#fff' : '#000'
                    }}
                  >
                    {s.nom}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AITab = ({ handleRunAI, aiState }: any) => {
  const [toggle, setToggle] = useState("pdf");
  const [refProjet, setRefProjet] = useState("");
  const [matriculeClient, setMatriculeClient] = useState("CLI-001");

  return (
    <div className={styles.tabContent}>
      <div className={styles.aiPageWrapper}>
        <div className={styles.aiPageHeader}>
          <div className={styles.aiTitleGroup}>
            <div className={styles.aiMainTitle}>
              <SvgLightning /> Analyse de Cahier des Charges
            </div>
            <div className={styles.aiMainSubtitle}>Transformez vos idées brutes en structure de projet technique</div>
          </div>
          <div className={styles.aiToggleRow}>
            <button
              className={`${styles.aiToggleBtn} ${toggle === "pdf" ? styles.aiToggleBtnActive : ""}`}
              onClick={() => setToggle("pdf")}
            >
              Fichier PDF
            </button>
            <button
              className={`${styles.aiToggleBtn} ${toggle === "text" ? styles.aiToggleBtnActive : ""}`}
              onClick={() => setToggle("text")}
            >
              Texte Libre
            </button>
          </div>
        </div>

        {/* Champs requis par le Backend (CDCRequest) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: '#fff', padding: '20px', borderRadius: '24px', border: '1px solid #f0f0f0' }}>
          <div className={styles.formGroup} style={{ marginBottom: 0 }}>
            <label className={styles.formLabel}>Associer à un projet</label>
            <select
              className={styles.formInput}
              value={refProjet}
              onChange={(e) => setRefProjet(e.target.value)}
              required
            >
              <option value="">Choisir un projet...</option>
              {PROJECTS.map(p => (
                <option key={p.refProjet} value={p.refProjet}>{p.nom}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup} style={{ marginBottom: 0 }}>
            <label className={styles.formLabel}>Matricule Client</label>
            <input
              type="text"
              className={styles.formInput}
              value={matriculeClient}
              onChange={(e) => setMatriculeClient(e.target.value)}
              placeholder="Ex: CLI-001"
              required
            />
          </div>
        </div>

        <div className={styles.aiMainGrid}>
          {toggle === "pdf" ? (
            <div className={styles.uploadBox}>
              <div className={styles.uploadIconBox}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              </div>
              <h3 className={styles.uploadTitle}>Déposez votre document PDF</h3>
              <p className={styles.uploadDesc}>
                Glissez-déposez votre cahier des charges ou cliquez pour parcourir vos fichiers (Max 10MB)
              </p>
              <button className={styles.selectFileBtn}>Sélectionner un fichier</button>
            </div>
          ) : (
            <div className={styles.uploadBox} style={{ borderStyle: 'solid', padding: '32px', textAlign: 'left', display: 'block' }}>
              <h3 className={styles.uploadTitle} style={{ marginBottom: '16px' }}>Saisie libre du CDC</h3>
              <textarea
                className={styles.formInput}
                placeholder="Rédigez ou collez ici le contenu de votre cahier des charges pour analyse..."
                style={{ width: '100%', height: '240px', background: '#fafafa', resize: 'none' }}
              ></textarea>
            </div>
          )}

          <div className={styles.aiSidebar}>
            <div className={styles.aiTipCard}>
              <h4 className={styles.aiTipTitle}>
                <SvgShield /> Conseils d'optimisation
              </h4>
              <div className={styles.aiTipList}>
                <div className={styles.aiTipItem}>
                  <SvgLightning /> Soyez précis sur les rôles utilisateurs
                </div>
                <div className={styles.aiTipItem}>
                  <SvgLightning /> Détaillez les intégrations tierces
                </div>
                <div className={styles.aiTipItem}>
                  <SvgLightning /> Spécifiez les contraintes de sécurité
                </div>
                <div className={styles.aiTipItem}>
                  <SvgLightning /> Listez les plateformes cibles (Web, iOS...)
                </div>
              </div>
            </div>

            <div className={styles.aiInfoCard}>
              <h4 className={styles.aiInfoTitle}>Analyse Automatisée</h4>
              <p className={styles.aiInfoDesc}>
                Notre algorithme identifie les User Stories, les entités de données et suggère une stack technologique adaptée.
              </p>
              <div className={styles.aiBadgeActive}>
                <span className={styles.dotGreen}></span> INTELLIGENCE V.2.5 ACTIVE
              </div>
            </div>
          </div>
        </div>

        <button className={styles.launchExtractionBtn} onClick={handleRunAI} disabled={aiState === "running"}>
          <SvgLightning /> {aiState === "running" ? "Extraction en cours..." : "LANCER L'EXTRACTION IA"} <SvgSearch />
        </button>
      </div>
    </div>
  );
};

const CreateProjectModal = ({ isOpen, onClose, onSubmit }: any) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeModalBtn} onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Nouveau Projet</h2>
          <p className={styles.modalSubtitle}>Initialiser un nouveau portefeuille technique</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nom du projet</label>
              <input type="text" className={styles.formInput} placeholder="Ex: Plateforme E-Commerce" required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Matricule Créateur</label>
              <input type="text" className={styles.formInput} placeholder="Ex: MAT-001" required />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <input type="text" className={styles.formInput} placeholder="Description brève du projet..." />
          </div>
          <div className={styles.formRow} style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date de début</label>
              <input type="date" className={styles.formInput} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date de fin prévue</label>
              <input type="date" className={styles.formInput} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Budget (DH)</label>
              <input type="number" className={styles.formInput} placeholder="0" required />
            </div>
          </div>
          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Annuler</button>
            <button type="submit" className={styles.submitBtn}>Créer le projet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(TICKETS);
  const [aiState, setAiState] = useState<"idle" | "running" | "done">("idle");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleRunAI = () => {
    setAiState("running");
    setTimeout(() => {
      setAiState("done");
    }, 2800);
  };

  const handleCreateProject = () => {
    // Logique de création (simulation pour le moment)
    alert("Projet créé avec succès !");
    setShowCreateModal(false);
  };

  const renderContent = () => {
    const openModal = () => setShowCreateModal(true);
    switch (activeTab) {
      case "dashboard": return <DashboardTab handleRunAI={handleRunAI} aiState={aiState} setActiveTab={setActiveTab} onOpenModal={openModal} />;
      case "projects": return <ProjectsTab onOpenModal={openModal} />;
      case "kanban": return <KanbanTab tickets={tickets} />;
      case "team": return <TeamTab />;
      case "backlog": return <BacklogTab tickets={tickets} />;
      case "sprints": return <SprintsTab />;
      case "risks": return <RisksTab />;
      case "stats": return <IAEstimationTab />;
      case "settings": return <SettingsTab />;
      case "ai": return <AITab handleRunAI={handleRunAI} aiState={aiState} />;
      default: return <DashboardTab handleRunAI={handleRunAI} aiState={aiState} setActiveTab={setActiveTab} onOpenModal={openModal} />;
    }
  };

  return (
    <div className={styles.dashboardRoot}>
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProject}
      />
      <div className={styles.bgGrid}></div>
      <div className={styles.bgGlow}></div>

      <div className={styles.floatingNavWrapper}>
        {(hoveredTab || activeTab) && (
          <div className={styles.navLabel}>
            {hoveredTab || activeTab}
          </div>
        )}
        <nav className={styles.floatingNav}>
          {[
            { id: "dashboard", icon: <SvgGrid /> },
            { id: "projects", icon: <SvgFolder /> },
            { id: "ai", icon: <SvgLightning />, label: "ai assistant" },
            { id: "stats", icon: <SvgStats />, label: "Estimations IA" },
            { id: "team", icon: <SvgUsers /> },
            { id: "backlog", icon: <SvgList /> },
            { id: "kanban", icon: <SvgKanban /> },
            { id: "sprints", icon: <SvgCalendar /> },
            { id: "risks", icon: <SvgShield /> },
            { id: "settings", icon: <SvgSettings /> },
          ].map(item => (
            <button
              key={item.id}
              className={`${styles.floatNavBtn} ${activeTab === item.id ? styles.floatNavBtnActive : ""}`}
              onClick={() => setActiveTab(item.id)}
              onMouseEnter={() => setHoveredTab(item.label || item.id)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {item.icon}
            </button>
          ))}
        </nav>
      </div>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumb}>
            <span>Pages</span>
            <SvgChevronRight />
            <span>
              {activeTab === "ai" ? "Analyse IA" :
                activeTab === "projects" ? "Projets" :
                  activeTab === "stats" ? "Estimations IA" :
                    activeTab === "dashboard" ? "Aperçu Stratégique" :
                      activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className={styles.cloudSyncBadge}>
              <div className={styles.dotGreen} style={{ width: '6px', height: '6px' }}></div>
              LIVE CLOUD SYNC
            </div>

            <button className={styles.iconBtn} style={{ border: 'none', background: 'transparent', width: 'auto', height: 'auto', padding: '0' }}>
              <SvgBell />
              <div className={styles.notifDot} style={{ top: '0', right: '0' }}></div>
            </button>

            <div className={styles.userIdentity}>
              <div className={styles.userTextInfo}>
                <div className={styles.userName}>Yassine</div>
                <div className={styles.userRole}>CHEF DE PROJET</div>
              </div>
              <div className={styles.userAvatar}>
                <img src="https://i.pravatar.cc/100?u=yassine" alt="User" />
              </div>
            </div>
          </div>
        </header>

        {renderContent()}

      </main>
    </div>
  );
}
