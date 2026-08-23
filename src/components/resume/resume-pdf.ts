/**
 * Path to the downloadable resume PDF.
 *
 * Lives in its own module so the "Download PDF" links on /hire-me can reference
 * it without importing `ResumeContent` — that module is ~15 kB and is meant to
 * load only when the resume modal is opened.
 */
export const RESUME_PDF_PATH = '/resume/Cyrus_Khiabani_Resume.pdf';
