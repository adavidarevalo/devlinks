import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import Card from './card';
import { FormValues } from '.';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      links: [{ platform: 'Github', link: '' }],
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Card Component', () => {
  it('renders the link number', () => {
    render(
      <Wrapper>
        <Card field={{ id: '1', platform: 'Github', link: '' }} index={0} />
      </Wrapper>
    );
    const linkNumber = screen.getByText(/link #1/i);
    expect(linkNumber).toBeInTheDocument();
  });

  it('renders the remove button', () => {
    render(
      <Wrapper>
        <Card field={{ id: '1', platform: 'Github', link: '' }} index={0} />
      </Wrapper>
    );
    const removeButton = screen.getByText(/remove/i);
    expect(removeButton).toBeInTheDocument();
  });
});
