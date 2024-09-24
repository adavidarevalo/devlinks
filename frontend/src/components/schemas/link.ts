import * as yup from 'yup';

export const linkFormSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
  links: yup.array()
    .of(
      yup.object().shape({
        platform: yup.string().required('Platform is required'),
        link: yup.string().url('Must be a valid URL').required('Link is required'),
      })
    )
    .required('At least one link is required')
    .test('unique-platform', 'Platform must be unique', (links) => {
      if (!links) return true; // Return true if no links provided (validating other required conditions)
      const platforms = links.map(link => link.platform);
      return new Set(platforms).size === platforms.length; // Ensures all platform values are unique
    }),
});
