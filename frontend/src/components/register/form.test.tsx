import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './form';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('RegisterForm', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      global: { message: null },
    });
  });

  it('renders without crashing', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterForm />
        </MemoryRouter>
      </Provider>
    );

    expect(getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(getByLabelText(/User Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
    expect(getByLabelText(/Confirm password/i)).toBeInTheDocument();
  });

  it('displays error messages on invalid submission', async () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(getByRole('button', { name: /Create new account/i }));

    await waitFor(() => {
      expect(getByText(/Email address is a required field/i)).toBeInTheDocument();
      expect(getByText(/User Name is a required field/i)).toBeInTheDocument();
      expect(getByText(/Password is a required field/i)).toBeInTheDocument();
      expect(getByText(/Confirm password is a required field/i)).toBeInTheDocument();
    });
  });
});
