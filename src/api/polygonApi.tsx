import axios from 'axios';

const BASE_URL = 'https://api.polygon.io';
const API_KEY = '3sIq58a69O2xVIVPjwnvSJqiLBjXGuPR';

export const getTickers = async (searchTerm: string, nextUrl?: string) => {
  try {
    const url = nextUrl || `${BASE_URL}/v3/reference/tickers?active=true&limit=20`;
    const response = await axios.get(url, {
      params: {
        search: searchTerm,
        apiKey: API_KEY,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};