const passport = require("passport");
const User = require("../models/api/v1/User");
const config = require("config");

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

// Serialize user data for sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// WEBTOKEN STRATEGY (JWT)
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("jwt.secret");
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      // FIX: Use async/await instead of callback
      const user = await User.findOne({ _id: jwt_payload.uid });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
