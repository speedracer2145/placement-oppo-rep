import fitz  # PyMuPDF

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """
    Extracts raw text from a PDF file in memory.
    """
    try:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        print(f"[PDF PARSER ERROR] Failed to extract text: {e}")
        raise ValueError(f"Could not parse PDF: {str(e)}")
