import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import SearchBar from '../src/components/SearchBar';
import {describe, expect, it, jest} from '@jest/globals';

jest.mock('axios'); // Mock axios only if needed for other tests

describe('SearchBar', () => {
  it('should update the text input and call onSearch with the correct value', async () => {
    const mockOnSearch = jest.fn();

    const {getByPlaceholderText} = render(
      <SearchBar onSearch={mockOnSearch} placeholder="Search for stocks" />,
    );

    const input = getByPlaceholderText('Search for stocks');

    // Simulate text change in the input
    fireEvent.changeText(input, 'AAPL');

    // Assert that the onSearch is called with the correct value
    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith('AAPL'));

    // Check if input value is updated
    expect(input.props.value).toBe('AAPL');
  });
});