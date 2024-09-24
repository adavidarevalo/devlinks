import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './form';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({});

describe('LoginForm Component', () => {
  it('should render email and password fields', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    const emailField = screen.getByLabelText(/email address/i);
    const passwordField = screen.getByLabelText(/password/i);

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  it('should render the login button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    const buttonElement = screen.getByRole('button', { name: /log in/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('should disable the login button when loading', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    const buttonElement = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(buttonElement);
    expect(buttonElement).toBeDisabled();
  });
});
