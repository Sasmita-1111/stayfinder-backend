# 🏠 StayFinder — Rental Booking Web App

A full-stack rental marketplace where users can list properties, upload images and post reviews with secure authentication.

🔗 **Live:** https://stayfinder-backend-0885.onrender.com/listings

🔐 Demo Login  
Email: demo@stayfinder.com  
Password: 12345678

---

## ✨ Key Features
- Secure authentication & sessions
- Property listing CRUD operations
- Image uploads via Cloudinary
- Review & rating system
- Authorization (owner-only edits)
---
## 🛠 Tech Stack
**Frontend:** HTML • CSS • Bootstrap • EJS  
**Backend:** Node.js • Express.js  
**Database:** MongoDB Atlas • Mongoose  
**Authentication & Storage:** Passport.js • Express Session • Multer • Cloudinary

## 🧠 What I Learned
- Designing RESTful routes in Express
- Managing authentication using Passport.js
- Handling file uploads and cloud storage
- Structuring scalable MVC architecture
- Deploying production backend on Render
  
## 📂 Project Structure
```
server.js      → start server
app.js         → app configuration
models/        → schemas
routes/        → routing
controllers/   → logic
views/         → frontend
public/        → static files
config/        → db & auth setup
```

---
## ⚙️ Run Locally
```bash
git clone https://github.com/Sasmita-1111/stayfinder-backend
cd stayfinder-backend
npm install
npm start
```
---
## 🔐 Environment Variables
Create a `.env` file:
```
ATLASDB_URL=your_mongodb_url
CLOUD_NAME=your_cloudinary_name
CLOUD_KEY=your_cloudinary_key
CLOUD_SECRET=your_cloudinary_secret
SESSION_SECRET=anything
```
---
