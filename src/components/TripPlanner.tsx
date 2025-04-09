import React, { useState, useEffect } from 'react';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ErrorBoundary from './ErrorBoundary';
import TripForm from './TripForm';
import LogSheet from './LogSheet';
import { Trip, RouteResponse } from '../types';
import { planTrip } from '../services/api';
import Map from './Map';
import { toast } from 'react-toastify';

const TripPlanner: React.FC = () => {
  const [tripData, setTripData] = useState<RouteResponse | null>(null);
  const [isClient, setIsClient] = useState(false);
    const [isSpinner, setIsSpinner] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTripSubmit = async (tripDetails: Trip) => {
    setIsSpinner(!isSpinner)
    try {
      const response = await planTrip(tripDetails);
      setTripData(response);
      setIsSpinner(false)
    } catch (error :any) {
      setIsSpinner(false)
      console.error('Error planning trip:', error);
      toast.error(`Error planning trip: ${error?.response?.data?.error ? "Invalid Location" : ""}`);
    }
  };

  const center: LatLngExpression = [39.8283, -98.5795];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <TripForm onSubmit={handleTripSubmit} isSpinner={isSpinner}/>
        {tripData && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Trip Summary</h2>
            <div className="bg-white shadow rounded-lg p-4">
              <p>Total Distance: {tripData.route.total_distance.toFixed(2)} miles</p>
              <p>Estimated Duration: {tripData.route.total_duration.toFixed(2)} hours</p>
              <p>Required Stops: {tripData.route.required_stops.length}</p>
            </div>
          </div>
        )}
      </div>
      <div className="h-[600px]">
        {isClient && (
          <ErrorBoundary>
            <Map center={center} tripData={tripData} />
          </ErrorBoundary>
        )}
      </div>
      {tripData?.log_sheets && (
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Log Sheets</h2>
          <div className="grid gap-6">
            {tripData.log_sheets.map((sheet, index) => (
              <LogSheet key={index} data={sheet} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPlanner; 