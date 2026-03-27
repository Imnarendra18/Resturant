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
  <img width="465" height="438" alt="image" src="https://github.com/user-attachments/assets/2e095262-7cc7-47af-8a76-6cce36ef2795" />

  <img width="1344" height="681" alt="image" src="https://github.com/user-attachments/assets/cfc34b02-8d41-4e45-8467-40c0340d124a" />
<img width="1353" height="686" alt="image" src="https://github.com/user-attachments/assets/8c217ffc-18b4-47c3-baa5-2313be18d1fe" />

</p>

---

### 🍔 Menu & Orders

<p align="center">
  <img width="1361" height="649" alt="image" src="https://github.com/user-attachments/assets/f9030258-ee18-453f-afab-6efbc21e3223" />

  <img width="1356" height="685" alt="image" src="https://github.com/user-attachments/assets/f1f5a3d8-2a43-45f6-ac2d-c004a43111a7" />

</p>

---

### 👨‍💼 Staff & Payroll

<p align="center">
  <img width="1347" height="679" alt="image" src="https://github.com/user-attachments/assets/84efe2e8-573d-4cef-87dc-fdac60f418c5" />
   <img width="1359" height="686" alt="image" src="https://github.com/user-attachments/assets/f5bd9434-73d3-466b-b63e-c61e3bd7bec0" />

  <img src="screenshots/payroll.png" width="45%" />
</p>

---

### 📦 Inventory & Suppliers

<p align="center">
  <img width="1355" height="719" alt="image" src="https://github.com/user-attachments/assets/c109675e-11e7-494b-ab48-62f5f9626c47" />
  <img width="1358" height="682" alt="image" src="https://github.com/user-attachments/assets/930f4a44-1ab5-49a0-938d-040d851a4f87" />

  <img width="1355" height="687" alt="image" src="https://github.com/user-attachments/assets/8a39c360-c4a1-4e02-b6bf-e88b8b9b42f7" />

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
<img width="1358" height="682" alt="image" src="https://github.com/user-attachments/assets/358480d4-b339-4965-aae5-effd071b80bc" />

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
