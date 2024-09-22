import React from 'react';
import { render } from '@testing-library/react';
import PhonePreview from './phonePreview';
import { useLinks } from '../../context/link';

jest.mock('../../context/link');

describe('PhonePreview', () => {
  it('renders without crashing', () => {
    (useLinks as jest.Mock).mockReturnValue({
      control: {},
      fields: [],
      move: jest.fn(),
    });

    const { container } = render(<PhonePreview />);
    expect(container).toBeInTheDocument();
  });
});
