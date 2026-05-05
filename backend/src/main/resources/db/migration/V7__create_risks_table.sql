-- V7__create_risks_table.sql
-- Module M8 — Registre des Risques

CREATE TABLE risks (
                       ref_risque       VARCHAR(50)  PRIMARY KEY,
                       description      TEXT         NOT NULL,
                       probabilite      VARCHAR(20)  NOT NULL
                           CHECK (probabilite IN ('Faible','Moyenne','Elevee')),
                       impact           VARCHAR(20)  NOT NULL
                           CHECK (impact IN ('Faible','Moyen','Eleve')),
                       criticite        VARCHAR(20)  NOT NULL
                           CHECK (criticite IN ('Faible','Moyenne','Elevee','Critique')),
                       plan_mitigation  TEXT,
                       responsable      VARCHAR(100),
                       statut           VARCHAR(20)  NOT NULL DEFAULT 'IDENTIFIE'
                           CHECK (statut IN ('IDENTIFIE','EN_COURS','MITIGE','CLOS')),
                       date_creation    TIMESTAMP    NOT NULL DEFAULT NOW(),
                       ref_projet       VARCHAR(50)
                           REFERENCES projects(ref_projet)
);

CREATE INDEX idx_risks_projet   ON risks(ref_projet);
CREATE INDEX idx_risks_statut   ON risks(statut);
CREATE INDEX idx_risks_criticite ON risks(criticite);