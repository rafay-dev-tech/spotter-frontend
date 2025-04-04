import React from 'react';
import { LogSheetData } from '../types';

interface LogSheetProps {
    data: LogSheetData;
}

// Define valid status types
type StatusType = 'OFF' | 'SB' | 'D' | 'ON';

// Define status colors with proper typing
const statusColors: Record<StatusType, string> = {
    'OFF': 'bg-gray-200',
    'SB': 'bg-blue-200',
    'D': 'bg-green-200',
    'ON': 'bg-yellow-200'
};

const LogSheet: React.FC<LogSheetProps> = ({ data }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Log Sheet - {data.date}</h3>
                <p className="text-sm text-gray-600">
                    {data.start_time} - {data.end_time}
                </p>
            </div>
            <div className="grid grid-cols-24 gap-px bg-gray-300">
                {hours.map(hour => {
                    const status = (data.status_grid[hour] || 'OFF') as StatusType;
                    return (
                        <div
                            key={hour}
                            className={`h-8 ${statusColors[status]}`}
                            title={`${hour}:00 - ${data.status_grid[hour]}`}
                        />
                    );
                })}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 mr-2" />
                    <span>Off Duty</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-200 mr-2" />
                    <span>Sleeper Berth</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-200 mr-2" />
                    <span>Driving</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-200 mr-2" />
                    <span>On Duty</span>
                </div>
            </div>
        </div>
    );
};

export default LogSheet; 