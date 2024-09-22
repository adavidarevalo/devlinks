import React from 'react';
import { render } from '@testing-library/react';
import PrevButton from './prevButton';

describe('PrevButton', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<PrevButton />);
    expect(getByRole('button')).toBeInTheDocument();
  });
});
