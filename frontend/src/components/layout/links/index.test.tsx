import React from 'react';
import { render } from '@testing-library/react';
import CustomizeLinksLayout from './index';

describe('CustomizeLinksLayout', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <CustomizeLinksLayout>
        <div>Test Child</div>
      </CustomizeLinksLayout>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
