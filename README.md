
# Real-Time Chat Application

A scalable real-time chat app built with React, Node.js, Express, MongoDB, and Socket.IO. Features secure authentication, profile management, instant messaging, live user presence, and dynamic theme switching for a personalized user experience. Uses Zustand for state management, Cloudinary for media, and is deployed on Vercel and Render for global performance.---

## 🚀 Features

- **Real-time Messaging:** Instant bi-directional communication powered by WebSockets (Socket.IO) with reliable message delivery and dynamic online presence tracking.
- **Robust Authentication:** Secure JWT-based authentication with cookie management and session validation.
- **Advanced State Management:** Lightweight and reactive global state handled by Zustand for performant UI updates.
- **Media Support:** Upload and share images using Cloudinary’s cloud media pipeline, enabling optimized delivery and transformations.
- **CORS-Safe Cross-Origin Requests:** Fine-grained CORS policy allowing trusted frontend domains to connect, ensuring security without compromising functionality.
- **Responsive UI:** Modern React frontend with context-aware components and customizable themes.
- **Scalable Backend:** Node.js and Express REST APIs interfaced with MongoDB Atlas, supporting efficient querying and data integrity.
- **Deployment:** Automated CI/CD pipelines deploying frontend on Vercel and backend on Render with environment-aware configurations.

---

## 🛠️ Technology Stack

| Layer            | Technology                   | Purpose                                         |
|------------------|------------------------------|------------------------------------------------|
| Frontend         | React, React Hot Toast, Zustand | Declarative UI, state management, notifications |
| Backend          | Node.js, Express, Socket.IO  | REST API, real-time communication               |
| Database         | MongoDB Atlas                | Persistent user and message storage             |
| Media Storage    | Cloudinary                  | Cloud-based image hosting and optimization      |
| Deployment       | Vercel (frontend), Render (backend) | Scalable cloud deployment and hosting            |
| Authentication   | JWT, Cookies                | Secure stateless authentication                  |

---


## ➡️ Usage
* Register a new user or log in to your existing account.
* Chat in real-time with online users seamlessly.
* Upload and update your profile picture anytime.
* View chat history with any user to keep track of conversations.
* Logout securely to protect your account.

---





## 📁 Project Structure Overview

```
/frontend
 ├─ public/                      # Public static assets
 │    ├─ avatar.png              # Default avatar image
 │    └─ vite.svg                # Vite logo asset
 │
 └─ src/
      ├─ App.jsx                 # Root React component
      ├─ index.css               # Global CSS styles
      ├─ main.jsx                # React entry point
      │
      ├─ assets/                 # Static assets used in app
      │    └─ react.svg          # React logo image
      │
      ├─ components/             # Reusable React UI components
      │    ├─ AuthimagePattern.jsx
      │    ├─ ChatContainer.jsx
      │    ├─ ChatHeader.jsx
      │    ├─ MessageInput.jsx
      │    ├─ Navbar.jsx
      │    ├─ NoChatSelected.jsx
      │    ├─ Sidebar.jsx
      │    └─ skeletons/         # Loading skeleton components
      │         ├─ MessageSkeleton.jsx
      │         └─ SidebarSkeleton.jsx
      │
      ├─ constants/              # Constants and config values
      │    └─ index.js
      │
      ├─ lib/                    # Utility libraries and helpers
      │    ├─ axios.js           # Axios instance setup
      │    └─ utils.js           # Utility functions
      │
      ├─ Pages/                  # React pages (views/routes)
      │    ├─ HomePage.jsx
      │    ├─ LoginPage.jsx
      │    ├─ ProfilePage.jsx
      │    ├─ SettingsPage.jsx
      │    └─ SignUpPage.jsx
      │
      └─ store/                  # Zustand global state stores
           ├─ useAuthStore.js
           ├─ useChatStore.js
           └─ useThemeStore.js


/backend
 └─ src/
     ├─ index.js                  # Server entry point & Socket.IO integration
     ├─ controllers/             # Express route controllers
     │    ├─ auth.controller.js
     │    └─ message.controller.js
     ├─ lib/                     # Utility libraries and service setups
     │    ├─ cloudinary.js       # Cloudinary media configuration
     │    ├─ db.js               # Database connection setup (MongoDB)
     │    ├─ socket.js           # Socket.IO configuration and events
     │    └─ utils.js            # Helper utility functions
     ├─ middleware/              # Express middleware
     │    └─ auth.middleware.js  # Authentication middleware (JWT validation etc.)
     ├─ models/                  # Mongoose schemas/models
     │    ├─ message.models.js
     │    └─ user.models.js
     ├─ routes/                  # API route definitions
     │    ├─ auth.route.js
     │    └─ message.route.js
     └─ seeds/                   # Seed data scripts for initial DB population
          └─ user.seed.js

```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v18+  
- MongoDB Atlas account or local MongoDB instance  
- Cloudinary account for media management  
- Git  

### Clone Repository

```bash
git clone https://github.com/akankshnalam02/Full_stack_web_app.git
cd Full_stack_web_app
```

### Environment Variables

Create `.env` files in both `frontend` and `backend` with appropriate variables:

**Backend `.env`**

```env
PORT=5003
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Frontend `.env`**

```env
VITE_API_BASE_URL=http://localhost:5003
```

---

### Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

---

### Running Locally

**Backend**

```bash
npm start or npm run dev
```

**Frontend**

```bash
npm run dev or npm start
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 🔧 Deployment Details

- **Frontend** deployed on [Vercel](https://vercel.com)  
- **Backend** deployed on [Render](https://render.com)

The backend uses environment-aware CORS policies to allow secure WebSocket connections only from trusted frontend origins.





## 🙌 Contribution & Support

Feel free to open issues or submit pull requests for improvements or bug fixes.  
Reach out on [GitHub Discussions](https://github.com/akankshnalam02/Full_stack_web_app/discussions) or email: `your-email@example.com`.





## 📜 License

This project is licensed under the [MIT License](LICENSE).
See the LICENSE file for full details.

---



