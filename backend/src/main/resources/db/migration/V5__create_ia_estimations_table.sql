-- =====================================================
-- V5__create_ia_estimations_table.sql
-- Description : Tables pour l'assistant IA Gemini
-- =====================================================

CREATE TABLE ia_estimations (
                                ref_estimation    VARCHAR(50)  PRIMARY KEY,
                                texte_cdc         TEXT         NOT NULL,
                                total_jours       INTEGER      DEFAULT 0,
                                complexite        VARCHAR(20)
                                    CHECK (complexite IN
                                           ('Faible','Moyenne','Elevee')),
                                risques           TEXT,
                                statut            VARCHAR(20)  NOT NULL DEFAULT 'EN_ATTENTE'
                                    CHECK (statut IN
                                           ('EN_ATTENTE','CONFIRMEE','REJETEE')),
                                date_creation     TIMESTAMP    NOT NULL DEFAULT NOW(),
                                ref_projet        VARCHAR(50)
                                    REFERENCES projects(ref_projet),
                                matricule_client  VARCHAR(50)
                                    REFERENCES users(matricule)
);

CREATE TABLE ia_tasks (
                          ref_tache_ia   VARCHAR(50)  PRIMARY KEY,
                          titre          VARCHAR(200) NOT NULL,
                          jours_estimes  INTEGER      DEFAULT 1,
                          ref_estimation VARCHAR(50)
                              REFERENCES ia_estimations(ref_estimation)
);

CREATE INDEX idx_ia_projet
    ON ia_estimations(ref_projet);
CREATE INDEX idx_ia_statut
    ON ia_estimations(statut);
CREATE INDEX idx_ia_tasks_estimation
    ON ia_tasks(ref_estimation);