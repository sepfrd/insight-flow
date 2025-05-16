# **InsightFlow Frontend**

This is the **React frontend** for the [InsightFlow v2](https://github.com/sepfrd/InsightFlow) application — a full-stack blog platform built with a Clean Architecture .NET backend and a modern, user-friendly React frontend. It provides dark mode support, authentication, blog post CRUD functionality, and global toast notifications.

---

## **Table of Contents**

- [Features](#features)
- [Technologies](#technologies)
- [Usage](#usage)
- [Architecture](#architecture)
- [Project Structure](#project-structure)

---

## **Features**

- 🌙 **Dark Mode Support** – Switch between light and dark themes using a custom `ThemeContext`.
- 🔐 **Authentication** – Login and registration using JWT from the backend API.
- 📝 **Blog Management** – Create, edit, delete, and list your blog posts.
- 📦 **Global Toast Notifications** – Reusable global `ToastContext` and `ToastContainer` for user feedback.
- 📁 **Paginated Blog View** – See blog posts with support for filters and pagination.
- 🔄 **Local Storage Integration** – Persist authentication and theme preferences across sessions.

---

## **Technologies**

- **React** (with Hooks)
- **React Router**
- **Axios** – for HTTP communication with the .NET API
- **React Toastify** – for global toast notifications
- **Context API** – for global state management (auth, theme, toast, storage)
- **IndexedDB** – for local image persistence (in uploader)
- **CSS / Tailwind (optional)** – or your own styling framework

---

## **Usage**

### **1. Prerequisites**

- Node.js >= 16
- The InsightFlow backend running on `http://localhost:8000` or your preferred API base URL

### **2. Installation**

(for backend installation please refer to [InsightFlow v2](https://github.com/sepfrd/InsightFlow))

```bash
git clone https://github.com/your-username/insightflow-frontend.git
cd insightflow-frontend
npm install
```

### **3. Configure Environment**

Create a `.env` file in the root with the following (adjust as needed):

```env
REACT_APP_API_URL=http://localhost:8000/api
```

### **4. Run the App**

```bash
npm run dev   # or npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Architecture**

This frontend is built using a **modular context-based approach**, with separation of concerns across:

- `AuthContext` – Handles JWT-based authentication
- `ThemeContext` – Manages light/dark theme toggling
- `ToastContext` – Centralized toast trigger system
- `StorageContext` – Manages IndexedDB storage

Each feature (like BlogPosts, Auth, etc.) is encapsulated in its own page/component, making the app scalable and maintainable.

---

## **Project Structure**

```plaintext
src
├── api
│   ├── apiClients.js
│   ├── authService.js
│   ├── blogPostService.js
│   ├── storageService.js
│   └── userService.js
├── App.css
├── App.js
├── assets
│   └── fonts
├── blog-posts.json
├── components
│   ├── BlogPosts.js
│   ├── EditableBlogPostModal.js
│   ├── GlobalToast.js
│   ├── NavigationBar.js
│   ├── PaginatedResult.js
│   ├── SingleBlogPost.js
│   ├── Uploader.js
│   └── UserCard.js
├── contexts
│   ├── AuthContext.js
│   ├── StorageContext.js
│   ├── ThemeContext.js
│   └── ToastContext.js
├── index.css
├── index.js
├── pages
│   ├── CreateBlogPost.js
│   ├── Home.js
│   ├── Login.js
│   ├── NotFound.js
│   ├── Profile.js
│   ├── Signup.js
│   └── UserBlogPosts.js
├── styles
│   ├── authentication.css
│   ├── blog-posts.css
│   ├── editable-blog-post.css
│   ├── modal.css
│   ├── NavigationBar.css
│   ├── not-found.css
│   ├── pagination.css
│   ├── profile.css
│   ├── singleBlogPost.css
│   ├── uploader.css
│   └── userCard.css
└── utils
    ├── constants.js
    └── toastService.js
```

---

## **Backend Integration**

This frontend is tightly integrated with the [InsightFlow .NET Web API](https://github.com/sepfrd/InsightFlow), using:

- JWT tokens for secure routes and user sessions
- `/api/auth/*`, `/api/users/*`, `/api/blog-posts/*` and other endpoints for functionality
- Axios interceptors to attach tokens and handle global error toasts
