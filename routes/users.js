var express = require("express");
var router = express.Router();
var UserModel = require("../models/user");

/* GET users listing. */
router.post("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
/*================================================= GET /sign-up =================================*/
router.post("/sign-up", async function (req, res, next) {
  var existUser = await UserModel.findOne({ email: req.body.email });
  if (existUser == null) {
    var newUser = await new UserModel({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    var userSave = await newUser.save();

    req.session.user = { id: userSave._id, name: userSave.name };
    res.redirect("/weather");
  } else {
    var error;
    var error1 = "vous ètes déjà enregistré";
    res.render("login", { error, error1 });
  }
});
/*================================================= GET /sign-in =================================*/
router.post("/sign-in", async function (req, res, next) {
  var error;
  var error1;

  var findUser = await UserModel.findOne({ email: req.body.email });

  if (findUser == null) {
    error = "email incorrect";
    res.render("login", { error, error1 });
  }
  if (findUser) {
    if (findUser.password == req.body.password) {
      req.session.user = { id: findUser._id, name: findUser.name };
      res.redirect("/weather");
    } else {
      error = "password incorrect";
      res.render("login", { error, error1 });
    }
  }
});
/*================================================= GET /déconnexion =================================*/
router.get("/deconnexion", function (req, res, next) {
  var error;
  var error1;
  req.session.user = null;
  res.render("login", { error, error1 });
});
module.exports = router;
