var mongoose = require("mongoose");
var keys = require("../code/codes");
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,

  useUnifiedTopology: true,
};
mongoose.connect(keys.keyMongodb, options, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("===========connexion database ok==============");
  }
});
