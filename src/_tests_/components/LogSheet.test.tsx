/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, screen } from '@testing-library/react';
import LogSheet from '../../components/LogSheet';

describe('LogSheet Component', () => {
    const mockLogData = {
        date: '2024-04-04',
        start_time: '08:00',
        end_time: '18:00',
        status_grid: {
            8: 'ON',
            9: 'D',
            10: 'D',
            11: 'ON',
            12: 'OFF',
            13: 'SB',
            14: 'D',
            15: 'D',
            16: 'ON',
            17: 'OFF'
        }
    };

    beforeEach(() => {
        render(<LogSheet data={mockLogData} />);
    });

    test('renders log sheet with correct date and time', () => {
        expect(screen.getByText('Log Sheet - 2024-04-04')).toBeInTheDocument();
        expect(screen.getByText('08:00 - 18:00')).toBeInTheDocument();
    });

    test('renders status grid with correct number of hours', () => {
        const gridCells = document.querySelectorAll('.grid-cols-24 > div');
        expect(gridCells).toHaveLength(24);
    });

    test('displays status legend correctly', () => {
        expect(screen.getByText('Off Duty')).toBeInTheDocument();
        expect(screen.getByText('Sleeper Berth')).toBeInTheDocument();
        expect(screen.getByText('Driving')).toBeInTheDocument();
        expect(screen.getByText('On Duty')).toBeInTheDocument();
    });

    test('applies correct status colors', () => {
        const statusElements = document.querySelectorAll('.grid-cols-24 > div');
        const statusColors = {
            'OFF': 'bg-gray-200',
            'SB': 'bg-blue-200',
            'D': 'bg-green-200',
            'ON': 'bg-yellow-200'
        };

        Object.entries(mockLogData.status_grid).forEach(([hour, status]) => {
            const element = statusElements[parseInt(hour)];
            expect(element).toHaveClass(statusColors[status as keyof typeof statusColors]);
        });
    });
});