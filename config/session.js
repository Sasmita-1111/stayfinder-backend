module.exports = {
  secret: process.env.SESSION_SECRET || "mysupersecretcode",
  resave: false,
  saveUninitialized: false,   // also important (prevents empty sessions)
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // ✅ FIX
    secure: false,
    sameSite: "lax"
  },
};
