import React from 'react';
import FilterPanel from './FilterPanel';
import SearchBar from './SearchBar';

const Sidebar = () => {
  return (
    <aside>
      <SearchBar />
      <FilterPanel />
    </aside>
  );
};

export default Sidebar;