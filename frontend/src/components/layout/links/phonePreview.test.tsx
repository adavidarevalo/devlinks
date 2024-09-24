import React from 'react';
import { render } from '@testing-library/react';
import PhonePreview from './phonePreview';
import { LinksProvider, useLinks } from '../../context/link';

jest.mock('../../context/link');

const MockedComponent = () => {

  return <LinksProvider><PhonePreview  /></LinksProvider>;
};

describe('PhonePreview', () => {
  it('renders without crashing', () => {
    (useLinks as jest.Mock).mockReturnValue({
      control: {},
      fields: [],
      move: jest.fn(),
    });

    const { container } = render(<MockedComponent />);
    expect(container).toBeInTheDocument();
  });
});
