import { render, screen } from '@testing-library/react';
import GetStartedComponent from './getStarted';

describe('GetStartedComponent', () => {
  it('renders the component with correct text', () => {
    render(<GetStartedComponent />);
    expect(screen.getByText("Let’s get you started")).toBeInTheDocument();
    expect(screen.getByText(/Use the “Add new link” button to get started/i)).toBeInTheDocument();
  });

  it('renders the NoLinksIcon', () => {
    render(<GetStartedComponent />);
    expect(screen.getByTestId('NoLinksIcon')).toBeInTheDocument();
  });
});
