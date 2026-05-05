"use client";
import React, { useState } from "react";
import styles from "./dashboard.module.css";

// --- TYPES ---
type ProjectStatus = "Actif" | "En pause" | "Terminé";
type TicketStatus = "ToDo" | "InProgress" | "Done";
type TicketType = "UserStory" | "Task" | "Bug";
type RiskStatus = "Identifié" | "En cours" | "Mitigé" | "Clos";
type DeliverableStatus = "En attente" | "Livré" | "En retard";

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
  priorite: "Critique" | "Haute" | "Moyenne" | "Basse";
  statut: TicketStatus;
  storyPoints: number;
  assignee: string;
}

interface Risk {
  refRisque: string;
  description: string;
  probabilite: number;
  impact: number;
  criticite: number;
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

// --- MOCK DATA ---
const PROJECTS: Project[] = [
  { refProjet:"PRJ-001", nom:"ProjAI Platform", description:"Plateforme Agile + IA Gemini",
    dateDebut:"2025-01-15", dateFin:"2025-05-30",
    budgetPrevu:45000, budgetReel:32000, statut:"Actif",
    membres:4, tickets:24, progress:68, colorAccent:"#16A34A" },
  { refProjet:"PRJ-002", nom:"E-Commerce Refonte", description:"Refonte boutique en ligne",
    dateDebut:"2025-02-01", dateFin:"2025-07-15",
    budgetPrevu:72000, budgetReel:18000, statut:"Actif",
    membres:6, tickets:41, progress:31, colorAccent:"#8B5CF6" },
  { refProjet:"PRJ-003", nom:"API Gateway v2", description:"Migration microservices",
    dateDebut:"2024-10-01", dateFin:"2025-02-28",
    budgetPrevu:28000, budgetReel:29500, statut:"Terminé",
    membres:3, tickets:18, progress:100, colorAccent:"#6B7280" },
];

const TICKETS: Ticket[] = [
  { refTicket:"TK-001", titre:"Setup Auth JWT", type:"Task", priorite:"Critique",
    statut:"Done", storyPoints:3, assignee:"Y.A" },
  { refTicket:"TK-002", titre:"Board Kanban UI", type:"UserStory", priorite:"Haute",
    statut:"InProgress", storyPoints:8, assignee:"A.G" },
  { refTicket:"TK-003", titre:"Intégration Gemini API", type:"Task", priorite:"Haute",
    statut:"InProgress", storyPoints:5, assignee:"S.E" },
  { refTicket:"TK-004", titre:"Fix login redirect bug", type:"Bug", priorite:"Critique",
    statut:"ToDo", storyPoints:2, assignee:"Y.A" },
  { refTicket:"TK-005", titre:"Module Registre Risques", type:"UserStory", priorite:"Moyenne",
    statut:"ToDo", storyPoints:5, assignee:"A.G" },
  { refTicket:"TK-006", titre:"Docker Compose setup", type:"Task", priorite:"Haute",
    statut:"Done", storyPoints:3, assignee:"S.E" },
];

const RISKS: Risk[] = [
  { refRisque:"RSK-001", description:"Indisponibilité API Gemini", probabilite:2, impact:5, criticite:10, statut:"En cours" },
  { refRisque:"RSK-002", description:"Dépassement planning", probabilite:3, impact:4, criticite:12, statut:"Identifié" },
  { refRisque:"RSK-003", description:"Réponses IA incorrectes JSON", probabilite:3, impact:3, criticite:9, statut:"Mitigé" },
  { refRisque:"RSK-004", description:"Mauvaise intégration front/back", probabilite:2, impact:3, criticite:6, statut:"Clos" },
];

const DELIVERABLES: Deliverable[] = [
  { refLivrable:"LIV-001", nom:"Rapport tests JUnit S1", datePrevue:"2025-02-15", statut:"Livré", icon:"📋" },
  { refLivrable:"LIV-002", nom:"Swagger API Documentation", datePrevue:"2025-03-01", statut:"En attente", icon:"📖" },
  { refLivrable:"LIV-003", nom:"Docker Compose Final", datePrevue:"2025-01-30", statut:"En retard", icon:"🐳" },
  { refLivrable:"LIV-004", nom:"Slides Soutenance PDF", datePrevue:"2025-05-25", statut:"En attente", icon:"📊" },
];

const SPRINT_TASKS: SprintTask[] = [
  { nom:"Auth JWT", assignee:"Y.A", progress:100, startPct:2, widthPct:30, color:"var(--green)" },
  { nom:"Board Kanban UI", assignee:"A.G", progress:62, startPct:20, widthPct:45, color:"var(--purple)" },
  { nom:"Gemini API", assignee:"S.E", progress:48, startPct:35, widthPct:40, color:"var(--accent-amber)" },
  { nom:"Docker Compose", assignee:"S.E", progress:85, startPct:5, widthPct:55, color:"#6B7280" },
];

// --- SVGs ---
const SvgGrid = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const SvgList = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const SvgKanban = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>;
const SvgSparkle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path></svg>;
const SvgUsers = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>;
const SvgClock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const SvgBell = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const SvgSearch = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const SvgBox = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;

// --- HELPERS ---
function getRiskCritColor(criticite: number) {
  if (criticite >= 10) return { bg: "rgba(239,68,68,.1)", color: "var(--accent-rose)" };
  if (criticite >= 8) return { bg: "rgba(245,158,11,.1)", color: "#92400E" };
  if (criticite >= 6) return { bg: "var(--green-pale)", color: "var(--green)" };
  return { bg: "var(--gray-100)", color: "var(--gray-500)" };
}

function getStatutBadgeClass(statut: string) {
  if (statut === "Actif" || statut === "Livré" || statut === "Done") return styles.badgeGreen;
  if (statut === "En pause" || statut === "En attente" || statut === "ToDo") return styles.badgeGray;
  if (statut === "Terminé") return styles.badgeBlue;
  if (statut === "En retard" || statut === "Bug") return styles.badgeRed;
  if (statut === "InProgress") return styles.badgePurple;
  if (statut === "UserStory") return styles.badgeBlue;
  if (statut === "Task") return styles.badgeGray;
  return styles.badgeGray;
}

function getPrioriteBadgeClass(prio: string) {
  if (prio === "Critique") return styles.badgeRed;
  if (prio === "Haute") return styles.badgeAmber;
  if (prio === "Moyenne") return styles.badgeBlue;
  return styles.badgeGray;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);
  const [kanbanTab, setKanbanTab] = useState<TicketStatus>("ToDo");
  const [tickets, setTickets] = useState<Ticket[]>(TICKETS);
  const [aiState, setAiState] = useState<"idle" | "running" | "done">("idle");
  const [exitingTicketId, setExitingTicketId] = useState<string | null>(null);

  // Kanban logic
  const filteredTickets = tickets.filter(t => t.statut === kanbanTab);

  const advanceTicket = (t: Ticket) => {
    setExitingTicketId(t.refTicket);
    setTimeout(() => {
      setTickets(prev => prev.map(tick => {
        if (tick.refTicket === t.refTicket) {
          if (tick.statut === "ToDo") return { ...tick, statut: "InProgress" };
          if (tick.statut === "InProgress") return { ...tick, statut: "Done" };
        }
        return tick;
      }));
      setExitingTicketId(null);
    }, 300);
  };

  // AI logic
  const handleRunAI = () => {
    setAiState("running");
    setTimeout(() => {
      setAiState("done");
    }, 2800);
  };

  return (
    <div className={styles.dashboardRoot}>
      <div className={styles.bgGrid}></div>
      <div className={styles.bgGlow}></div>

      {/* --- SIDEBAR --- */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoText}>ProjAI</span>
          <span className={styles.logoDot}>✦</span>
        </div>

        <div className={styles.navSectionLabel}>Menu Principal</div>
        <nav className={styles.projectsList}>
          <button className={`${styles.navBtn} ${activeTab === "overview" ? styles.navBtnActive : ""}`} onClick={() => setActiveTab("overview")}>
            <SvgGrid /> Dashboard
          </button>
          <button className={`${styles.navBtn} ${activeTab === "backlog" ? styles.navBtnActive : ""}`} onClick={() => setActiveTab("backlog")}>
            <SvgList /> Backlog
          </button>
          <button className={`${styles.navBtn} ${activeTab === "kanban" ? styles.navBtnActive : ""}`} onClick={() => setActiveTab("kanban")}>
            <SvgKanban /> Board Kanban
          </button>
          <button className={`${styles.navBtn} ${activeTab === "ai" ? styles.navBtnActive : ""}`} onClick={() => setActiveTab("ai")}>
            <SvgSparkle /> Assistant IA
          </button>
          <button className={`${styles.navBtn} ${activeTab === "team" ? styles.navBtnActive : ""}`} onClick={() => setActiveTab("team")}>
            <SvgUsers /> Équipe
          </button>
          <button className={`${styles.navBtn} ${activeTab === "sprints" ? styles.navBtnActive : ""}`} onClick={() => setActiveTab("sprints")}>
            <SvgClock /> Sprints
          </button>
        </nav>

        <div className={styles.navSectionLabel}>Projets Actifs</div>
        <div className={styles.projectsList}>
          {PROJECTS.map(p => (
            <button 
              key={p.refProjet}
              className={`${styles.projectPill} ${activeProject.refProjet === p.refProjet ? styles.projectPillActive : ""}`}
              onClick={() => setActiveProject(p)}
            >
              <div className={styles.pillDot} style={{ background: p.colorAccent }}></div>
              <span className={styles.pillName}>{p.nom}</span>
              <span className={styles.pillPct}>{p.progress}%</span>
            </button>
          ))}
        </div>

        <div className={styles.sidebarBottom}>
          <div className={styles.userAvatar}>AG</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 500 }}>A. Ghazouani</div>
            <div style={{ fontSize: "9px" }}>Product Owner</div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className={styles.mainContent}>
        {/* TOPBAR */}
        <header className={styles.topbar}>
          <h1 className={`${styles.dashTitle} gradient-text`}>Tableau de bord</h1>
          <span className={styles.sprintBadge}>Sprint 14</span>
          
          <div className={styles.searchBar}>
            <SvgSearch />
            <input type="text" placeholder="Rechercher ticket, projet..." />
          </div>

          <button className={styles.btnAI}>
            <SvgSparkle /> Analyser CDC
          </button>
          <button className={styles.btnPrimary}>+ Nouveau projet</button>
          
          <button className={styles.notifBtn}>
            <SvgBell />
            <div className={styles.notifDot}></div>
          </button>
        </header>

        {/* CONTENT AREA */}
        <div className={styles.contentArea}>
          
          {/* KPI STRIP */}
          <div className={styles.kpiStrip}>
            <div className={styles.kpiCard}>
              <div className={styles.kpiAccent} style={{ background: "var(--green)" }}></div>
              <div className={styles.kpiContent}>
                <div className={styles.kpiHeader}>
                  <span className={styles.kpiLabel}>Projets Actifs</span>
                </div>
                <div className={styles.kpiValue}>2</div>
                <div className={styles.kpiSub}>
                  <span className={styles.trendUp}>+1</span> depuis le mois dernier
                </div>
              </div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiAccent} style={{ background: "var(--purple)" }}></div>
              <div className={styles.kpiContent}>
                <div className={styles.kpiHeader}>
                  <span className={styles.kpiLabel}>Tickets Complétés</span>
                </div>
                <div className={styles.kpiValue}>2/6</div>
                <div className={styles.kpiSub}>
                  Sprint en cours (33%)
                </div>
              </div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiAccent} style={{ background: "var(--accent-amber)" }}></div>
              <div className={styles.kpiContent}>
                <div className={styles.kpiHeader}>
                  <span className={styles.kpiLabel}>Budget Total</span>
                </div>
                <div className={styles.kpiValue}>79k€</div>
                <div className={styles.kpiSub}>
                  <span className={styles.trendUp}>+12%</span> prévu
                </div>
              </div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiAccent} style={{ background: "var(--accent-rose)" }}></div>
              <div className={styles.kpiContent}>
                <div className={styles.kpiHeader}>
                  <span className={styles.kpiLabel}>Risques Ouverts</span>
                </div>
                <div className={styles.kpiValue}>3</div>
                <div className={styles.kpiSub}>
                  <span className={styles.trendDown}>+2</span> critiques
                </div>
              </div>
            </div>
          </div>

          {/* MID GRID */}
          <div className={styles.midGrid}>
            
            {/* PROJECTS GRID PANEL */}
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <div className={styles.panelTitle}>Portefeuille Projets</div>
                <div className={styles.panelActionWrap}>
                  <select className={styles.selectFilter} defaultValue="all">
                    <option value="all">Tous les statuts</option>
                    <option value="active">Actifs</option>
                  </select>
                  <button className={styles.panelAction}>+ Projet</button>
                </div>
              </div>
              
              <div className={styles.projectsGrid}>
                {PROJECTS.map(p => (
                  <div 
                    key={p.refProjet} 
                    className={`${styles.projectCard} ${activeProject.refProjet === p.refProjet ? styles.projectCardActive : ""}`}
                    onClick={() => setActiveProject(p)}
                  >
                    <div 
                      className={styles.pcImageZone} 
                      style={{ 
                        background: p.refProjet === "PRJ-001" ? "linear-gradient(135deg,#1a1a2e,#16213e)" : 
                                    p.refProjet === "PRJ-002" ? "linear-gradient(135deg,#1e1b4b,#312e81)" : 
                                    "linear-gradient(135deg,#064e3b,#065f46)",
                        color: p.colorAccent
                      }}
                    >
                      <SvgBox />
                    </div>
                    <div className={styles.pcHeader}>
                      <span className={styles.pcRef}>{p.refProjet}</span>
                      <span className={`${styles.badge} ${getStatutBadgeClass(p.statut)}`}>{p.statut}</span>
                    </div>
                    <div className={styles.pcName}>{p.nom}</div>
                    <div className={styles.pcDescription}>{p.description}</div>
                    <div className={styles.pcDetails}>
                      <span className={styles.pcDates}>{p.dateDebut} — {p.dateFin}</span>
                      <span className={styles.pcBudget}>{(p.budgetPrevu/1000).toFixed(0)}k€</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFill} style={{ width: `${p.progress}%`, background: p.colorAccent }}></div>
                    </div>
                    <div className={styles.pcFooter}>
                      <span className={styles.pcDates}>{p.membres} membres</span>
                      <span className={styles.pcDates} style={{color: p.colorAccent, fontWeight: 600}}>{p.progress}%</span>
                    </div>
                  </div>
                ))}
                
                <div className={styles.pcAddCard}>
                  <div className={styles.pcAddCardIcon}>+</div>
                  <span style={{fontSize: "11px", fontWeight: 500}}>Nouveau Projet</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className={styles.rightCol}>
              
              {/* AI TERMINAL */}
              <div className={styles.aiPanel}>
                <div className={styles.aiHeader}>
                  <div className={styles.aiIconWrap}>
                    <SvgSparkle />
                  </div>
                  <div className={styles.aiHeaderText}>
                    <div className={styles.aiTitle}>Assistant ProjAI</div>
                    <div className={styles.aiSubtitle}>Analyse CDC & Génération</div>
                  </div>
                  <button className={styles.aiRunBtn} onClick={handleRunAI} disabled={aiState !== "idle"}>
                    Analyser
                  </button>
                </div>
                
                <div className={styles.terminalBody}>
                  {aiState === "idle" && <span className={styles.termMuted}>&gt; Prêt pour l'analyse d'un nouveau Cahier des Charges...<span className={styles.cursor}></span></span>}
                  
                  {aiState === "running" && <span className={styles.termCyan}>&gt; Envoi du contexte à Gemini...<br/>&gt; Parsing des exigences...<span className={styles.cursor}></span></span>}
                  
                  {aiState === "done" && (
                    <>
                      <span className={styles.termCyan}>&gt; Génération terminée.</span><br/>
                      <span className={styles.termMuted}>{"{"}</span><br/>
                      &nbsp;&nbsp;<span className={styles.termGreen}>"status"</span>: <span className={styles.termString}>"success"</span>,<br/>
                      &nbsp;&nbsp;<span className={styles.termGreen}>"user_stories"</span>: <span className={styles.termNumber}>12</span>,<br/>
                      &nbsp;&nbsp;<span className={styles.termGreen}>"risks_identified"</span>: <span className={styles.termNumber}>3</span><br/>
                      <span className={styles.termMuted}>{"}"}</span>
                    </>
                  )}
                </div>
                
                {aiState === "done" && (
                  <div className={styles.aiActions}>
                    <button className={`${styles.aiActionBtn} ${styles.aiConfirm}`}>✓ Confirmer</button>
                    <button className={`${styles.aiActionBtn} ${styles.aiReject}`}>✕ Manuel</button>
                  </div>
                )}
              </div>

              {/* RISKS PANEL */}
              <div className={styles.panel} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div className={styles.panelHeader}>
                  <div className={styles.panelTitle}>Registre Risques</div>
                  <button className={styles.panelAction}>Voir tout</button>
                </div>
                <div style={{ padding: "8px 0", flex: 1, overflowY: "auto" }}>
                  {RISKS.map(r => {
                    const critStyle = getRiskCritColor(r.criticite);
                    return (
                      <div key={r.refRisque} className={styles.riskRow}>
                        <div className={styles.riskCrit} style={{ background: critStyle.bg, color: critStyle.color }}>
                          {r.criticite}
                        </div>
                        <div className={styles.riskDesc}>{r.description}</div>
                        <span className={`${styles.badge} ${getStatutBadgeClass(r.statut)}`}>{r.statut}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
            </div>
          </div>

          {/* BOTTOM GRID */}
          <div className={styles.bottomGrid}>
            
            {/* KANBAN */}
            <div className={styles.kanbanPanel}>
              <div className={styles.panelHeader} style={{borderBottom: "none", paddingBottom: "8px"}}>
                <div className={styles.panelTitle}>Board Sprint Actuel</div>
              </div>
              <div className={styles.tabBar}>
                <button 
                  className={`${styles.tabBtn} ${kanbanTab === "ToDo" ? styles.tabBtnActive : ""}`}
                  onClick={() => setKanbanTab("ToDo")}
                >
                  À faire ({tickets.filter(t=>t.statut==="ToDo").length})
                </button>
                <button 
                  className={`${styles.tabBtn} ${kanbanTab === "InProgress" ? styles.tabBtnActive : ""}`}
                  onClick={() => setKanbanTab("InProgress")}
                >
                  En cours ({tickets.filter(t=>t.statut==="InProgress").length})
                </button>
                <button 
                  className={`${styles.tabBtn} ${kanbanTab === "Done" ? styles.tabBtnActive : ""}`}
                  onClick={() => setKanbanTab("Done")}
                >
                  Terminé ({tickets.filter(t=>t.statut==="Done").length})
                </button>
              </div>
              
              <div className={styles.kanbanCards}>
                {filteredTickets.map(t => (
                  <div 
                    key={t.refTicket} 
                    className={`${styles.kanbanCard} ${exitingTicketId === t.refTicket ? styles.kanbanCardExiting : ""}`}
                  >
                    <div className={styles.cardTop}>
                      <span className={`${styles.badge} ${getStatutBadgeClass(t.type)}`}>{t.type}</span>
                      <span className={`${styles.badge} ${getPrioriteBadgeClass(t.priorite)}`}>{t.priorite}</span>
                    </div>
                    <div className={styles.cardTitle}>{t.titre}</div>
                    <div className={styles.cardFooter}>
                      <div className={styles.assigneeAvatar}>{t.assignee}</div>
                      <span className={styles.storyPoints}>{t.storyPoints} pts</span>
                      {t.statut !== "Done" && (
                        <button className={styles.advanceBtn} onClick={() => advanceTicket(t)} title="Avancer">
                          →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TIMELINE & COSTS */}
            <div className={styles.timelinePanel}>
              <div className={styles.panelHeader}>
                <div className={styles.panelTitle}>Avancement Sprint</div>
                <span className={`${styles.badge} ${styles.badgePurple}`}>4 tâches actives</span>
              </div>
              
              <div className={styles.timelineBody}>
                {SPRINT_TASKS.map((st, i) => (
                  <div key={i} className={styles.tlRow}>
                    <div className={styles.tlName} title={st.nom}>{st.nom}</div>
                    <div className={styles.tlTrack}>
                      <div 
                        className={styles.tlBar} 
                        style={{ 
                          left: `${st.startPct}%`, 
                          width: `${st.widthPct}%`, 
                          background: st.color 
                        }}
                      >
                        {st.assignee}
                      </div>
                    </div>
                    <div className={styles.tlPercent}>{st.progress}%</div>
                  </div>
                ))}
              </div>
              
              <div className={styles.costsSection}>
                <div className={styles.costTitle}>Suivi des coûts</div>
                <div className={styles.costBars}>
                  {PROJECTS.map(p => (
                    <div key={p.refProjet} className={styles.costBarWrap}>
                      <div className={styles.costBarContainer}>
                        <div className={styles.costBarCol}>
                          <div className={styles.costBar} style={{ height: `${(p.budgetPrevu/1000)}px`, background: p.colorAccent }}></div>
                        </div>
                        <div className={styles.costBarCol}>
                          <div className={styles.costBar} style={{ height: `${Math.min(p.budgetReel/1000, p.budgetPrevu/1000)}px`, background: p.colorAccent, opacity: 0.35 }}></div>
                          {p.budgetReel > p.budgetPrevu && (
                            <div className={styles.costBar} style={{ height: `${(p.budgetReel - p.budgetPrevu)/1000}px`, background: "var(--accent-rose)" }}></div>
                          )}
                        </div>
                      </div>
                      <span className={styles.costLabel}>{p.refProjet.split('-')[1]}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.costLegend}>
                  <div className={styles.legendItem}>
                    <div className={styles.legendColor} style={{ background: "var(--gray-400)" }}></div> Prévu
                  </div>
                  <div className={styles.legendItem}>
                    <div className={styles.legendColor} style={{ background: "var(--gray-200)" }}></div> Réel
                  </div>
                  <div className={styles.legendItem}>
                    <div className={styles.legendColor} style={{ background: "var(--accent-rose)" }}></div> Dépassement
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* DELIVERABLES */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Prochains Livrables</div>
            </div>
            <div className={styles.deliverablesGrid}>
              {DELIVERABLES.map(d => (
                <div key={d.refLivrable} className={styles.delivRow}>
                  <div className={styles.delivIcon}>{d.icon}</div>
                  <div className={styles.delivInfo}>
                    <div className={styles.delivName}>{d.nom}</div>
                    <div className={styles.delivDate}>{d.datePrevue}</div>
                  </div>
                  <div className={styles.delivBadge}>
                    <span className={`${styles.badge} ${getStatutBadgeClass(d.statut)}`}>{d.statut}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
