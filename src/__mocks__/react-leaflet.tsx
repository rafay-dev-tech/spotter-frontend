import React, { ReactNode } from 'react';

interface MapContainerProps {
  children?: ReactNode;
  center: [number, number];
  zoom: number;
  style: React.CSSProperties;
  scrollWheelZoom: boolean;
  [key: string]: any;
}

interface TileLayerProps {
  url: string;
  attribution: string;
  [key: string]: any;
}

interface MarkerProps {
  children?: ReactNode;
  position: [number, number];
  icon?: any;
  [key: string]: any;
}

interface PopupProps {
  children?: ReactNode;
  [key: string]: any;
}

export const MapContainer = ({ children,scrollWheelZoom, ...props }: MapContainerProps) => (
  <div data-testid="map-container" {...props}>{children}</div>
);

export const TileLayer = ({ ...props }: TileLayerProps) => (
  <div data-testid="tile-layer" {...props} />
);

export const Marker = ({ children, ...props }: MarkerProps) => (
  <div data-testid="marker" {...props}>{children}</div>
);

export const Popup = ({ children, ...props }: PopupProps) => (
  <div data-testid="popup" {...props}>{children}</div>
); 