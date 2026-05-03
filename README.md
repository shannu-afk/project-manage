# Project Management Web App

Build a web app where users can create projects, assign tasks, and track progress with role-based access (Admin/Member).

## 🚀 Key Features
- **Authentication** (Signup/Login with JWT)
- **Project & team management** (Create projects, add members)
- **Task creation, assignment & status tracking** (Assign to users, update status, due dates)
- **Dashboard** (View tasks, status, overdue items)
- **Role-based access control** (Admin: manage projects/teams; Member: tasks)

## 🛠️ Tech Stack
- **Frontend**: React + Vite + Axios + CSS
- **Backend**: Node.js + Express + MongoDB (Mongoose) + JWT + bcrypt
- **Pages**: Login, Register, Dashboard
- **APIs**: Auth, Projects, Tasks

## 📱 Screenshots
*(Add screenshots of Dashboard, Project list, etc. after testing)*

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend
```bash
cd server
npm install
# Copy .env.example to .env and set MONGO_URI, JWT_SECRET
npm start
```
Server runs on http://localhost:5000

### Frontend
```bash
cd client
npm install
npm run dev
```
App runs on http://localhost:5173

### Database
Uses MongoDB. Run `npm run seed` in server/ for sample data.

## ⚙️ Environment Variables
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT tokens

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET/POST /api/projects
- GET/POST /api/tasks

## Project Structure
```
.
├── client/          # React frontend
├── server/          # Node/Express backend
├── README.md
└── .gitignore
```

## Role-based Access
- **Admin**: Create/edit projects, assign members/tasks
- **Member**: View assigned tasks, update status

## Future Enhancements
- File uploads
- Notifications
- Charts for progress

## Deployment
- Backend: Render/Heroku + MongoDB Atlas
- Frontend: Vercel/Netlify
