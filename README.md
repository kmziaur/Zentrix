<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=28&pause=1000&color=00C2FF&center=true&vCenter=true&width=800&lines=Zentrix+E-Commerce+Platform;Full+Stack+MERN+Application;Secure+%7C+Scalable+%7C+Modern+UI" />
</p>

<p align="center">
  <b>🚀 A production-style full-stack e-commerce platform built with MERN stack</b>
</p>

<p align="center">
  <a href="https://zentrix-green.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Now-blue?style=for-the-badge">
  </a>
  <img src="https://img.shields.io/badge/Full--Stack-MERN-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge">
</p>

---

## ✨ Overview

**Zentrix** is a modern, scalable e-commerce platform designed to simulate real-world online shopping systems with **authentication, admin control, cart management, and order processing**.

Built with a focus on **clean architecture, scalability, and production-ready patterns**, it demonstrates full-stack engineering skills suitable for real-world applications.

---

## 🎯 Key Highlights

- 🔐 Secure JWT Authentication System
- 🛒 Full E-Commerce Flow (Cart → Order → Checkout)
- 🛠 Admin Dashboard with Role-Based Access
- ⚡ Optimized REST API Architecture
- 📱 Fully Responsive UI (Mobile First)
- 🧠 Scalable Modular Backend Design

---

## 🖥️ Live Demo

👉 https://zentrix-green.vercel.app/

---

## 📸 Product Showcase

### 🏠 Customer Experience
<p align="center">
  <img src="images/home-page.png" width="48%">
  <img src="images/product-page.png" width="48%">
</p>

### 🛒 Shopping Cart Flow
<p align="center">
  <img src="images/cart-page1.png" width="48%">
  <img src="images/cart-page2.png" width="48%">
</p>

### 🛠 Admin Control Panel
<p align="center">
  <img src="images/admin-dashboard.png" width="32%">
  <img src="images/add-product.png" width="32%">
  <img src="images/orders.png" width="32%">
</p>

---

## 🏗️ System Architecture


---

## 🏗 Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS
* Shadcn UI
* Lucide React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* dotenv
* CORS

### Development Tools

* Git
* GitHub
* Postman
* VS Code

---

## 📁 Project Structure

```bash
Zentrix/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/kmziaur/Zentrix.git
cd Zentrix
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

NODE_ENV=development
```

---

## 📦 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:8000
```

---

## 💻 Frontend Setup

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

## 🔗 API Endpoints

### Authentication

```http
POST /api/v1/user/register
POST /api/v1/user/login
POST /api/v1/user/logout
GET  /api/v1/user/profile
```

### Products

```http
GET    /api/v1/product
GET    /api/v1/product/:id
POST   /api/v1/product/create
PUT    /api/v1/product/update/:id
DELETE /api/v1/product/delete/:id
```

### Cart

```http
GET    /api/v1/cart
POST   /api/v1/cart/add
PUT    /api/v1/cart/update
DELETE /api/v1/cart/remove/:id
```

### Orders

```http
POST /api/v1/order/create
GET  /api/v1/order
GET  /api/v1/order/:id
```

---

## 🔄 Application Flow

```bash
User
 │
 ▼
Frontend (React)
 │
 ▼
Axios API Requests
 │
 ▼
Backend (Express.js)
 │
 ▼
MongoDB Database
```

---

## 🔐 Authentication Flow

```bash
User Login
    │
    ▼
JWT Token Generated
    │
    ▼
Token Stored
    │
    ▼
Protected Routes
    │
    ▼
Authorized Access
```

---

## 📱 Responsive Design

ZENTRIX is fully optimized for:

* Desktop
* Laptop
* Tablet
* Mobile Devices

---

## 🚀 Upcoming Features

* SSLCOMMERZ Payment Gateway
* Wishlist System
* Product Reviews & Ratings
* Coupon & Discount System
* Multi-Vendor Support

---

## ⚡ Performance Optimizations

* Redux State Management
* Reusable Components
* Modular Backend Architecture
* Optimized API Calls
* Protected Route System
* Efficient Database Queries

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

### K. M. Ziaur Rahman

GitHub:

https://github.com/kmziaur

Repository:

https://github.com/kmziaur/Zentrix

---

⭐ If you like this project, don't forget to give it a star.
