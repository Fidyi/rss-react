'use client';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { ThemeProvider } from '../src/components/ThemeContext/ThemeContext';
import Header from '../src/components/Header';
import '../index.css';
import SearchHistory from '../src/components/SearchHistory/SearchHistory';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex flex-1">
                <aside className="w-1/5 border-r-2 border-gray-300 p-2">
                  <SearchHistory />
                </aside>
                <main className="flex-1 p-2">{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
