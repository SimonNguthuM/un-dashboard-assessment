import React from 'react';

const FilterPanel = () => {
  return (
    <div>
      <h3>Filters</h3>
      <div>
        <label>Status</label>
        <select>
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
    
    </div>
  );
};

export default FilterPanel;