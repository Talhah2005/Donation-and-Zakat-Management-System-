# 🏥 Donation & Zakat Management System (Saylani Welfare)

A complete Full-Stack solution for managing charitable donations, zakat, and relief campaigns. This project utilizes a modern architecture to ensure security, transparency, and ease of use.

---

## 🖥️ Backend Architecture

The backend is built with **Node.js** and **Express**, using a modular "Controller-Route-Model" architecture.

### **1. Entry Point & Middleware (`server.js`)**
- **Purpose**: Initializes the Express application, connects to the database, and registers global middleware.
- **Key Libraries**: `cors` (Cross-Origin Resource Sharing), `helmet` (Security headers), `morgan` (Logging), `dotenv` (Environment variables), `express-rate-limit` (DDoS protection).
- **Functions**: Sets up standard security layers and routing hierarchies for all API endpoints.

### **2. Configuration (`config/db.js`)**
- **Purpose**: Manages the connection to **MongoDB Atlas**.
- **Module**: `mongoose`.
- **Function**: `connectDB()` logs success or exits the process on failure.

### **3. Controllers (Business Logic)**
- **`authController.js`**:
    - **Purpose**: Handles user lifecycle (Signup, Login, Forgot Password).
    - **Main Functions**: `signup`, `login`, `verifyEmail`, `forgotPassword`, `resetPassword`.
    - **Logic**: Uses `bcryptjs` for security and `nodemailer` for transactional emails.
- **`googleAuthController.js`**:
    - **Purpose**: Secure social login integration.
    - **Library**: `google-auth-library`.
    - **Function**: `googleAuth` verifies ID tokens and auto-registers users.
- **`paymentController.js`**:
    - **Purpose**: Processes donor payments.
    - **Library**: `stripe`.
    - **Logic**: Handles session creation and secure webhooks for payment success confirmation.
- **`receiptController.js`**:
    - **Purpose**: Generates automated donation proofs.
    - **Library**: `pdfkit`.
    - **Logic**: Dynamically generates PDF files containing donation details and Saylani branding.
- **`dashboardController.js`**:
    - **Purpose**: Provides data for charts and tables.
    - **Logic**: Aggregates MongoDB data to provide total donations, campaign progress, and user stats.

### **4. Models (Data Schema)**
- **`User.js`**: Stores profiles, roles (Admin/User), and authentication metadata (googleId, authProvider).
- **`Donation.js`**: Tracks amounts, payment status, and donor links.
- **`Campaign.js`**: Defines relief goals, images, and descriptions.
- **`Receipt.js`**: Links donations to generated PDF metadata.

### **5. Middleware & Security**
- **`authMiddleware.js`**: Verifies JWT tokens on protected routes.
- **`roleMiddleware.js`**: Restricts sensitive actions (like deleting campaigns) to Admin users only.
- **`passwordUtils.js`**: Provides hashing and comparison functions using `bcryptjs`.

---

## 🎨 Frontend Architecture

The frontend is a **React** single-page application (SPA) focused on modularity and state management.

### **1. Core API Logic (`src/api/axios.js`)**
- **Purpose**: Centralizes all backend communication.
- **Library**: `axios`.
- **Advanced Logic**: 
    - **Request Interceptor**: Automatically attaches the JWT `Bearer` token from localStorage to every outgoing request.
    - **Response Interceptor**: Monitors for `401 Unauthorized` errors (expired tokens) and automatically redirects the user to the login page.

### **2. Authentication State (`src/context/AuthContext.jsx`)**
- **Purpose**: Provides a global "source of truth" for the logged-in user.
- **Functions**:
    - `login()` / `googleLogin()`: Communicates with the API and syncs user data to `localStorage`.
    - `logout()`: Clears session data and resets state.
    - `isAuthenticated()`: Helper to protect routes.
- **Why Context?**: It prevents "prop drilling" by allowing any component (Dashboard, Navbar, CampaignCard) to access user info directly.

### **3. Routing & Structure (`src/App.jsx`)**
- **Architecture**: Uses `react-router-dom` to manage paths.
- **Protected Routes**: Wraps sensitive pages (Dashboards) in logic that checks if a user is authenticated before allowing access.

### **4. Component Breakdown**
- **Dashboards (`UserDashboard.jsx`, `AdminDashboard.jsx`)**: Fetch statistics from the backend and render dynamic charts/tables.
- **Auth Forms (`LoginForm.jsx`, `SignupForm.jsx`)**: Manage local form state and trigger the Context-based auth functions.
- **Campaigns**: Renders relational data from MongoDB, allowing users to donate to specific causes.

---

## 🛠️ Main Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, Stripe API, Nodemailer, PDFKit.
- **Frontend**: React, Axios, React Router, Tailwind CSS, Lucide-react.
- **Deployment**: Vercel (Production environments).
