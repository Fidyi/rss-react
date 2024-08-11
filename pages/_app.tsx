import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { ThemeProvider } from '../src/components/ThemeContext/ThemeContext';
import type { AppProps } from 'next/app';
import '../index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
