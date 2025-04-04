import axios from 'axios';
import { Trip, RouteResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const planTrip = async (tripDetails: Trip): Promise<RouteResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/trips/plan_route/`, tripDetails);
        return response.data;
    } catch (error) {
        console.error('Error planning trip:', error);
        throw error;
    }
}; 