# 🛒 E-Commerce Web Application (MERN Stack)

A full-stack E-Commerce web application built using the MERN stack.  
This project focuses on clean UI/UX, secure authentication, product management, and real-world shopping features.

---

## 🚀 Features

### 👤 User
- User Registration & Login (JWT Authentication)
- Browse Products
- Search & Filter Products
- Add to Cart / Remove from Cart
- Wishlist
- Place Orders
- View Order History

### 🛠️ Admin
- Add / Edit / Delete Products
- Manage Users
- View Orders
- Update Order Status

---

## 🧑‍💻 Tech Stack

### Frontend
- React (Vite)
- CSS / Bootstrap
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Token)
- Bcrypt Password Hashing

---

## 📁 Project Structure

client/
├── components/
├── pages/
├── common/
└── App.js

server/
├── models/
├── routes/
├── controllers/
└── index.js


---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/dev220805/ecommerce

Backend Setup
cd server
npm install
npm start


Create .env file:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
PORT=5000

Frontend Setup
cd client
npm install
npm run dev

🔐 Environment Variables

MONGO_URI

JWT_SECRET

PORT
