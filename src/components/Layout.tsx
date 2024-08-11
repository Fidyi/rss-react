import React from 'react';
import SearchHistory from './SearchHistory/SearchHistoryProps';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <aside className="w-1/5 border-r border-gray-300 p-2">
          <SearchHistory />
        </aside>
        <main className="flex-1 p-2">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
