-- =====================================================
-- V2__create_projects_table.sql
-- Description : Création de la table projects
-- =====================================================

CREATE TABLE projects (
                          ref_projet         VARCHAR(50)   PRIMARY KEY,
                          nom                VARCHAR(150)  NOT NULL,
                          description        TEXT,
                          statut             VARCHAR(20)   NOT NULL DEFAULT 'ACTIF'
                              CHECK (statut IN ('ACTIF','EN_PAUSE','TERMINE')),
                          date_debut         DATE          NOT NULL,
                          date_fin           DATE          NOT NULL,
                          budget_prevu       DECIMAL(15,2) DEFAULT 0,
                          budget_reel        DECIMAL(15,2) DEFAULT 0,
                          date_creation      TIMESTAMP     NOT NULL DEFAULT NOW(),
                          matricule_createur VARCHAR(50)   REFERENCES users(matricule)
);

CREATE INDEX idx_projects_statut
    ON projects(statut);

CREATE INDEX idx_projects_createur
    ON projects(matricule_createur);

COMMENT ON TABLE projects
    IS 'Projets de la plateforme Projexia';

COMMENT ON COLUMN projects.ref_projet
    IS 'Format : PRJ-YYYY-NNN';