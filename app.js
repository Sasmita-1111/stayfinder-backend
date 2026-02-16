require("dotenv").config();  
// ======================
// 1️⃣ IMPORTS
// ======================
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const session = require("express-session");
const MongoStore =require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");

const connectDB = require("./config/db");
const initPassport = require("./config/passport");
const sessionConfig = require("./config/session");

const flashMiddleware = require("./middleware/flash.middleware");
const errorhandler = require("./middleware/error.middleware");
const ExpressError = require("./utils/ExpressError");

const listingRouter = require("./routes/listingRouter");
const reviewRouter = require("./routes/reviewRouter");
const userRouter = require("./routes/userRouter");

// ======================
// 2️⃣ APP INIT
// ======================
const app = express();
connectDB();

// ======================
// 3️⃣ VIEW ENGINE
// ======================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ======================
// 4️⃣ PARSING MIDDLEWARE
// ======================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

// ======================
// 5️⃣ SECURITY MIDDLEWARE
// ======================
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com"
        ],

        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.jsdelivr.net",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com"
        ],

        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://res.cloudinary.com",
          "https://*.cloudinary.com",
          "https://images.unsplash.com",
          "https://plus.unsplash.com"
        ],

        connectSrc: [
          "'self'",
          "https://api.cloudinary.com",
          "https://*.cloudinary.com",
          "https://cdn.jsdelivr.net"
        ],

        fontSrc: [
          "'self'",
          "data:",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com"
        ],

        objectSrc: ["'none'"]
      }
    }
  })
);

// rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later."
  })
);

// ======================
// 6️⃣ SESSION & AUTH
// ======================
app.set("trust proxy", 1); // important for deployment

// Create Mongo session store
const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,   // same DB you used in db.js
  crypto: {
    secret: sessionConfig.secret,
  },
  touchAfter: 24 * 3600, // reduce DB writes (1 day)
});

store.on("error", () => {
  console.log("SESSION STORE ERROR", err);
});

// attach store to session config
sessionConfig.store = store;

app.use(session(sessionConfig));

initPassport();

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// flash + user locals
app.use(flashMiddleware);

// ======================
// 7️⃣ ROUTES
// ======================
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ======================
// 8️⃣ 404 HANDLER
// ======================
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// ======================
// 9️⃣ ERROR HANDLER
// ======================
app.use(errorhandler);

module.exports = app;
