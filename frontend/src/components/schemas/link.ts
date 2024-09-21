import * as yup from 'yup';

export const linkFormSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email(),
    links: yup.array().of(
      yup.object().shape({
        platform: yup.string().required('Platform is required'),
        link: yup
          .string()
          .url('Must be a valid URL')
          .required('Link is required'),
      })
    ),
  });