# 📝 Note Management System

## 📖 Project Overview
This project is a full-stack **MERN (MongoDB, Express, React, Node.js)** web application designed to allow users to securely create, edit, and delete personal notes. 

Beyond basic CRUD operations, this application is engineered with **industry-standard practices**, including:
* **User Authentication** for privacy.
* **Application Logging** (Pino) for monitoring.
* **Global Exception Handling** for stability.
* **Unit Testing** (Mocha/Chai & Jest) for reliability.

---

## 🏗️ Technology Stack

| Domain | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | User Interface & State Management |
| **Backend** | ![Node](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-404D59?style=flat) | RESTful APIs & Middleware |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) | NoSQL Data Storage |
| **Logging** | ![Pino](https://img.shields.io/badge/Pino-Logger-blue?style=flat) | Structured Application Logging |
| **Testing** | ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white) ![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=flat&logo=mocha&logoColor=white) | Unit & Integration Testing |

---

## 🚀 Key Features

### 🔐 1. Authentication & Authorization
* Secure **Sign Up & Log In** functionality.
* Session management to ensure users can only access their own notes.
* Protected routes to prevent unauthorized access.

### 📝 2. Note Management
* **Create:** Users can add new notes with titles and detailed descriptions.
* **Edit:** Update existing notes to keep information current.
* **Delete:** Remove notes that are no longer needed.
* **Rich Text Support:** (Optional) Support for better user experience in note editing.

### 🛡️ 3. Robust Engineering
* **Pino Logger:** Integrated structured logging for HTTP requests, errors, and user activities.
* **Global Exception Handling:** Middleware ensures the app handles errors gracefully without crashing, providing meaningful messages to the user.

### 🧪 4. Automated Testing
* **Backend:** Critical API endpoints are tested using **Mocha** and **Chai**.
* **Frontend:** UI components are validated using **Jest**.

---

## 💻 Application Screens

The application consists of the following key interfaces:
1.  **Auth Screen:** Secure Login and Registration forms.
2.  **Dashboard:** A responsive grid/list view displaying user-specific notes.
3.  **Note Editor:** A dedicated modal/page for creating and modifying note content.
4.  **User Profile:** Options to view user details and safely log out.

---

## ⚙️ Installation & Setup

### Prerequisites
* Node.js installed
* MongoDB URI (Local or Atlas)

### 1. Clone the Repository
```bash
git clone [https://github.com/ssiddiquiii/note-app.git](https://github.com/ssiddiquiii/note-app.git)
cd note-app