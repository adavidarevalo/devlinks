import { render, screen } from '@testing-library/react';
import Footer from './footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  it('should render the Save button', () => {
    render(<Footer loading={false} />);
    const buttonElement = screen.getByRole('button', { name: /save/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('should disable the button when loading is true', () => {
    render(<Footer loading={true} />);
    const buttonElement = screen.getByRole('button', { name: /save/i });
    expect(buttonElement).toBeDisabled();
  });
});
