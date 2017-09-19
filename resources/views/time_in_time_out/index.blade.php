
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>
</head>
<body>
<div id="app"></div>123
<div id="map" style="widht: 500px;height: 500px"></div>
<script src="/js/timeintimeout.js"></script>

<script>
    function mark(lat, lng) {

      var uluru = {lat, lng};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }


    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation."
          break;
        case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable."
          break;
        case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred."
          break;
      }
    }

  function initMap() {
    navigator.geolocation.getCurrentPosition((position) => {
      mark(position.coords.latitude, position.coords.longitude);
    }, showError, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});

    navigator.geolocation.watchPosition((position) => console.log(position.coords));
  }

</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAoEgrLsTgTTnvtMXVcwe9PCabdnk3PtUI&callback=initMap"
        async defer></script>
</body>
</html>