
import React, { useState, useEffect, useRef, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import StudioContext from '../Studios/StudioContext';

const googleMapsAPIKey = 'AIzaSyCJz9IhLpYUVrgyyApCi-SOpdqJcNj9IVg';

const MapPin = () => (
  <div>
    <img
      src="https://maps.google.com/mapfiles/ms/micons/red.png"
      alt="Map Pin"
      style={{
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        zIndex: 500,
        position: 'absolute', 
        transform: 'translate(-50%, -100%)'

      }}
    />
  </div>
);

const MapPicker = (props) => {
  const { latitude, setLatitude,  longitude, setLongitude, filter, setFilter}  = useContext(StudioContext)
  const [center, setCenter] = useState({ lat: latitude, lng: longitude });
  const [draggableMap, setDraggableMap] = useState(true);

  const handlePinDrag = (key, marker, newCoord) => {
    setLatitude(newCoord.lat)
    setLongitude(newCoord.lng)
  }

  const handlePinRelease = ((key, marker, newCoord)=> {
    setDraggableMap(true);
  })

  const handlePinClick = (key, marker, newCoord) => {
    setDraggableMap(false);

  }
  return (
    <div style={{ height: '500px', width: '500px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: googleMapsAPIKey
        }}
        draggable={draggableMap}
        center={center}
        defaultZoom={10}
        onChildMouseDown = {handlePinClick}
        onChildMouseUp = {handlePinRelease}
        onChildMouseMove = {handlePinDrag}
      >
        <MapPin
          lat={latitude}
          lng={longitude}
          draggable={true}
        />
      </GoogleMapReact>
    </div>
  );
}


export default MapPicker;

















// import React, { useState, useEffect, useRef } from 'react';
// import GoogleMapReact from 'google-map-react';
// import { Icon } from '@iconify/react'
// import locationIcon from '@iconify/icons-mdi/map-marker'

// import './style.css' 
// const MapPin = () => (
//   <div style={{
//     position: 'absolute',
//     transform: 'translate(-50%, -100%)',
//     fontSize: '24px',
//     color: 'red',
//     background: 'white',
//     borderRadius: '50%',
//     padding: '12px',
//     cursor: 'pointer'
//   }}>
//     <i className="fas fa-map-pin" />
//   </div>
// );

// // const MapPin = ({ text }) => (
// //   <div className="pin">
// //     <Icon icon={locationIcon} className="pin-icon" />
// //     <p className="pin-text">{text}</p>
// //   </div>
// // )
// const MapComponent = () => {
//   const [coords, setCoords] = useState({ lat: 43.66511259965255, lng: -79.39474806189537 });
//   const [center, setCenter] = useState(coords);
//   const mapRef = useRef();

//   useEffect(() => {
//     setCenter(coords);
//     mapRef.current.forceUpdate();
//   }, [coords]);
  
//   const handleMapClick = (event) => {
//     setCoords({
//       lat: event.lat,
//       lng: event.lng
//     });
//   }

//   const handlePinDrag = (event) => {
//     setCoords({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng()
//     });
//   }

//   return (
//     <div style={{ height: '500px', width: '500px' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{
//           key: 'AIzaSyCJz9IhLpYUVrgyyApCi-SOpdqJcNj9IVg'
//         }}
//         center={center}
//         defaultZoom={10}
//         onClick={handleMapClick}
//         key={center.lat + ',' + center.lng}
//         ref={mapRef}
//       >
//         <MapPin
//           lat={coords.lat}
//           lng={coords.lng}
//           draggable
//           onDragEnd={handlePinDrag}
//         />
//       </GoogleMapReact>
//     </div>
//   );
// }

