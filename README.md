# 🇵🇱 Poland FullStack Recruitment Task – IdoMods

This repository contains the completed full-stack recruitment task for IdoMods, including both frontend and backend implementations as per the requirements provided.

---

## 🔧 Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Auth**: Basic Authentication
- **Deployment**: 
  - Frontend: Vercel
  - Backend: Render

---

## 📦 Features Implemented

### ✅ Backend (Node.js + Express)

- **Mocked Orders Data** using a local JSON file (due to DNS issue with IdoSell API)
- **Basic Authentication** (Username: `admin`, Password: `secret`)
- **Endpoints**:
  - `GET /orders`: Fetch all orders (optional `minWorth` and `maxWorth` filtering)
  - `GET /orders/:id`: Fetch a specific order by ID
  - `GET /orders/export`: Download all orders in CSV format
- **Daily Update Simulation**: Mimics daily updates by reading JSON file on each request

---

### ✅ Frontend (React)

- **Responsive UI** built with semantic HTML & custom CSS
- **Dynamic Filter Modes**:
  - Search by Order ID
  - Search by Product Name
  - Filter by Price Range (`minWorth` & `maxWorth`)
- **Live Authentication** with Basic Auth token stored in `localStorage`
- **Error Handling** for invalid searches and failed fetches

---

## 🔗 Links

- 🔴 **Live Demo**: [https://poland-full-stack-task.vercel.app](https://poland-full-stack-task.vercel.app)  
- 🟢 **Backend API**: [https://arunsamy-poland-fullstack-task.onrender.com/orders](https://arunsamy-poland-fullstack-task.onrender.com/orders)  
- 📁 **GitHub Repo**: [github.com/arunsamy4444/Poland_FullStack_task](https://github.com/arunsamy4444/Poland_FullStack_task)

---

## 🔐 Credentials for Testing

> Basic Auth is required for all API routes.

- **Username**: `admin`
- **Password**: `secret`

To test the frontend, the token is stored in localStorage. You can set it manually:

```js
// Open browser dev console and run:
localStorage.setItem("authToken", "YWRtaW46c2VjcmV0"); // base64 of "admin:secret"
﻿# Poland_FullStack_task
