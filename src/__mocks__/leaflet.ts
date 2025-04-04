interface IconOptions {
  iconUrl: string;
  shadowUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
  popupAnchor: [number, number];
  shadowSize: [number, number];
}

export class Icon {
  options: IconOptions;

  constructor(options: IconOptions) {
    this.options = options;
  }
}

export type LatLngExpression = [number, number]; 