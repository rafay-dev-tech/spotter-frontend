import React, { useState } from 'react';
import { Trip } from '../types';
import Spinner from 'utils/loader';

interface TripFormProps {
    onSubmit: (trip: Trip) => void;
    isSpinner?: boolean;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit, isSpinner }) => {
    const [formData, setFormData] = useState<Trip>({
        current_location: '',
        pickup_location: '',
        dropoff_location: '',
        current_cycle_hours: 0
    });
    const [errors, setErrors] = useState({
        current_location: '',
        pickup_location: '',
        dropoff_location: '',
        current_cycle_hours: ''
    });

    const validate = () => {
        const newErrors = {
            current_location: formData.current_location ? '' : 'Current Location is required',
            pickup_location: formData.pickup_location ? '' : 'Pickup Location is required',
            dropoff_location: formData.dropoff_location ? '' : 'Dropoff Location is required',
            current_cycle_hours: formData.current_cycle_hours >= 0 && formData.current_cycle_hours <= 70 ? '' : 'Cycle Hours must be between 0 and 70'
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== '');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'current_cycle_hours' ? parseFloat(value) : value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Plan Your Trip</h2>
            <div className="space-y-6">
                {/* Current Location Section */}
                <div>
                    <label htmlFor="current_location" className="text-sm font-medium text-gray-700">
                        Current Location
                    </label>

                        <input
                            id="current_location"
                            type="text"
                            name="current_location"
                            value={formData.current_location}
                            onChange={handleChange}
                            className="mt-2 block w-full p-3 rounded-md border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your current location"
                        />
                    
                    {errors.current_location && (
                        <p className="text-red-500 text-sm mt-1">{errors.current_location}</p>
                    )}
                </div>

                {/* Pickup Location */}
                <div>
                    <label htmlFor="pickup_location" className="text-sm font-medium text-gray-700">
                        Pickup Location
                    </label>
                    <input
                        id="pickup_location"
                        type="text"
                        name="pickup_location"
                        value={formData.pickup_location}
                        onChange={handleChange}
                        className="mt-2 block w-full p-3 rounded-md border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Type your pickup location"
                    />
                    {errors.pickup_location && (
                        <p className="text-red-500 text-sm mt-1">{errors.pickup_location}</p>
                    )}
                </div>

                {/* Dropoff Location */}
                <div>
                    <label htmlFor="dropoff_location" className="text-sm font-medium text-gray-700">
                        Dropoff Location
                    </label>
                    <input
                        id="dropoff_location"
                        type="text"
                        name="dropoff_location"
                        value={formData.dropoff_location}
                        onChange={handleChange}
                        className="mt-2 block w-full p-3 rounded-md border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type your dropoff_location location"
                    />
                    {errors.dropoff_location && (
                        <p className="text-red-500 text-sm mt-1">{errors.dropoff_location}</p>
                    )}
                </div>

                {/* Cycle Hours */}
                <div>
                    <label htmlFor="current_cycle_hours" className="text-sm font-medium text-gray-700">
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
                        className="mt-2 block w-full p-3 rounded-md border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.current_cycle_hours && (
                        <p className="text-red-500 text-sm mt-1">{errors.current_cycle_hours}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 flex justify-center bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                >
                    Plan Trip {isSpinner && <span className="ml-3"><Spinner /></span>}
                </button>
            </div>
        </form>
    );
};

export default TripForm;
