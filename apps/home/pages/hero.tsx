import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import findRide from '@/components/home/findRide';

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: 30.0444,
    lng: 30.0444
  };

const hero = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAaJwpJpG0IB5_JjTKIs9G7azO3Ja9koKE"
      })
      const [map, setMap] = React.useState(null)
      const onLoad = React.useCallback(function callback(map: any) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])

      const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
      }, [])

      return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
    ) : <></>
}

export default hero