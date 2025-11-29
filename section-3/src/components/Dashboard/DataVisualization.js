import React from 'react';

const DataVisualization = ({ users }) => {
  return (
    <section id="cityChartSection">
      <h3>Users per City</h3>
      <div className="chart-container">
        {Object.entries(users.reduce((acc, u) => {
            acc[u.address.city] = (acc[u.address.city] || 0) + 1;
            return acc;
          }, {})).map(([city, count]) => (
            <div key={city} className="chart-row">
              <span className="chart-label">{city}</span>
              <div className="chart-bar" style={{width: `${Math.min(100, count*20)}%`}}/>
              <span className="chart-value">{count}</span>
            </div>
        ))}
      </div>
    </section>
  );
};

export default DataVisualization;
