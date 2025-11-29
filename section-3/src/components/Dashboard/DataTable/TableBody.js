import React from 'react';

const TableBody = ({ users }) => {
  return (
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.company?.name}</td>
          <td>{user.address?.city}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;