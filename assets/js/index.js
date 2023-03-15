var changedAdress = ''

var map = L.map('map').setView([40.37767, 49.89201], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

let locationIcon = L.icon({
  iconUrl: './assets/images/icon-location.svg',
  iconSize: [30, 40],
  iconAnchor: [10, 35]
})


function getIpAdress() {
  var ipAdress = $(".header-input input").val().trim();
  let lat = 0
  let lng = 0

  var marker = L.marker([lat, lng], {
    icon: locationIcon
  }).addTo(map);

  fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_hFRKXJtDiw5cinwP0DBS094tG0NEa&ipAddress=${ipAdress}`
    )
    .then((response) => response.json())
    .then((data) => {
      let timezone = "UTC " + data.location.timezone
      $(".ip").text(data.ip);
      $(".location").text(data.location.city);
      $(".timezone").text(timezone);
      $(".isp").text(data.isp);
      console.log(data);
      changedAdress = data.location.region
      lat = data.location.lat
      lng = data.location.lng
      console.log('data lat: ', lat)
      console.log('data lang: ', lng)
      map.setView([lat, lng], 14),
        marker.setLatLng([lat, lng])

    })
    .catch((error) => {
      error = "Please wait for a few minutes";
      console.log(error);
    });

  $(".header-input input").val("");

  console.log('Ip region changed: ', changedAdress);

}

window.onload(getIpAdress())