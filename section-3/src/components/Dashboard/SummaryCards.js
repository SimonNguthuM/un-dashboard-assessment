import React from 'react';

const SummaryCards = ({ users }) => {
  const total = users.length;
  return (
    <section id="cards" style={{display:'flex', gap:'1rem'}}>
      <div className="card">Total Employees: <span>{total}</span></div>
      <div className="card">Active Employees: <span>--</span></div>
      <div className="card">Average Salary: <span>--</span></div>
      <div className="card">Departments: <span>--</span></div>
    </section>
  );
};

export default SummaryCards;