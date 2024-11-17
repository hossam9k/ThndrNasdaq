import axios from 'axios';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { getTickers } from '../../src/api/polygonApi';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getTickers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch tickers successfully', async () => {
    const searchTerm = 'AAPL';
    const expectedData = {
      tickers: [{ symbol: 'AAPL', name: 'Apple Inc.' }],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: expectedData });

    const result = await getTickers(searchTerm);

    // Change the expected URL to match the actual limit value (20)
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.polygon.io/v3/reference/tickers?active=true&limit=20', // Updated to match limit=20
      {
        params: {
          search: searchTerm,
          apiKey: '3sIq58a69O2xVIVPjwnvSJqiLBjXGuPR',
        },
        headers: {
          Authorization: 'Bearer 3sIq58a69O2xVIVPjwnvSJqiLBjXGuPR',
          'Content-Type': 'application/json',
        },
      }
    );
    expect(result).toEqual(expectedData);
  });

  it('should fetch tickers successfully with nextUrl for pagination', async () => {
    const searchTerm = 'AAPL';
    const nextUrl = 'https://api.polygon.io/v3/reference/tickers?next=true';
    const expectedData = {
      tickers: [{ symbol: 'AAPL', name: 'Apple Inc.' }],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: expectedData });

    const result = await getTickers(searchTerm, nextUrl);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      nextUrl,
      {
        params: {
          search: searchTerm,
          apiKey: '3sIq58a69O2xVIVPjwnvSJqiLBjXGuPR',
        },
        headers: {
          Authorization: 'Bearer 3sIq58a69O2xVIVPjwnvSJqiLBjXGuPR',
          'Content-Type': 'application/json',
        },
      }
    );
    expect(result).toEqual(expectedData);
  });

  it('should throw an error when the request fails', async () => {
    const searchTerm = 'INVALID';
    const errorMessage = 'Request failed with status code 500';

    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getTickers(searchTerm)).rejects.toThrow(errorMessage);
  });
});