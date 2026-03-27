# 🍽️ Restaurant Management System (MERN Stack)

A full-stack **Restaurant Management System** built using **MongoDB, Express.js, React, and Node.js**. This application helps manage restaurant operations like users, menu, orders, staff, inventory, and more.

---

## 🚀 Features

### 👤 User & Authentication

* 🔐 Secure Login & Registration
* 🔑 Role-Based Access (Admin, Cashier, Accountant)
* 🔒 Password Hashing using bcrypt
* 🗂️ Session / Token-based Authentication

---

### 🍔 Menu Management

* ➕ Add New Menu Items
* ✏️ Update Food Details
* ❌ Delete Items
* 📋 View Complete Menu

---

### 🛒 Order Management

* 🧾 Create Orders
* 📦 Track Orders
* 📊 Order History
* 💰 Billing System

---

### 👨‍💼 Staff Management

* ➕ Add Staff
* 📋 Manage Roles (Admin, Cashier, Accountant)
* 💼 Payroll System

---

### 🏬 Inventory & Supplier

* 📦 Manage Ingredients
* 🚚 Supplier Management
* 📊 Purchase Tracking

---

### ⚙️ Additional Modules

* 🖨️ Printer Integration
* 🏠 Room/Table Management
* ⚙️ Settings Configuration
* 💸 Discount System

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* Vite
* CSS / Tailwind (if used)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 📁 Project Structure

```bash
Resturant/
│── Backend/
│   ├── Models/
│   │   ├── User.js
│   │   ├── MenuItem.js
│   │   ├── Order.js
│   │   ├── Staff.js
│   │   ├── Supplier.js
│   │   ├── Purchase.js
│   │   ├── Ingredient.js
│   │   ├── Payroll.js
│   │   ├── Room.js
│   │   ├── Discount.js
│   │   ├── Printer.js
│   │   └── Settings.js
│   ├── Routes/
│   ├── server.js
│   └── .env
│
│── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── app/
│   │   └── App.jsx
│   ├── public/
│   └── index.html
│
│── package.json
│── README.md
```

---

## ⚡ Installation & Setup

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/restaurant-management-system.git
cd restaurant-management-system
```

---

### 🔹 2. Setup Backend

```bash
cd Backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 🔹 3. Setup Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

---

### 🔹 4. Open App

```
http://localhost:5173
```

---

## 📸 Screenshots

### 🔐 Login & User Management

<p align="center">
  <img src="screenshots/login.png" width="45%" />
  <img src="screenshots/user-dashboard.png" width="45%" />
</p>

---

### 🍔 Menu & Orders

<p align="center">
  <img src="screenshots/menu.png" width="45%" />
  <img src="screenshots/orders.png" width="45%" />
</p>

---

### 👨‍💼 Staff & Payroll

<p align="center">
  <img src="screenshots/staff.png" width="45%" />
  <img src="screenshots/payroll.png" width="45%" />
</p>

---

### 📦 Inventory & Suppliers

<p align="center">
  <img src="screenshots/inventory.png" width="45%" />
  <img src="screenshots/supplier.png" width="45%" />
</p>

---

### ⚙️ System Modules

<p align="center">
  <img src="screenshots/settings.png" width="45%" />
  <img src="screenshots/reports.png" width="45%" />
</p>

---

## 🧾 How to Add Screenshots

1. Create folder:

```bash
screenshots/
```

2. Add images (example):

```bash
login.png
menu.png
orders.png
staff.png
inventory.png
```

3. Push:

```bash
git add .
git commit -m "Added screenshots"
git push
```

---

## 🎯 Future Enhancements

* 💳 Online Payment Integration
* 📱 Mobile App
* 🔔 Notification System
* 📊 Advanced Analytics Dashboard

---

## 🤝 Contributing

Feel free to fork and contribute to this project.

---

## 👨‍💻 Author

**Narendra Kumar Yadav**

---

## ⭐ Support

If you like this project, please ⭐ star the repo!
