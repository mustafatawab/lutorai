import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../components/theme-provider';

describe('ThemeProvider', () => {
  // Mock window.matchMedia before each test to ensure a clean state
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)', // Default to system light
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should render children correctly', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div>Test Child</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should apply the default theme if system preference is not enabled', () => {
    // Ensure system preference is not enabled for this test
    const mockMatchMedia = jest.fn().mockImplementation(query => ({
      matches: false, // System preference doesn't match dark
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    Object.defineProperty(window, 'matchMedia', { writable: true, value: mockMatchMedia });

    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <div>Test Child</div>
      </ThemeProvider>
    );
    // When enableSystem is false, it should default to 'light' and not apply 'dark' class
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('should apply system dark theme when enabled and preferred', () => {
    // Mock system preference to dark
    const mockMatchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)', // System prefers dark
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    Object.defineProperty(window, 'matchMedia', { writable: true, value: mockMatchMedia });

    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div>Test Child</div>
      </ThemeProvider>
    );
    // expect(document.documentElement).toHaveClass('dark'); // This will fail because enableSystem is true, and defaultTheme is light.
    // The library should prioritize system if enableSystem is true.

    // Next-themes automatically adds the class 'dark' to the HTML element.
    // However, in a pure unit test environment, we don't have a real HTML element.
    // This test will remain a failing test until we can properly simulate HTML element changes or mock next-themes' internal behavior.
    expect(document.documentElement).toHaveClass('dark');
  });
});