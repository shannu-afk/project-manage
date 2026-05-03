# Project Management System

Full-stack web application for managing projects and tasks with role-based access control (RBAC).

## 🌟 Features
- **User Authentication**: Register/Login with JWT tokens
- **Role Management**: Admin (manage projects/tasks/members) | Member (view/update own tasks)
- **Project Management**: Create projects, add members (Admin only)
- **Task Management**: Create/assign tasks to projects/users, update status (Pending → In Progress → Completed), due dates
- **Dashboard**: View projects, tasks, statuses
- **Protected Routes**: All APIs require auth (Bearer token); Admin-only endpoints enforced

## 🏗️ Tech Stack
| Frontend | Backend | Database |
|----------|---------|----------|
| React 19, Vite, React Router, Axios | Node.js, Express, Mongoose | MongoDB |

## 📁 Project Structure
```
.
├── client/           # React + Vite frontend
│   ├── src/
│   │   ├── pages/    # Login.jsx, Register.jsx, Dashboard.jsx
│   │   └── api/      # Axios API client
│   └── package.json
├── server/           # Express + Mongoose backend
│   ├── models/       # User.js, Project.js, Task.js
│   ├── routes/       # authRoutes.js, projectRoutes.js, taskRoutes.js
│   ├── middleware/   # auth.js, role.js
│   └── server.js
├── README.md
├── .gitignore
└── TODO.md
```

## 🗄️ Database Schemas

### User
```js
{
  name: String (req),
  email: String (unique, req),
  password: String (hashed, req),
  role: "Admin"|"Member" (default: Member)
}
```

### Project
```js
{
  name: String (req),
  description: String,
  createdBy: ObjectId (ref: User, req),
  members: [ObjectId] (ref: User)
}
```

### Task
```js
{
  title: String (req),
  description: String,
  project: ObjectId (ref: Project),
  assignedTo: ObjectId (ref: User),
  status: "Pending"|"In Progress"|"Completed" (default: Pending),
  dueDate: Date
}
```

## 🔌 API Endpoints

**Base URL**: `http://localhost:5000/api`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/auth/register` | - | - | Create user (first user auto Admin) |
| POST | `/auth/login` | - | - | Login, returns JWT token |
| POST | `/projects` | ✅ | Admin | Create project |
| GET | `/projects` | ✅ | Any | List projects (populated members) |
| POST | `/tasks` | ✅ | Admin | Create task |
| GET | `/tasks` | ✅ | Any | List tasks (populated assignedTo/project) |
| PUT | `/tasks/:id` | ✅ | Any* | Update task (*assumed own tasks) |

**Auth**: `Authorization: Bearer <token>`

## 🚀 Setup & Run

### 1. Clone & Install
```bash
git clone https://github.com/shannu-afk/project-manage.git
cd project-manage
```

### 2. Backend
```bash
cd server
npm install
# Create .env:
# MONGO_URI=mongodb://localhost:27017/projectmanage  # or Atlas
# JWT_SECRET=your_super_secret_key_min32chars
npm run dev  # or npm start
```
🌐 Server: http://localhost:5000

### 3. Frontend
```bash
cd ../client
npm install
npm run dev
```
🌐 App: http://localhost:5173

### 4. Seed Data (optional)
```bash
cd server
node seed.js
```

## 🔐 Environment Variables (.env)
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## 🧪 Testing Flow
1. Register first user → becomes Admin
2. Login → get token
3. Dashboard: Create project/task
4. Register more users (Members)
5. Assign members/tasks

## 🚀 Deployment
- **Backend**: Railway/Render + MongoDB Atlas
- **Frontend**: Vercel/Netlify
- Set env vars in platform

## 🤝 Contributing
1. Fork & clone
2. `npm i` both folders
3. Create feature branch
4. PR to `main`

## 📄 License
MIT

NOTE : This project currently using default mongodb 

## 🙌 Acknowledgments
Built with ❤️ using modern JS stack.
