-- V9__create_costs_table.sql
-- Module M10 — Suivi des Coûts
-- Vient après V8 (si existant) ou V6 (sprints)

CREATE TABLE cost_tracking (
                               ref_cout             VARCHAR(50)   PRIMARY KEY,
                               budget_prevu         DECIMAL(15,2) NOT NULL DEFAULT 0,
                               budget_reel          DECIMAL(15,2) NOT NULL DEFAULT 0,
                               ecart                DECIMAL(15,2) GENERATED ALWAYS AS
                                   (budget_prevu - budget_reel) STORED,
                               date_enregistrement  TIMESTAMP     NOT NULL DEFAULT NOW(),
                               commentaire          TEXT,
                               ref_projet           VARCHAR(50)
                                   REFERENCES projects(ref_projet),
                               matricule_enregistre VARCHAR(50)
                                   REFERENCES users(matricule)
);

CREATE INDEX idx_costs_projet ON cost_tracking(ref_projet);