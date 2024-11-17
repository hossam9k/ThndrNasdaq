# ThndrReact

ThndrReact is a React Native mobile application designed for users to view stock tickers and related information. The app includes a splash screen, a dynamic list of tickers, pagination for loading more data, and a stylish header.

## Features

### 1. Splash Screen
- Upon app launch, a splash screen is displayed for a few seconds to give the user a smooth entry experience.
- The splash screen is replaced by the main content after a delay (3 seconds in this app).

### 2. Dynamic List of Tickers
- The app displays a list of stock tickers fetched from an API (or mock data) for the users to explore.
- Each ticker includes relevant stock data, such as the symbol, price, and changes.

### 3. Header Component
- A customizable header is displayed at the top of the screen.
- The header includes app branding and a consistent navigation experience.

### 4. Pagination (Load More)
- The app supports pagination for the tickers list. As the user scrolls, new items are dynamically loaded.
- "Load More" functionality is implemented to ensure smooth scrolling through large datasets.

### 5. Custom Styling
- The app uses custom colors to match the branding and provide a visually appealing user interface.
- React Native’s `StyleSheet` is used for styling the components.

---

## Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hossam9k/thndrreact.git