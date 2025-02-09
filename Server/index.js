const express = require("express");
require("dotenv").config();
const app = express();
const { connectDatabase } = require("./db");
const { router } = require("./routes");
const { User } = require("./model/user-model");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.use(express.json());
app.use(
  cors({
    origin: "https://auth-v1-alpha.vercel.app", // Set the specific frontend URL here
    credentials: true,  // Important for cookies, sessions, and authorization headers
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "Harsh",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

connectDatabase("mongodb+srv://sumit:sumit@cluster0.gvjdh.mongodb.net/auth");

//basic authentication route
app.use(router);

//google authentication route
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://auth-v1-4.onrender.com/auth/google/callback",
      passReqToCallback : true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          return done(null, user); // User exists, proceed with login
        }

        // Create a new user if not found
        user = new User({
          googleId: profile.id,
          userName: profile.displayName,
          email: profile.emails[0].value,
        });

        await user.save();
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

app.get("/logout", (req, res) => {
  req.logout(() => res.redirect(`${process.env.CLIENT_URL}`));
});

// Get User Info
app.get("/user", (req, res) => res.send(req.user));

app.listen(process.env.PORT, () =>
  console.log(`Server started in on ${process.env.PORT}`)
);
