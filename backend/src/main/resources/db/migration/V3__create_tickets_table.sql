-- V3__create_tickets_table.sql
-- Module M5 — Backlog / Tickets
-- Sprint 2 — Vient après V2 de Ghazouani

CREATE TABLE tickets (
                         ref_ticket        VARCHAR(50)  PRIMARY KEY,
                         titre             VARCHAR(200) NOT NULL,
                         description       TEXT,
                         type_ticket       VARCHAR(20)  NOT NULL CHECK (type_ticket IN ('USER_STORY','TASK','BUG')),
                         priorite          VARCHAR(20)  NOT NULL CHECK (priorite IN ('CRITIQUE','HAUTE','MOYENNE','BASSE')),
                         statut            VARCHAR(20)  NOT NULL DEFAULT 'TO_DO' CHECK (statut IN ('TO_DO','IN_PROGRESS','DONE')),
                         story_points      INTEGER      DEFAULT 0,
                         date_creation     TIMESTAMP    NOT NULL DEFAULT NOW(),
                         date_maj          TIMESTAMP,
                         ref_projet        VARCHAR(50)  REFERENCES projects(ref_projet),
                         matricule_assigne VARCHAR(50)  REFERENCES users(matricule)
);

CREATE INDEX idx_tickets_statut  ON tickets(statut);
CREATE INDEX idx_tickets_projet  ON tickets(ref_projet);
CREATE INDEX idx_tickets_assigne ON tickets(matricule_assigne);