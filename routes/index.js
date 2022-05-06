var express = require("express");
var router = express.Router();
var request = require("sync-request");
require("../models/bdd");
var CityModel = require("../models/city");
var keys = require("../code/codes");
/* ===========================================GET home page. ===================================*/
router.get("/", function (req, res, next) {
  var error;
  var error1;
  res.render("login", { error, error1 });
});
/* ===========================================GET /weather. ===================================*/
router.get("/weather", async function (req, res, next) {
  var cityList = await CityModel.find();
  var error;

  res.render("weather", { cityList, error });
});
/* ===========================================GET /addCity. ===================================*/
router.post("/addCity", async function (req, res, next) {
  var cityList = await CityModel.find();
  var exist = false;
  var error = false;
  var message;

  if (cityList.length > 4) {
    error = true;
    message = "Maximum 5 cities";
  } else {
    for (var i = 0; i < cityList.length; i++) {
      if (req.body.newCity.toLowerCase() === cityList[i].name.toLowerCase()) {
        exist = true;
      }
    }
    if (exist == false) {
      var result = request(
        "get",
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          req.body.newCity +
          "&units=metric&lang=fr&appid=" +
          keys.keyApi
      );
      var jsonResult = JSON.parse(result.body);

      if (jsonResult.cod == "400" || jsonResult.cod == "404") {
        error = true;
        message = "City no found !!";
      } else {
        var NewCity = await new CityModel({
          name: req.body.newCity.toUpperCase(),
          temps: jsonResult.weather[0].description,
          picto: jsonResult.weather[0].icon,
          tempMax: Math.round(jsonResult.main.temp_max),
          tempMin: Math.round(jsonResult.main.temp_min),
          pressure: jsonResult.main.pressure,
          humidity: jsonResult.main.humidity,
          temp: Math.round(jsonResult.main.temp),
          feels_like: Math.round(jsonResult.main.feels_like),
          wind: jsonResult.wind.speed,
          long: jsonResult.coord.lon,
          lat: jsonResult.coord.lat,
        });
        var citySave = await NewCity.save();

        cityList.push(citySave);
      }
    }
  }

  res.render("weather", { cityList, error, message });
});
/* ===========================================GET /delete ===================================*/
router.get("/delete", async function (req, res, next) {
  var error;

  await CityModel.deleteOne({
    _id: req.query.id,
  });

  var cityList = await CityModel.find();
  res.render("weather", { cityList, error });
});
/* ===========================================GET /update. ===================================*/
router.get("/update", async function (req, res, next) {
  if (req.session.user == null) {
    res.redirect("/");
  } else {
    var cityList = await CityModel.find();

    var error;
    if (cityList.length < 1) {
      res.render("weather", { cityList, error });
    } else {
      for (var i = 0; i < cityList.length; i++) {
        var result = request(
          "get",
          `http://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&units=metric&lang=fr&appid=${keys.keyApi}`
        );
        var resultJson = JSON.parse(result.body);

        await CityModel.updateOne(
          { _id: cityList[i]._id },
          {
            name: cityList[i].name,
            temps: resultJson.weather[0].description,
            picto: resultJson.weather[0].icon,
            tempMax: Math.round(resultJson.main.temp_max),
            tempMin: Math.round(resultJson.main.temp_min),
            pressure: resultJson.main.pressure,
            humidity: resultJson.main.humidity,
            temp: Math.round(resultJson.main.temp),
            feels_like: Math.round(resultJson.main.feels_like),
            wind: resultJson.wind.speed,
          }
        );
      }
    }

    cityList = await CityModel.find();
  }

  res.render("weather", { cityList, error });
});

module.exports = router;
