import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmitButton from './submitButton';

describe('SubmitButton Component', () => {
  it('renders correctly with given text', () => {
    render(<SubmitButton text="Submit" />);

    const buttonElement = screen.getByRole('button', { name: /Submit/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Submit');
  });

  it('is disabled when the disabled prop is true', () => {
    render(<SubmitButton text="Submit" disabled={true} />);

    const buttonElement = screen.getByRole('button', { name: /Submit/i });
    expect(buttonElement).toBeDisabled();
  });

  it('is enabled when the disabled prop is false', () => {
    render(<SubmitButton text="Submit" disabled={false} />);

    const buttonElement = screen.getByRole('button', { name: /Submit/i });
    expect(buttonElement).toBeEnabled();
  });

  it('is enabled by default', () => {
    render(<SubmitButton text="Submit" />);

    const buttonElement = screen.getByRole('button', { name: /Submit/i });
    expect(buttonElement).toBeEnabled();
  });
});
