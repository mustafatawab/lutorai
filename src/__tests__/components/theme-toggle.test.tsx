import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeToggle } from '../../components/theme-toggle';

// Mock useTheme from next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({ setTheme: jest.fn(), theme: 'system' }),
}));

describe('ThemeToggle', () => {
  it('should render the toggle theme button', async () => {
    render(<ThemeToggle />);
    const trigger = screen.getByRole('button', { name: /toggle theme/i });
    expect(trigger).toBeInTheDocument();
  });
});