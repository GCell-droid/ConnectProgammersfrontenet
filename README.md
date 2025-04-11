# 📍 DevConnect - Connect with Developers Seamlessly

Welcome to **DevConnect**, a dynamic matchmaking platform exclusively designed for developers and tech enthusiasts to discover, connect, and collaborate based on shared skills and interests. Think Tinder for developers — but smarter! 🚀

🌐 Live at: [http://13.61.7.169/](http://13.61.7.169/)  
🔗 Frontend Repo: [DevConnectFrontened](https://github.com/GCell-droid/ConnectProgammersfrontenet)  
🔗 Backend Repo: [DevConnectBackened](https://github.com/GCell-droid/CodeConnect)

---

## 🧠 Features

- 🔐 **User Authentication** – Signup/Login with JWT + Secure password hashing
- 📰 **Feed System** – Browse developer profiles based on tech stack
- 💖 **Interest & Connection Matching** – Send request based on your skill set
- 💬 **Real-Time Chat** – Chat with matched developers via Socket.io
- 🧑‍💻 **Edit Profile** – Live profile updates with toast notifications
- 📄 **Connection Requests** – Accept or reject requests from others
- 🧾 **View Connections** – Dedicated page to view your current connections
- 📨 **Connection Request Inbox** – Handle incoming connection invites
- 🔐 **Route Guarding** – Access restricted pages only after login
- 🔁 **Logout Feature** – End your session securely
- 🌍 **Deployment on AWS** – Live and scalable infrastructure


---

## 🧰 Tech Stack

### Frontend 🖼️
- **Vite + React.js** ⚛️
- **Tailwind CSS** 🎨
- **DaisyUI** 🌼
- **React Router DOM** 🚦
- **Redux Toolkit** 🧠
- **Axios** for API communication

### Backend ⚙️
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **Socket.io** for real-time communication
- **CORS** with proper config
- **JWT + bcrypt** for authentication

---

## 🧭 Project Structure

### Components Layout

```
<Body>
  ├── <NavBar />          # Navigation bar (dynamic on login)
  ├── <Routes>
  │   ├── "/"             # Feed
  │   ├── "/login"        # Login page
  │   ├── "/profile"      # Edit profile
  │   ├── "/connections"  # My connections
  │   ├── "/requests"     # Connection requests
  │   ├── "/chat/:id"     # Chat window
  └── <Footer />          # Common footer
```

### Folder Structure Suggestions
- `components/` – Reusable UI components (NavBar, Footer, Card, etc.)
- `constants/` – API base URL, routes, etc.
- `redux/` – Store configuration and slices

---

## 🔒 Auth Flow & Redux Integration

- Setup `configureStore()` using `@reduxjs/toolkit`
- Store auth token and user in Redux state
- Use `withCredentials: true` in Axios for API calls
- Guard routes using `PrivateRoute` component
- Auto redirect to `/login` if not authenticated
- NavBar dynamically updates on login/logout

---

## 💬 Real-Time Chat (Socket.io)

- 💡 Chat page available at `/chat/:targetUserId`
- Backend: Socket.io server setup with `npm i socket.io`
- Frontend: Client with `socket.io-client`
- Events: `message`, `joinRoom`, `receiveMessage`
- Custom `createSocketConnection()` utility for easy management

---

## 🔧 Local Setup

### Prerequisites

- Node.js v23.5.0
- MongoDB (Atlas or local)
- Git

### Steps

```bash
# Clone both repositories
git clone https://github.com/GCell-droid/ConnectProgammersfrontenet
git clone https://github.com/GCell-droid/CodeConnect
```

#### 📦 Frontend

```bash
cd ConnectProgammersfrontenet
npm install
npm run dev
```

#### ⚙️ Backend

```bash
cd CodeConnect
npm install
npm run start  # Or use PM2 for production
```

---

## 🚀 Deployment (AWS EC2)

### Frontend Deployment

```bash
npm run build
sudo apt install nginx
sudo cp -r dist/* /var/www/html/
```

### Backend Deployment

```bash
pm2 start npm --name "DevConnect-backend" -- start
pm2 logs
```

### NGINX Config (Proxy + Port Forwarding)

```
server {
    listen 80;

    location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/html/;
        index index.html;
    }
}
```

---

## 📈 Future Enhancements

- 📹 **Video Calling**
- 🤖 **AI-Powered Developer Recommendations**
- 🔍 **Advanced Profile Search**
- 🔔 **Push Notifications**


---

## 🤝 Contributors

- **Nitesh Parihar**  ([GCell-droid](https://github.com/GCell-droid))

Open to contributions! Fork the repo, make changes, and submit a pull request. Let’s build the next big dev community together!



## 🔗 Connect With Me

- 📧 Email: niteshparihar104@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/nitesh-parihar-530415171/)

---

Made with ❤️ by GCell-droid