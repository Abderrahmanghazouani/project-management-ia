-- =====================================================
-- V4__create_members_table.sql
-- Description : Table des membres d'un projet
-- =====================================================

CREATE TABLE project_members (
                                 ref_membre     VARCHAR(50)  PRIMARY KEY,
                                 role_projet    VARCHAR(30)  NOT NULL,
                                 date_ajout     TIMESTAMP    NOT NULL DEFAULT NOW(),
                                 ref_projet     VARCHAR(50)
                                     REFERENCES projects(ref_projet),
                                 matricule_user VARCHAR(50)
                                     REFERENCES users(matricule)
);

CREATE INDEX idx_members_projet
    ON project_members(ref_projet);
CREATE INDEX idx_members_user
    ON project_members(matricule_user);

COMMENT ON TABLE project_members
    IS 'Membres des projets Projexia';
COMMENT ON COLUMN project_members.role_projet
    IS 'Dev|QA|Analyste|Fullstack|Frontend|Backend';