const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", UserSchema);

module.exports = User;
