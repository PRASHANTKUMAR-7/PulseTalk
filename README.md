# 💬 PulseTalk — Real-Time Chat & Video Calling App

> 🚀 Built with the MERN stack — because communication should be real-time, simple, and powerful.

PulseTalk is a full-stack real-time communication platform. Chat instantly, call face-to-face,
get friend notifications, and even translate messages into 13+ languages — all in one place.

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🌍 Translation Feature](#-translation-feature)
- [🔔 Notification System](#-notification-system)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Developer](#-developer)
- [📜 License](#-license)

---

## ✨ Features

### ✅ Already Built
- 🔐 Secure signup and login with JWT and bcrypt
- 👥 Send, accept, and manage friend requests
- 🔔 Real-time bell icon with unread notification count
- 💬 Instant 1-on-1 messaging via Stream Chat
- 📞 Face-to-face video calling via Stream Video
- 🌍 Translate messages into 13+ languages instantly
- 🎨 Multiple UI themes via DaisyUI
- 📱 Fully responsive on mobile and desktop

### ⏳ Coming Soon
- 👥 Group video calls
- 📁 File and image sharing in chat
- ✅ Message seen / delivered status
- 🔒 End-to-end encryption
- 🛎️ Push notifications
- 🐳 Dockerized deployment

---

## 🛠️ Tech Stack

> 💡 New to some of these? Here is what each one does in plain English.

### 🖥️ Frontend

- ⚛️  React.js — builds all the UI components and pages you see on screen
- 🔄 TanStack Query — fetches data from backend smartly with caching and auto-refetching
- 🎨 Tailwind CSS + DaisyUI — makes everything look beautiful without writing much CSS
- 💬 Stream Chat React — ready-made chat UI components like message list and input box
- 🖼️  Lucide React — clean icon library used throughout the app
- 🧭 React Router — handles navigation between pages like Home, Chat, and Notifications

### ⚙️ Backend

- 🟢 Node.js — runs JavaScript on the server
- 🚂 Express.js — creates all the API routes the frontend talks to
- 🍃 MongoDB + Mongoose — stores all data including users, friend requests, and notifications
- 🔑 JWT + bcrypt — keeps accounts secure by handling login tokens and password hashing
- 📡 Stream SDK — powers real-time chat and video calling

---

## 📁 Project Structure

```
PulseTalk/
│
├── 📁 backend/
│   └── src/
│       ├── 📁 controller/
│       │   ├── auth.controller.js            # 🔐 Signup, login, logout logic
│       │   ├── user.controller.js            # 👥 Friends and friend request logic
│       │   └── notification.controller.js    # 🔔 Get, count, and mark notifications
│       │
│       ├── 📁 models/
│       │   ├── user.js                       # 👤 User data shape in MongoDB
│       │   ├── FriendRequest.js              # 🤝 Friend request data shape
│       │   └── Notification.js               # 🔔 Notification data shape
│       │
│       ├── 📁 routes/
│       │   ├── auth.route.js                 # /api/auth/*
│       │   ├── user.route.js                 # /api/users/*
│       │   ├── chat.route.js                 # /api/chat/*
│       │   └── notification.route.js         # /api/notifications/*
│       │
│       ├── 📁 middleware/
│       │   └── auth.middleware.js            # 🛡️ Checks if user is logged in
│       │
│       └── 📁 lib/
│           ├── db.js                         # 🍃 MongoDB connection setup
│           └── stream.js                     # 📡 Stream Chat client setup
│
├── 📁 frontend/
│   └── src/
│       ├── 📁 pages/
│       │   ├── HomePage.jsx                  # 🏠 Friend discovery page
│       │   ├── ChatPage.jsx                  # 💬 Main chat interface
│       │   ├── NotificationPage.jsx          # 🔔 Friend requests and alerts
│       │   ├── LoginPage.jsx                 # 🔑 Login form
│       │   └── SignUpPage.jsx                # 📝 Signup form
│       │
│       ├── 📁 components/
│       │   ├── Navbar.jsx                    # 🔝 Top navigation bar with bell icon
│       │   ├── ChatHeader.jsx                # 💬 Chat top bar with home and call buttons
│       │   ├── CustomMessage.jsx             # 🌍 Message bubble with translation support
│       │   ├── LanguageSelector.jsx          # 🌐 Floating language picker button
│       │   ├── CallButton.jsx                # 📞 Video call trigger button
│       │   └── ThemeSelector.jsx             # 🎨 UI theme switcher
│       │
│       ├── 📁 hooks/
│       │   ├── useAuthUser.js                # 👤 Gets the current logged in user
│       │   ├── useNotifications.js           # 🔔 Handles unread count and mark as read
│       │   └── useTranslation.js             # 🌍 All translation logic with caching
│       │
│       ├── 📁 context/
│       │   └── TranslationContext.jsx        # 🌐 Shares language preference across app
│       │
│       └── 📁 lib/
│           ├── api.js                        # 📡 All API call functions in one place
│           └── axios.js                      # ⚙️ Axios instance with base URL configured
│
└── 📜 README.md
```

---

## 🚀 Getting Started

> ⏱️ Follow these steps and you will have PulseTalk running in under 10 minutes.

### 🔧 Prerequisites

Make sure you have these installed on your machine:

- 🟢 Node.js v18 or higher — https://nodejs.org
- 🍃 MongoDB or a free MongoDB Atlas account — https://cloud.mongodb.com
- 📦 npm comes included with Node.js

### 📥 Step 1 — Clone the Project

```bash
git clone https://github.com/your-username/pulsetalk.git
cd pulsetalk
```

### ⚙️ Step 2 — Backend Setup

```bash
cd backend
npm install
```

Create a file named `.env` inside the `backend/` folder and add:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=any_long_random_string_here
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
```

> 💡 Get your free Stream API keys at https://getstream.io — takes 2 minutes to sign up.

Start the backend server:

```bash
nodemon server.js
```

You should see this in the terminal:

```
🚀 Server is running on port 5001
✅ Good to go! MongoDB connected successfully
```

### 🎨 Step 3 — Frontend Setup

```bash
cd ../frontend
npm install
```

Create a file named `.env` inside the `frontend/` folder and add:

```env
VITE_STREAM_API_KEY=your_stream_api_key_here
```

> ⚠️ Only the API Key goes here. Never put the API Secret in the frontend!
> The VITE_ prefix is required by Vite to expose the variable to the browser.

Start the frontend:

```bash
npm run dev
```

🎉 Visit http://localhost:5173 and PulseTalk is live!

---

## 🌍 Translation Feature

PulseTalk has a built-in real-time message translator powered by the free **MyMemory API**.
No API key required — works out of the box!

### 📖 How to Use

```
1. 💬 Open any chat conversation
2. 🌐 Click the floating language button in the bottom right corner
3. 🗂️ Select your preferred language from the dropdown
4. ✨ All visible messages instantly translate
5. 📨 New incoming messages auto-translate as well
6. 🇬🇧 Select English to turn translation off
```

### ⚡ Smart Optimizations Built In

- 🔭 Lazy loading — only translates messages currently visible on screen
- 💾 Caching — never calls the API for the same message twice
- 🔄 Auto-reset — switching language clears old translations cleanly
- 🛡️ Fallback — if translation fails, original message is shown instead
- ❌ Abort on switch — cancels in-flight API calls when language changes quickly

### 🗺️ Supported Languages

```
🇮🇳 Hindi      🇪🇸 Spanish     🇫🇷 French      🇩🇪 German
🇨🇳 Chinese    🇸🇦 Arabic      🇧🇷 Portuguese  🇷🇺 Russian
🇯🇵 Japanese   🇰🇷 Korean      🇮🇹 Italian     🇧🇩 Bengali
🇵🇰 Urdu
```

---

## 🔔 Notification System

Here is exactly how the notification system works step by step:

```
👤 User A sends a friend request
        ↓
💾 Backend saves a Notification in MongoDB
        ↓
🔔 User B's bell icon polls for unread count every 10 seconds
        ↓
🔴 Bell badge updates automatically showing the unread count
        ↓
👆 User B opens the Notification page
        ↓
✅ All notifications marked as read — count resets to zero
        ↓
🔄 Notifications persist after refresh because they live in the database
```

---

## 🌐 Deployment

| Part       | Platform              | Status        |
|------------|-----------------------|---------------|
| 🖥️ Frontend | Vercel or Netlify     | ⏳ Coming Soon |
| ⚙️ Backend  | Render or Railway     | ⏳ Coming Soon |
| 🍃 Database | MongoDB Atlas         | ✅ Ready       |

---

## 🤝 Contributing

Contributions are always welcome! Here is how to get started:

```bash
# Step 1 — Fork the project on GitHub

# Step 2 — Create your feature branch
git checkout -b feature/your-feature-name

# Step 3 — Make your changes and commit
git commit -m "✨ Add your feature description here"

# Step 4 — Push to your branch
git push origin feature/your-feature-name

# Step 5 — Open a Pull Request on GitHub
```

---

## 👨‍💻 Developer

```
Prashant Kumar
MERN Stack Developer | DSA Enthusiast | Future FAANG Engineer
```

- 📧 Email — prashantk.stu@gmail.com
- 💼 LinkedIn — https://www.linkedin.com/in/prashant-kumar-b82a07380/
- 🌐 Portfolio — Coming Soon

---

## 📜 License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for full details.

---

⭐ If you found this project helpful, please give it a star on GitHub — it means a lot!

> 💬 Built with ❤️ by Prashant — because communication should be real-time, simple, and powerful.