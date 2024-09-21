import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header Component', () => {
  it('renders the main title', () => {
    render(<Header />);
    const title = screen.getByText(/customize your links/i);
    expect(title).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Header />);
    const subtitle = screen.getByText(/add\/edit\/remove links below/i);
    expect(subtitle).toBeInTheDocument();
  });
});
