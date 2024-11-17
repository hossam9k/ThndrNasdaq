import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getTickers } from '../api/polygonApi'; // Ensure this is your API
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import _ from 'lodash';
import colors from '../styles/colors';

const Tickers: React.FC = () => {
  const [tickers, setTickers] = useState<any[]>([]); // Stores all tickers
  const [error, setError] = useState<string | null>(null); // Stores errors
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term
  const [loading, setLoading] = useState<boolean>(false); // Loading state for initial fetch
  const [isFetching, setIsFetching] = useState<boolean>(false); // Flag to prevent multiple fetches
  const [nextUrl, setNextUrl] = useState<string | null>(null); // URL for pagination

  // Fetch tickers data based on search term and pagination URL
  const fetchTickers = async (search: string, nextUrl: string = '') => {
    if (isFetching) return; // Prevent multiple fetches at once
    setIsFetching(true); // Start pagination fetch

    if (!nextUrl) {
      setLoading(true); // Show loading indicator for the first fetch
    }

    try {
      const data = await getTickers(search, nextUrl); // Fetch data from API
      
      if (data.results && Array.isArray(data.results)) {
        setTickers(prevTickers => [...prevTickers, ...data.results]); // Append new data
        setNextUrl(data.next_url || null); // Update pagination URL
        setError(null); // Clear any previous error
      } else {
        setTickers([]);
        setError('No tickers found');
      }
    } catch (err: any) {
      if (err.response && err.response.status === 429) {
        setError(
          'Too many requests. Please wait a few seconds before searching again.',
        );
      } else {
        setError('Failed to fetch tickers');
      }
    } finally {
      setLoading(false); // Hide loading after first fetch
      setIsFetching(false); // Stop fetching for pagination
    }
  };

  // Debounced search function to avoid excessive API calls
  const debouncedFetchTickers = useCallback(
    _.debounce(text => {
      setTickers([]); // Clear tickers when search term changes
      fetchTickers(text); // Fetch new results for the updated search term
    }, 500),
    [],
  );

  // Handle search input changes
  const handleSearch = (text: string) => {
    setSearchTerm(text);
    debouncedFetchTickers(text);
  };

  // Trigger loading more tickers when scrolled to the bottom
  const handleLoadMore = () => {
    if (nextUrl) {
      fetchTickers(searchTerm, nextUrl); // Fetch next page of tickers
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchTickers('');
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Bar Component */}
      <SearchBar
        value={searchTerm}
        onSearch={handleSearch}
        placeholder="Search for stocks"
      />
      
      {/* Show loading only during the first fetch */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.white} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {/* Error message */}
      {error ===
      'Too many requests. Please wait a few seconds before searching again.' ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Ticker list */}
          {!loading && tickers.length > 0 ? (
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              onMomentumScrollEnd={handleLoadMore} // Trigger load more on scroll end
            >
              {tickers.map((item, index) => (
                <View style={styles.cardRow} key={index}>
                  <Card ticker={item.ticker} name={item.name} />
                  {index < tickers.length - 1 && (
                    <Card
                      ticker={tickers[index + 1].ticker}
                      name={tickers[index + 1].name}
                    />
                  )}
                </View>
              ))}
              {/* Show loading spinner only during pagination */}
              {isFetching && !loading && <ActivityIndicator size="large" color={colors.white} />}
            </ScrollView>
          ) : !loading && <Text>No tickers available</Text>}
        </>
      )}
    </View>
  );
};

export default Tickers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  cardRow: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors.white,
    fontSize: 16,
  },
  errorText: {
    color: colors.white,
    textAlign: 'center',
    marginTop: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});