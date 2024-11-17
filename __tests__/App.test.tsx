import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '../App'; // Adjust the import path if necessary

describe('App Component', () => {
  it('renders correctly', () => {
    render(<App />);
    // Add assertions to test your component
    expect(screen.toJSON()).toMatchSnapshot();  // For snapshot testing
  });
});