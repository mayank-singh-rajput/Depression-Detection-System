import { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

class map extends Component {
  render() {
    return (
      <Map
        initialCenter={{
          lat: 30.769449,
          lng: 76.577455,
        }}
        google={this.props.google}
        zoom={15}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={"Mayank Depression Research Centre"}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCRlBV4wOKvOxqLzQ2fkVxh0Nq_nOFkbnU",
})(map);
