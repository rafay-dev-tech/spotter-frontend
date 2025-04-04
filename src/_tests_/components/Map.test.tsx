import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from '../../components/Map';
import { RouteResponse } from '../../types';

jest.mock('react-leaflet');
jest.mock('leaflet');

describe('Map Component', () => {
  const mockTripData = {
    route: {
      waypoints: [
        { lat: 40.7128, lng: -74.0060 },
        { lat: 42.3601, lng: -71.0589 },
        { lat: 39.9526, lng: -75.1652 }
      ]
    }
  };

  test('renders map with correct props', () => {
    render(<Map center={[40.7128, -74.0060]} tripData={mockTripData as RouteResponse} />);
    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
  });

  test('displays markers for all waypoints', () => {
    render(<Map center={[40.7128, -74.0060]} tripData={mockTripData as RouteResponse} />);
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(mockTripData.route.waypoints.length);
  });

  test('renders without trip data', () => {
    render(<Map center={[40.7128, -74.0060]} tripData={null} />);
    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
  });
});