from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

def create_mock_resume(filename="mock_resume.pdf"):
    c = canvas.Canvas(filename, pagesize=letter)
    text = """
    Alok - Machine Learning Engineer
    
    Experience:
    - Built LLM agents using Python, LangChain, and FastAPI.
    - Trained computer vision models using PyTorch.
    - Expert in data engineering with Pandas, SQL, and AWS.
    
    Education:
    - B.Tech in Computer Science
    
    Goals:
    - Looking for high impact ML engineering roles in fast-paced startups.
    """
    
    textobject = c.beginText(100, 750)
    for line in text.split('\n'):
        textobject.textLine(line)
        
    c.drawText(textobject)
    c.save()
    print(f"Created {filename}")

if __name__ == "__main__":
    create_mock_resume()
