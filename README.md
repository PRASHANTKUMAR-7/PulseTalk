# 🚀 PulseTalk — Real-Time Chat & Video Calling App

**PulseTalk** is a real-time chat and video calling application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It enables users to send instant messages, make high-quality video calls, and stay connected through a clean, modern interface. Designed with real-time communication at its core, PulseTalk is fast, responsive, and secure.

## ✨ Features

* 💬 Real-time messaging (1-on-1 & group chat) using **Socket.IO**
* 📞 Peer-to-peer video calls powered by **WebRTC**
* 🔒 JWT-based user authentication with **bcrypt**
* 🧑‍🤝‍🧑 Group creation and management
* 🧭 Online user detection (coming soon)
* 🧾 Chat history persistence with MongoDB
* 📱 Responsive and modern UI using **React**

## 🛠️ Tech Stack

**Frontend:** React.js, Axios, Socket.IO Client, WebRTC / PeerJS, Tailwind CSS
**Backend:** Node.js, Express.js, MongoDB (with Mongoose), Socket.IO, JWT, bcrypt

## 📁 Project Structure

```
PulseTalk/
├── client/           # React frontend
├── server/           # Express backend
├── models/           # MongoDB schemas
├── routes/           # API routes
├── sockets/          # Socket.IO handlers
├── config/           # Environment and DB config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

* Node.js
* MongoDB
* npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/pulsetalk.git
cd pulsetalk
```

2. Set up the backend

```bash
cd server
npm install
# Create a .env file and add:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/pulsetalk
# JWT_SECRET=your_jwt_secret
npm start
```

3. Set up the frontend

```bash
cd ../client
npm install
npm start
```

Visit `http://localhost:5173` to view the app.

## 🔮 Future Enhancements

* ✅ One-on-one messaging
* ✅ Peer-to-peer video calls
* ⏳ Group video/voice calls(Not Done Yet)
* ⏳ Media file sharing in chat
* ⏳ Message seen/delivered status
* ⏳ Push notifications
* ⏳ End-to-end encryption
* ⏳ Dark mode support
* ⏳ Dockerized deployment(Not Done Yet)

## 🌐 Deployment (Coming Soon)

* **Frontend**: Vercel / Netlify(if You required)
* **Backend**: Render / Railway(Both Done Here)
* **Database**: MongoDB Atlas

## 👨‍💻 Developer

**Prashant**
MERN Stack Developer | DSA Enthusiast | Future FAANG Engineer

* 📧 Email: [your.email@example.com](prashantk.stu@gmail.com)
* 🔗 LinkedIn: [linkedin.com/in/yourprofile](https://www.linkedin.com/in/prashant-kumar-b82a07380/)
* 💼 Portfolio: *Coming soon*

## 🤝 Contributing

Contributions, feedback, and feature requests are welcome!
Feel free to fork the project and open a pull request.

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

> Built with ❤️ by Prashant — because communication should be real-time, simple, and powerful.

