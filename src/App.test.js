// src/App.test.js
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('Booksy App', () => {
  test('renders main navbar links', () => {
    render(<App />);

    // Target the navbar only
    const navbar = screen.getByRole('navigation');
    
    const links = [
      /Home/i,
      /Add Book/i,
      /Edit Book/i,
      /Search Book/i,
      /Delete Book/i,
      /Library/i,
      /Profile/i,
    ];

    links.forEach((linkText) => {
      expect(within(navbar).getByText(linkText)).toBeInTheDocument();
    });
  });

  test('renders Booksy title/logo in navbar', () => {
    render(<App />);

    // Target the navbar only
    const navbar = screen.getByRole('navigation');
    
    // Check if Booksy title is rendered inside the navbar
    expect(within(navbar).getByText(/Booksy/i)).toBeInTheDocument();

    // Optionally, check the logo image
    const logo = within(navbar).getByAltText(/Booksy/i);
    expect(logo).toBeInTheDocument();
  });
});
