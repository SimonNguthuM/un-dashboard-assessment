import React from 'react';

const Pagination = () => {
  return (
    <footer style={{display:'flex', gap:'1rem', justifyContent:'center', padding:'1rem'}}>
      <button disabled>Previous</button>
      <span>Page 1 of 1</span>
      <button disabled>Next</button>
    </footer>
  );
}

export default Pagination;