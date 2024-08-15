import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { ThemeProvider } from '../src/components/ThemeContext/ThemeContext';
import type { AppProps } from 'next/app';
import '../index.css';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
