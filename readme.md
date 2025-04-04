# ELD Trip Planner - Frontend

A React-based frontend application for the ELD Trip Planner system. This application helps truck drivers plan their routes while maintaining compliance with Hours of Service (HOS) regulations.

## Features

- Interactive map visualization with route display
- Real-time route planning with rest stops
- Electronic logging device (ELD) compliance checking
- Daily log sheet generation
- HOS (Hours of Service) tracking
- Fuel stop planning

## Tech Stack

- React 18.2.0
- TypeScript 4.9.5
- Tailwind CSS 3.4.17
- Axios for API communication
- React Leaflet for maps
- Headless UI for components

## Prerequisites

- Node.js 14.0 or higher
- npm or yarn package manager
- Modern web browser

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eld-trip-planner/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development server:
```bash
npm start
```

## Project Structure

The `src/`  directory contains all the project files and components:

- **App.tsx**: Main App component
- **index.tsx**: Entry Point
- **package.json**: Dependencies
- **tsconfig.json**: TypeScript configuration
- **components/**: React components
- **services/**: API Services
- **types/**: TypeScripts types
- **utils/**: Utility functions
- **public/**: Static files



## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm test:watch`: Launches the test runner with additional optionals
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## API Integration

The frontend communicates with the backend API using Axios. Main endpoints:

```typescript
// Plan a new trip
POST /api/trips/plan_route/
{
    current_location: string;
    pickup_location: string;
    dropoff_location: string;
    current_cycle_hours: number;
}
```

## Component Usage

### TripPlanner
```typescript
import TripPlanner from './components/TripPlanner';

<TripPlanner />
```

### Map
```typescript
import Map from './components/Map';

<Map 
  center={[latitude, longitude]} 
  tripData={routeData} 
/>
```
