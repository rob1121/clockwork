import React, { Component } from 'react';
import axios from 'axios';


const loadJS = (src) => {
  const ref = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
};

export default class Map extends Component {
  static mark(coords, map) {
    console.log(coords.lat());
    const marker = new google.maps.Marker({
      position: coords,
      map,
    });
  }

  static showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        console.log('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        console.log('An unknown error occurred.');
        break;
      default:
        break;
    }
  }


  constructor() {
    super();

    this.state = {
      location: '',
      longitude: '',
      latitude: '',
    };

    this.initMap = this.initMap.bind(this);
  }
  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAoEgrLsTgTTnvtMXVcwe9PCabdnk3PtUI&callback=initMap');
  }

  initMap() {
    let coords = {};
    let map = {};

    navigator.geolocation.getCurrentPosition((position) => {
      coords = { lat: position.coords.latitude, lng: position.coords.longitude };

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: coords,
      });


      // This event listener calls addMarker() when the map is clicked.
      google.maps.event.addListener(map, 'click', (event) => {
        Map.mark(event.latLng, map);
      });

      Map.mark(coords, map);
    }, Map.showError, { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true });

    navigator.geolocation.watchPosition((position) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAoEgrLsTgTTnvtMXVcwe9PCabdnk3PtUI`;
      axios.get(url).then((response) => {
        this.setState({
          location: response.data.results[0].formatted_address,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }, () => {
          console.log(this.state);
        });
      });
    });
  }

  render() {
    return (
      <div id="map" style={{ widht: '100%', height: 200 }} />
    );
  }
}
