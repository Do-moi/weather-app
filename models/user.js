var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
var UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
