import React from 'react';

export default function ItemList({ items, onEdit, onDelete }) {

  // 🔐 Safety check (VERY IMPORTANT)
  if (!Array.isArray(items)) {
    return <p>Failed to load data.</p>;
  }

  if (items.length === 0) {
    return <p>No items yet.</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(it => (
          <tr key={it._id}>
            <td>{it.name}</td>
            <td>{it.description}</td>
            <td>{new Date(it.createdAt).toLocaleString()}</td>
            <td>
              <button onClick={() => onEdit(it)}>Edit</button>
              <button
                onClick={() => onDelete(it._id)}
                style={{ marginLeft: 8 }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
