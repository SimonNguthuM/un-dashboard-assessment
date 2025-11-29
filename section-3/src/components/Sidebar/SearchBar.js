import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div>
      <label>Search</label>
      <input value={value || ''} onChange={onChange} placeholder="Search name, email, department"/>
    </div>
  );
};

export default SearchBar;