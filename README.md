# Sathwik's Social Feed

---

A full-stack Mini Social Media Feed built using React + Vite for the frontend and FastAPI + SQLite for the backend.

Users can:

* Create posts
* Upload images
* Like posts
* Edit posts
* Delete posts

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* CSS

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Uvicorn

---

## Features

* Dark themed UI
* Create social media style posts
* Upload photos with posts
* Like functionality
* Edit existing posts
* Delete posts
* REST API integration
* Responsive layout

---

## Project Structure

```bash
fastapi-react-crud/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
```

---

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/SathOps/fastapi-react-crud.git
cd fastapi-react-crud
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python -m uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Deployment

### Frontend

Deployed using GitHub Pages.

### Backend

Can be deployed using:

* Render
* Railway
* PythonAnywhere

---

## Author

Sathwik Naag

GitHub: https://github.com/SathOps
GitLab: https://code.swecha.org/Sathwiknaag12

---

## Future Improvements

* User authentication
* Comments section
* Real database deployment
* Profile pages
* Real-time updates
* Cloud image storage

---

## Project Goal

This project was built to understand:

* CRUD operations
* REST APIs
* Frontend and Backend integration
* Full-stack application workflow
* Deployment basics
