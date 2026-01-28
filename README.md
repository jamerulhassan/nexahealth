# NexaHealth 🏥

NexaHealth is a full-stack healthcare management application designed to manage hospitals, users, and healthcare-related workflows in a scalable and modern way.

This repository contains both **frontend** and **backend** codebases, structured to work together as a complete system.

---

## 📌 Project Features

- Hospital registration and authentication
- User and role-based access (Hospital / Government / User)
- Location-based hospital listing
- REST API integration
- Modular frontend and backend architecture
- Scalable and production-ready structure

---

## 🗂 Project Structure

nexahealth/
├── nexahealth-frontend/ # React frontend
├── nexahealth-backend/ # Node.js + Express backend
└── README.md


---

## 🧠 Tech Stack

### Frontend
- JavaScript (ES2023+)
- React
- Axios
- HTML5 / CSS3

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/jamerulhassan/nexahealth.git
cd nexahealth

🔧 Backend Setup
cd nexahealth-backend
npm install

Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start backend server:
npm start

Backend will run on:
http://localhost:5000

🎨 Frontend Setup
cd ../nexahealth-frontend
npm install

Create a .env file:
REACT_APP_API_BASE_URL=http://localhost:5000/api

Start frontend:
npm start

http://localhost:3000

🔗 API Communication

Frontend communicates with backend using REST APIs

Axios is used for HTTP requests

(Passport and passport-local) are used for authentication and authorization

🧪 Available Scripts

Backend

| Command       | Description        |
| ------------- | ------------------ |
| `npm start`   | Start server       |
| `npm run dev` | Start with nodemon |


Frontend

| Command         | Description      |
| --------------- | ---------------- |
| `npm start`     | Development mode |
| `npm run build` | Production build |

🔐 Authentication

Passwords are hashed using bcrypt

Secure authentication using passport and passport-local

Role-based access control implemented

📦 Environment Variables
Backend

PORT
MONGO_URI
JWT_SECRET

Frontend

REACT_APP_API_BASE_URL

🤝 Contributing

Contributions are welcome!

1.Fork the repository

2.Create a new branch

3.Commit your changes

4.Push to your fork

5.Open a Pull Request

👨‍💻 Author

JamerulHassan V
GitHub: https://github.com/jamerulhassan

⭐ Support
If you like this project, give it a ⭐ on GitHub!