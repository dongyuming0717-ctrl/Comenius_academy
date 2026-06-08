"""Smoke tests for grading prototype"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import app, pdf_to_images

def test_pdf_to_images():
    """Can convert a simple PDF to images"""
    import fitz
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text((50, 700), "Test", fontsize=12)
    buf = doc.tobytes()
    images = pdf_to_images(buf)
    assert len(images) == 1, f"Expected 1 image, got {len(images)}"
    assert len(images[0]) > 100, "Image too small"

def test_health_endpoint():
    """Health check returns OK"""
    with app.test_client() as client:
        resp = client.get('/api/health')
        assert resp.status_code == 200
        assert resp.json['status'] == 'ok'

def test_index_loads():
    """Homepage serves HTML"""
    with app.test_client() as client:
        resp = client.get('/')
        assert resp.status_code == 200
        assert b'Marking Scheme' in resp.data

def test_grade_missing_files():
    """Returns error when no PDF uploaded"""
    with app.test_client() as client:
        resp = client.post('/api/grade', data={})
        assert resp.status_code == 400

if __name__ == '__main__':
    test_pdf_to_images()
    test_health_endpoint()
    test_index_loads()
    test_grade_missing_files()
    print("✅ All grading tests passed")
