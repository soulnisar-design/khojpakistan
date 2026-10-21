# KhojPakistan.pk – Apno Ki Talaash

A complete, responsive humanitarian website for searching missing persons across Pakistan.

## Features

- Modern clean UI
- Search bar + city filter
- Services section
- Recent Cases (dynamic from backend)
- API endpoints ready (`/api/cases`)
- Fully responsive
- Production-ready (Gunicorn + Procfile)

## Local Run

```bash
pip install -r requirements.txt
python app.py
```

Open: http://127.0.0.1:5000

## Deploy on Render.com (Free – Recommended)

1. Create free account on https://render.com
2. Create free account on https://github.com
3. Upload this project to a new GitHub repository
4. On Render.com → **New** → **Web Service**
5. Connect your GitHub repo
6. Settings:
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`
7. Click **Deploy**

After 1-2 minutes you will get a public link like:
`https://khojpakistan.onrender.com`

Anyone from any city/country can open this link.

## Deploy on Railway.app (also easy)

1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. It auto-detects Procfile and deploys

## Project Structure

```
khojpakistan/
├── app.py                 # Main Flask app
├── Procfile               # For Render / Railway / Heroku
├── requirements.txt
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── css/style.css
    └── js/main.js
```

## Future Upgrades (easily possible)

- Admin Panel (login + add/edit/delete cases)
- Real SQLite / PostgreSQL database
- Report Missing Person form
- Image upload
- User authentication
- Email / SMS alerts

Just ask when you want any of these upgrades.
