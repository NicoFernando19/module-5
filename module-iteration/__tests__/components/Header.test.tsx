import Header from '@/components/common/Header';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Header Component', () => {
  const mockSetAuth = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
    }));
    (useAuth as jest.Mock).mockReturnValue({ setAuth: mockSetAuth });
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Header with correct title', () => {
    render(<Header headerTitle='Hello World' />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders login link when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
    render(<Header headerTitle='Hello World' />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders profile link when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
    render(<Header headerTitle='Hello World' />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
