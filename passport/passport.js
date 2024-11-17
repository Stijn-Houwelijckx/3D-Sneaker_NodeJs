const passport = require("passport");
const User = require("../models/api/v1/User");

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

// Serialize user data for sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
