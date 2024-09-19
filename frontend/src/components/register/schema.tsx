import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    username: yup.string().required('User Name is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  });
