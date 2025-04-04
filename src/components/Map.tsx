import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import { RouteResponse } from '../types';

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  center: LatLngExpression;
  tripData: RouteResponse | null;
}

const Map: React.FC<MapProps> = ({ center, tripData }) => {
  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {tripData && tripData.route.waypoints.map((waypoint, index) => {
        const position: LatLngExpression = [waypoint.lat, waypoint.lng];
        return (
          <Marker 
            key={index} 
            position={position}
            icon={defaultIcon}
          >
            <Popup>
              {index === 0 ? 'Start' : index === tripData.route.waypoints.length - 1 ? 'End' : `Stop ${index}`}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map; 