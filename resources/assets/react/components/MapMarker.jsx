import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


export default class Map extends Component {
  /**
   * load google map async
   * 
   * @static
   * @param {any} src 
   * @memberof Map
   */
  static loadJS(src) {
    const ref = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }

  /**
   * show error
   * 
   * @static
   * @param {any} error 
   * @memberof Map
   */
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
      lng: '',
      lat: '',
      marker: undefined,
      map: undefined,
    };

    this.initMap = this.initMap.bind(this);
    this.mark = this.mark.bind(this);
    this.addMapEventOnClick = this.addMapEventOnClick.bind(this);
  }

  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap;

    // Asynchronously load the Google Maps script, passing in the callback reference
    Map.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAoEgrLsTgTTnvtMXVcwe9PCabdnk3PtUI&callback=initMap');
  }

  /**
   * reinitialize google map
   * 
   * @memberof Map
   */
  // componentDidUpdate() {
  //   const { lat, lng } = this.state;
  //   const coords = { lat, lng };

  //   // reinitialize and center of map to the marker point
  //   this.state.map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 12,
  //     center: coords,
  //   });

  //   console.log(1);
  //   this.addMapEventOnClick();
  //   this.mark();
  // }


  /**
   * set google map marker
   * 
   * @param {any} coords 
   * @param {any} map 
   * @memberof Map
   */
  mark() {
    if (this.state.marker !== undefined) {
      this.state.marker.setMap(null);
    }

    const { lat, lng, map } = this.state;
    const coords = { lat, lng };

    /** set marker on the map */
    const marker = new google.maps.Marker({
      position: coords,
      map,
    });

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAoEgrLsTgTTnvtMXVcwe9PCabdnk3PtUI`;

    /** get current position base on users lat and lng */
    axios.get(url).then((response) => {
      this.setState({
        ...this.state,
        location: response.data.results[0].formatted_address,
        marker: marker,
      }, () => {
        const { lat, lng, location } = this.state;
        window.mapState = { lat, lng, location };
      });
    });
  }

  /**
   * add event listener to google map.
   * on click add marker
   * 
   * @memberof Map
   */
  addMapEventOnClick() {
    // This event listener calls marker() when the map is clicked.
    google.maps.event.addListener(this.state.map, 'click', (event) => {
      const coords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      this.setState({
        ...this.state,
        lat: coords.lat,
        lng: coords.lng,
      }, () => this.mark());
    });
  }

  /**
   * initialize google map
   * 
   * @memberof Map
   */
  initMap() {
    /** get cuurent position */
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = { lat: position.coords.latitude, lng: position.coords.longitude };

      /** initialize map */
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: coords,
      });

      /** update reactjs state */
      this.setState({
        ...this.state,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        map,
      }, () => {
        this.addMapEventOnClick();
      });
    }, Map.showError, { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true });
  }

  render() {
    return (
      <div>
        <div id="map" style={{ widht: '100%', height: 300 }} />
        <p>Location: {this.state.location}</p>
        <p>lat: {this.state.lat}</p>
        <p>lng: {this.state.lng}</p>
        <button className="button" onClick={window.close} > Set task Location</button>
      </div>
    );
  }
}