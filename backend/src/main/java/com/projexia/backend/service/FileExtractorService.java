package com.projexia.backend.service;



import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * FileExtractorService — Extraction texte depuis fichiers
 *
 * Formats supportés :
 * - .pdf  → Apache PDFBox
 * - .docx → Apache POI
 * - .txt  → lecture directe
 */
@Service
@Slf4j
public class FileExtractorService {

    /**
     * Extraire le texte depuis un fichier uploadé
     *
     * @param file → PDF, DOCX ou TXT
     * @return texte extrait
     */
    public String extraireTexte(MultipartFile file)
            throws IOException {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException(
                    "Fichier vide ou manquant");
        }

        String filename = file.getOriginalFilename()
                .toLowerCase();

        log.info("Extraction texte : {} ({} bytes)",
                filename, file.getSize());

        if (filename.endsWith(".pdf")) {
            return extraireDepuisPDF(file);
        } else if (filename.endsWith(".docx")) {
            return extraireDepuisWord(file);
        } else if (filename.endsWith(".txt")) {
            return extraireDepuisTxt(file);
        } else {
            throw new RuntimeException(
                    "Format non supporté : " + filename +
                            ". Utilisez PDF, DOCX ou TXT.");
        }
    }

    // ─── PDF ──────────────────────────────────

    private String extraireDepuisPDF(
            MultipartFile file) throws IOException {

        try (PDDocument document =
                     Loader.loadPDF(file.getBytes())) {

            PDFTextStripper stripper =
                    new PDFTextStripper();
            String texte = stripper.getText(document);

            if (texte == null || texte.trim().isEmpty()) {
                throw new RuntimeException(
                        "Le PDF ne contient pas de texte " +
                                "extractible.");
            }

            log.info("PDF extrait : {} caractères",
                    texte.length());
            return texte.trim();
        }
    }

    // ─── Word (.docx) ─────────────────────────

    private String extraireDepuisWord(
            MultipartFile file) throws IOException {

        try (XWPFDocument document =
                     new XWPFDocument(file.getInputStream())) {

            StringBuilder texte = new StringBuilder();
            List<XWPFParagraph> paragraphs =
                    document.getParagraphs();

            for (XWPFParagraph para : paragraphs) {
                String text = para.getText();
                if (text != null && !text.isEmpty()) {
                    texte.append(text).append("\n");
                }
            }

            if (texte.toString().trim().isEmpty()) {
                throw new RuntimeException(
                        "Le document Word est vide.");
            }

            log.info("Word extrait : {} caractères",
                    texte.length());
            return texte.toString().trim();
        }
    }

    // ─── TXT ──────────────────────────────────

    private String extraireDepuisTxt(
            MultipartFile file) throws IOException {

        String texte = new String(file.getBytes());

        if (texte.trim().isEmpty()) {
            throw new RuntimeException(
                    "Le fichier texte est vide.");
        }

        log.info("TXT extrait : {} caractères",
                texte.length());
        return texte.trim();
    }
}