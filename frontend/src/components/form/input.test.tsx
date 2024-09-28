import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormInput from './input';
import { useForm, FormProvider } from 'react-hook-form';

const TestComponent = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <FormInput
        control={methods.control}
        errors={{}} // You can pass errors as needed for your test
        name="testInput"
        label="Test Input"
        placeholder="Enter text"
      />
    </FormProvider>
  );
};

describe('FormInput Component', () => {
  it('renders correctly with given props', () => {
    render(<TestComponent />);

    // Adjusting the query to use regex to account for asterisk
    const inputElement = screen.getByLabelText(/Test Input/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', 'Enter text');
  });

  it('allows the user to type in the input', () => {
    render(<TestComponent />);

    const inputElement = screen.getByLabelText(/Test Input/i) as HTMLInputElement; // Cast to HTMLInputElement
    expect(inputElement).toBeInTheDocument();

    // Simulate typing into the input field
    fireEvent.change(inputElement, { target: { value: 'Hello, World!' } });
    
    // Check if the value has been updated
    expect(inputElement.value).toBe('Hello, World!'); // Now this works
  });
});
