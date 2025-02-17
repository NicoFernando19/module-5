import { render, fireEvent, screen } from '@testing-library/react';
import Login from '@/pages/login';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

// Mock the modules
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Login Page', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockSetAuth = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue({ setAuth: mockSetAuth });
  });

  it('renders login form', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/john@doe.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/john@doe.com/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });
});
