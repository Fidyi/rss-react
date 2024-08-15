import React from 'react';
import Header from './Header';
import SearchHistory from './SearchHistory/SearchHistoryProps';

type LayoutProps = {
  children: React.ReactNode;
  searchTerm?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, searchTerm }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header searchTerm={searchTerm} />
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
