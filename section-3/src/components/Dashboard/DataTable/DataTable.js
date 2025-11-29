import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination';

const DataTable = ({ users = [], loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;

  return (
    <section>
      <p>{users.length} results found</p>
      <table>
        <TableHeader />
        <TableBody users={users} />
      </table>
      <Pagination />
    </section>
  );
};

export default DataTable;