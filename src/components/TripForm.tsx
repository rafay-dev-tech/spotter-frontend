import React, { useState } from 'react';
import { Trip } from '../types';

interface TripFormProps {
    onSubmit: (trip: Trip) => void;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<Trip>({
        current_location: '',
        pickup_location: '',
        dropoff_location: '',
        current_cycle_hours: 0
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'current_cycle_hours' ? parseFloat(value) : value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="current_location" className="block text-sm font-medium text-gray-700">
                        Current Location
                    </label>
                    <input
                        id="current_location"
                        type="text"
                        name="current_location"
                        value={formData.current_location}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pickup_location" className="block text-sm font-medium text-gray-700">
                        Pickup Location
                    </label>
                    <input
                        id="pickup_location"
                        type="text"
                        name="pickup_location"
                        value={formData.pickup_location}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dropoff_location" className="block text-sm font-medium text-gray-700">
                        Dropoff Location
                    </label>
                    <input
                        id="dropoff_location"
                        type="text"
                        name="dropoff_location"
                        value={formData.dropoff_location}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="current_cycle_hours" className="block text-sm font-medium text-gray-700">
                        Current Cycle Hours
                    </label>
                    <input
                        id="current_cycle_hours"
                        type="number"
                        name="current_cycle_hours"
                        value={formData.current_cycle_hours}
                        onChange={handleChange}
                        min="0"
                        max="70"
                        step="0.5"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Plan Trip
                </button>
            </div>
        </form>
    );
};

export default TripForm; 