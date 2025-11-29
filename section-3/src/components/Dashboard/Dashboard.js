import React from 'react';
import SummaryCards from './SummaryCards';
import DataVisualization from './DataVisualization';
import DataTable from './DataTable/DataTable';

const Dashboard = ({ users = [], loading, error }) => {
  return (
    <main>
      <SummaryCards users={users} />
      <DataVisualization users={users} />
      <DataTable users={users} loading={loading} error={error} />
    </main>
  );
};

export default Dashboard;

