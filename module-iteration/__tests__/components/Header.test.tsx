import Header from '@/components/common/Header';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Header Component', () => {
    beforeEach(() => {
        useRouter.mockImplementation(() => ({
            route: '/',
            pathname: '/',
            query: {},
            asPath: '/',
        }));
    });

    test('renders Header with correct title', () => {
        render(<Header headerTitle="Hello World" />);
        expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
    });

});