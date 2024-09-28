import React from 'react';
import { render, screen } from '@testing-library/react';
import { useMediaQuery } from '@mui/material';
import Header from '.'; // Adjust the import path as needed
import '@testing-library/jest-dom';

// Mocking the child components and useMediaQuery
jest.mock('./nav_button', () => () => <button>Nav Button</button>);
jest.mock('./prevButton', () => () => <button>Previous Button</button>);
jest.mock('../../../../assets/DevlinksLogoLg', () => () => <div>DevlinksLogoLg</div>);
jest.mock('../../../../assets/DevLinksLogoSm', () => () => <div>DevLinksLogoSm</div>);

// Mock implementation for useMediaQuery
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    (useMediaQuery as jest.Mock).mockClear();
  });

  it('renders correctly in mobile view', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true); // Simulate mobile view
    render(<Header />);
  
    expect(screen.getByText('DevLinksLogoSm')).toBeInTheDocument(); // Check mobile logo
    expect(screen.getAllByText('Nav Button')).toHaveLength(2); // Check that there are 2 Nav Buttons
    expect(screen.getByText('Previous Button')).toBeInTheDocument(); // Check PrevButton
  });
  
  it('renders correctly in desktop view', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false); // Simulate desktop view
    render(<Header />);
  
    expect(screen.getByText('DevlinksLogoLg')).toBeInTheDocument(); // Check desktop logo
    expect(screen.getAllByText('Nav Button')).toHaveLength(2); // Check that there are 2 Nav Buttons
    expect(screen.getByText('Previous Button')).toBeInTheDocument(); // Check PrevButton
  });
  
});
