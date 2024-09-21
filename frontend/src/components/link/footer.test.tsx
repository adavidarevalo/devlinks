import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer Component', () => {
  it('renders the Save button', () => {
    render(<Footer />);
    const button = screen.getByRole('button', { name: /save/i });
    expect(button).toBeInTheDocument();
  });
});
