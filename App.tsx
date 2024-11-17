import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Tickers from './src/screens/Tickers';
import colors from './src/styles/colors';
import Header from './src/components/Header';
import SplashScreen from './src/screens/SplashScreen';

function App(): React.JSX.Element {
  const [isSplashVisible, setSplashVisible] = React.useState(true);

  // Simulate a loading delay (e.g., 3 seconds)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000); // 3 seconds delay for the splash screen

    return () => clearTimeout(timer); // Clear timer if the component unmounts
  }, []);

  // Show splash screen or main app content
  return isSplashVisible ? (
    <SplashScreen />
  ) : (
    <View style={styles.outerContainer}>
      <View style={styles.headerSpacing}></View>
      <>
        <Header />
        <Tickers />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  headerSpacing: {
    paddingBottom: 40,
    backgroundColor: colors.darkBlue2,
  },
});

export default App;