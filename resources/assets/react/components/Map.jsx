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
  constructor() {
    super();

    this.state = {
      location: '',
      longitude: '',
      latitude: '',
    };

    this.showError = this.showError.bind(this);
    this.mark = this.mark.bind(this);
    this.initMap = this.initMap.bind(this);
  }
  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAoEgrLsTgTTnvtMXVcwe9PCabdnk3PtUI&callback=initMap');
  }

  mark(lat, lng) {

    const coords = { lat, lng };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: coords,
    });
    const marker = new google.maps.Marker({
      position: coords,
      map: map,
    });
  }

  showError(error) {
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

  initMap() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.mark(position.coords.latitude, position.coords.longitude);
    }, this.showError, { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true });

    navigator.geolocation.watchPosition((position) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAoEgrLsTgTTnvtMXVcwe9PCabdnk3PtUI`;
      axios.get(url).then((response) => {
        this.setState({
          location: response.data.results[0].formatted_address,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    });
  }

  render() {
    return (
      <div id="map" style={{ widht: '100%', height: '200' }} />
    );
  }
}
