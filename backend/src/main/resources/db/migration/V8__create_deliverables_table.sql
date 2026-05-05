-- V8__create_deliverables_table.sql
-- Module M9 — Livrables

CREATE TABLE deliverables (
                              ref_livrable  VARCHAR(50)  PRIMARY KEY,
                              nom           VARCHAR(200) NOT NULL,
                              description   TEXT,
                              date_prevue   DATE         NOT NULL,
                              lien_fichier  VARCHAR(500),
                              statut        VARCHAR(20)  NOT NULL DEFAULT 'EN_ATTENTE'
                                  CHECK (statut IN ('EN_ATTENTE','LIVRE','EN_RETARD')),
                              date_creation TIMESTAMP    NOT NULL DEFAULT NOW(),
                              ref_projet    VARCHAR(50)
                                  REFERENCES projects(ref_projet)
);

CREATE INDEX idx_deliverables_projet ON deliverables(ref_projet);
CREATE INDEX idx_deliverables_statut ON deliverables(statut);
