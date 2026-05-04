-- V6__create_sprints_table.sql
-- Module M7 — Sprints & Planning
-- Sprint 3 — Vient après V5 (ia_estimations)

CREATE TABLE sprints (
                         ref_sprint    VARCHAR(50)  PRIMARY KEY,
                         nom           VARCHAR(150) NOT NULL,
                         objectif      TEXT,
                         date_debut    DATE         NOT NULL,
                         date_fin      DATE         NOT NULL,
                         capacite      INTEGER      DEFAULT 0,
                         statut        VARCHAR(20)  NOT NULL DEFAULT 'A_VENIR'
                             CHECK (statut IN ('A_VENIR','ACTIF','TERMINE')),
                         date_creation TIMESTAMP    NOT NULL DEFAULT NOW(),
                         ref_projet    VARCHAR(50)  REFERENCES projects(ref_projet)
);

ALTER TABLE tickets
    ADD COLUMN ref_sprint VARCHAR(50) REFERENCES sprints(ref_sprint);

CREATE INDEX idx_sprints_projet ON sprints(ref_projet);
CREATE INDEX idx_sprints_statut ON sprints(statut);