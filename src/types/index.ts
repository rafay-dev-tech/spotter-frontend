export interface Trip {
    current_location: string;
    pickup_location: string;
    dropoff_location: string;
    current_cycle_hours: number;
}

export interface Stop {
    type: 'rest' | 'fuel';
    duration: number;
    time: string;
}

export interface LatLng {
    lat: number;
    lng: number;
}

export interface RouteData {
    total_distance: number;
    total_duration: number;
    required_stops: Stop[];
    waypoints: LatLng[];
}

export type StatusType = 'OFF' | 'SB' | 'D' | 'ON';

// export interface LogSheetData {
//     id: number;
//     date: string;
//     start_time: string;
//     end_time: string;
//     status_grid: Record<number, StatusType>;
// }

export interface RouteResponse {
    trip: Trip;
    route: RouteData;
    log_sheets: LogSheetData[];
} 

// src/types/index.ts
export interface LogSheetData {
    date: string;
    start_time: string;
    end_time: string;
    status_grid: {
        [key: string]: string;
    };
}

export interface LogSheetProps {
    data: LogSheetData;
}