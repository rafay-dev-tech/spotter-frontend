import React from 'react';
import TripPlanner from './components/TripPlanner';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            ELD Trip Planner
          </h1>
        </div>
      </header>
      <main>
      <ToastContainer />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <TripPlanner />
        </div>
      </main>
    </div>
  );
};

export default App; 