import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TripForm from '../../components/TripForm';

describe('TripForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<TripForm onSubmit={mockOnSubmit} />);
  });

  test('renders all form fields', () => {
    expect(screen.getByLabelText(/current location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pickup location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dropoff location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current cycle hours/i)).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    const submitButton = screen.getByRole('button', { name: /plan trip/i });
    fireEvent.click(submitButton);

    expect(screen.getByLabelText(/current location/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/pickup location/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/dropoff location/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/current cycle hours/i)).toHaveAttribute('required');
  });

  test('submits form with valid data', async () => {
    const formData = {
      current_location: 'New York, NY',
      pickup_location: 'Boston, MA',
      dropoff_location: 'Philadelphia, PA',
      current_cycle_hours: 2
    };

    await userEvent.type(screen.getByLabelText(/current location/i), formData.current_location);
    await userEvent.type(screen.getByLabelText(/pickup location/i), formData.pickup_location);
    await userEvent.type(screen.getByLabelText(/dropoff location/i), formData.dropoff_location);
    await userEvent.type(screen.getByLabelText(/current cycle hours/i), formData.current_cycle_hours.toString());

    fireEvent.click(screen.getByRole('button', { name: /plan trip/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith(formData);
  });

  test('validates current cycle hours input type', () => {
    const hoursInput = screen.getByLabelText(/current cycle hours/i);
    expect(hoursInput).toHaveAttribute('type', 'number');
    expect(hoursInput).toHaveAttribute('min', '0');
    expect(hoursInput).toHaveAttribute('max', '70');
    expect(hoursInput).toHaveAttribute('step', '0.5');
  });
});