// api key: at_hFRKXJtDiw5cinwP0DBS094tG0NEa
// fetch country: https://geo.ipify.org/api/v2/country?apiKey=at_hFRKXJtDiw5cinwP0DBS094tG0NEa&ipAddress=8.8.8.8
// fetch city: https://geo.ipify.org/api/v2/country,city?apiKey=at_hFRKXJtDiw5cinwP0DBS094tG0NEa&ipAddress=8.8.8.8

$(document).ready(function () {
  $(".header-input button").on("click", function () {
    var ipAdress = $(".header-input input").val().trim();

    fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=at_hFRKXJtDiw5cinwP0DBS094tG0NEa&ipAddress=${ipAdress}`
    )
      .then((response) => response.json())
      .then((data) => {
        var adress = data.location.region
        $(".ip").text(data.ip);
        $(".location").text(data.location.region);
        $(".timezone").text("UTC " + data.location.timezone);
        $(".isp").text(data.isp);
        console.log(data);
        /*
        console.log("IP: ", data.ip);
        console.log("ISP: ", data.isp);
        console.log("COUNTRY: ", adress);
        console.log("Timezone: UTC ", data.location.timezone); */
      })
      .catch((error) => {
        error = "Please wait for a few minutes";
        console.log(error);
      });

    $(".header-input input").val("");
  });

  function initMap() {
    var options = {
      zoom: 10,
      center: new google.maps.LatLng(40.409264, 49.867092),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    //new map
    var map = new google.maps.Map(document.getElementById('map'), options)
    console.log('map')

    $(".location").on('DOMSubtreeModified',function(){
      console.log('location changed: ', $('.location').text());
      var arr =  $('.location').text().split(' ')

      console.log(arr[0]);
    });

    //add marker
    google.maps.event.addListener(map, 'click', function(property) {
      var location = property.latLng

      console.log('changed map location: ', location)
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: './assets/images/icon-location.svg'
      })

      let lat = marker.getPosition().lat()
      let lng = marker.getPosition().lng()

      console.log(lat);
      console.log(lng);

      $.ajax({
        method: 'POST',
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAAtTwMx2OsK4Wk5HidozFBsz_0OQ_pJbo`,
        success: function (data) {
          console.log(data.results[0].formatted_address);
        }
      });
    })
   
  }
  window.initMap = initMap;
});


   // Initialize and add the map
   

  //Call Geocode 

  // geocode()

  // function geocode() {
  //   var location = '22 Main st Boston MA';

  //   axios.get()
  // }