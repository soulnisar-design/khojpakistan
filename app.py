import os
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Production mein secret key environment variable se lo
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'khojpakistan-dev-secret-change-me')

# Demo cases (baad mein database / admin panel se manage kar sakte ho)
CASES = [
    {
        "id": 1,
        "name": "Ahmed Khan",
        "age": 42,
        "status": "Missing",
        "location": "Karachi, Sindh",
        "date": "12 Aug 2024",
        "height": "5'8\"",
        "clothing": "Brown Shirt, Jacket",
        "description": "Last seen near Saddar area. Family is urgently looking for him. He has a small scar on his left forehead.",
        "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
        "contact": "Report any information to helpline 0800-12345"
    },
    {
        "id": 2,
        "name": "Fatima Noor",
        "age": 12,
        "status": "Missing Kid",
        "location": "Lahore, Punjab",
        "date": "25 Aug 2024",
        "height": "4'6\"",
        "clothing": "School uniform, Blue backpack",
        "description": "Went missing after school. Was wearing blue school uniform and carrying a blue backpack with her name written on it.",
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
        "contact": "Urgent – Contact local police or helpline immediately"
    },
    {
        "id": 3,
        "name": "Safia Bibi",
        "age": 65,
        "status": "Found",
        "location": "Islamabad, ICT",
        "date": "28 Aug 2024",
        "height": "5'2\"",
        "clothing": "Green shawl, white dress",
        "description": "Found near F-10 Markaz. She appears disoriented and is currently under care of local authorities.",
        "image": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=300&fit=crop&crop=face",
        "contact": "If you recognize her, please contact support@khojpakistan.pk or call 0800-12345"
    }
]


@app.route('/')
def home():
    return render_template('index.html', cases=CASES)


@app.route('/api/cases')
def api_cases():
    """API endpoint - baad mein admin panel ke liye useful"""
    return jsonify(CASES)


@app.route('/api/case/<int:case_id>')
def api_case(case_id):
    case = next((c for c in CASES if c["id"] == case_id), None)
    if case:
        return jsonify(case)
    return jsonify({"error": "Case not found"}), 404


@app.route('/health')
def health():
    """Health check for deployment platforms (Render, Railway etc.)"""
    return jsonify({"status": "ok", "service": "KhojPakistan.pk"})


if __name__ == '__main__':
    # Local development
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') != 'production'
    print("=" * 50)
    print("  KhojPakistan.pk is running!")
    print(f"  Open: http://127.0.0.1:{port}")
    print("=" * 50)
    app.run(host='0.0.0.0', port=port, debug=debug)
