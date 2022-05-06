var ville = document.getElementsByClassName("ville");

var mymap = L.map("worldmap", {
  center: [48.866667, 2.333333],
  zoom: 3,
  zoomControl: false,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

var customIcon = L.icon({
  iconUrl: "./images/leaf-green.png",
  shadowUrl: "./images/leaf-shadow.png",

  iconSize: [38, 95],
  shadowSize: [50, 64],

  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],

  popupAnchor: [-3, -76],
});

for (var i = 0; i < ville.length; i++) {
  L.marker([ville[i].dataset.lat, ville[i].dataset.lon], { icon: customIcon })
    .addTo(mymap)
    .bindPopup(ville[i].dataset.name);
}
$("#exampleModal").on("show.bs.modal", function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var name = button.data("name"); // Extract info from data-* attributes
  var temps = button.data("temps");
  var tempMax = button.data("tempmax");
  var tempMin = button.data("tempmin");
  var temp = button.data("temp");
  var feelLike = button.data("feelslike");
  var wind = button.data("wind");
  var pressure = button.data("pressure");
  var humidity = button.data("humidity");
  var long = button.data("long");
  var lat = button.data("lat");

  var modal = $(this);
  modal.find(".modal-title").text(name);
  modal.find(".modal-temps").text("temps : " + temps);
  modal.find(".modal-tempMax").text("Température maximum : " + tempMax + " °C");
  modal.find(".modal-tempMin").text("Température minimum : " + tempMin + " °C");
  modal.find(".modal-temp").text("Température actuelle : " + temp + " °C");
  modal
    .find(".modal-feelLike")
    .text("Température ressentie : " + feelLike + " °C");
  modal.find(".modal-wind").text("Vitesse du vent : " + wind + " km/h");
  modal.find(".modal-pressure").text("Pression atmosphérique : " + pressure);
  modal.find(".modal-humidity").text("Humidité de l'air : " + humidity);
  modal.find(".modal-long").text(" Longitude: " + long);
  modal.find(".modal-lat").text("Latitude : " + lat);
});
