var mongoose = require("mongoose");

var citySchema = mongoose.Schema({
  name: String,
  temps: String,
  picto: String,
  tempMax: Number,
  tempMin: Number,
  pressure: Number,
  humidity: Number,
  temp: Number,
  feels_like: Number,
  wind: Number,
  long: Number,
  lat: Number,
});
var CityModel = mongoose.model("cities", citySchema);
module.exports = CityModel;
