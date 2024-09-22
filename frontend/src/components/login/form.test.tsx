import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './form';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('LoginForm', () => {
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
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    expect(getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('displays error messages on invalid submission', async () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(getByRole('button', { name: /Log in/i }));

    await waitFor(() => {
      expect(getByText(/Email address is a required field/i)).toBeInTheDocument();
      expect(getByText(/Password is a required field/i)).toBeInTheDocument();
    });
  });
});
