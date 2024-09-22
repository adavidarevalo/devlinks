import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavButton from './nav_button';
import { useLinks } from '../../../context/link';

jest.mock('../../../context/link');

describe('NavButton', () => {
  it('renders correctly and handles click', () => {
    const setView = jest.fn();
    (useLinks as jest.Mock).mockReturnValue({ view: 'links', setView });

    const { getByRole } = render(
      <NavButton icon={<span>Icon</span>} name="links" label="Links" />
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(setView).toHaveBeenCalledWith('links');
  });
});
