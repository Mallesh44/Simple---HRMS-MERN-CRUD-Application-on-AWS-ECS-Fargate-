import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

// ✅ Relative API path
const API_BASE = "/api/items";

export default function App(){
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_BASE);
      setItems(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> { fetchItems(); }, []);

  const addItem = async (data) => {
    try {
      const res = await axios.post(API_BASE, data);
      setItems(prev => [res.data, ...prev]);
    } catch (err) { console.error(err); }
  };

  const updateItem = async (id, data) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, data);
      setItems(prev => prev.map(i => i._id === id ? res.data : i));
      setEditing(null);
    } catch (err) { console.error(err); }
  };

  const deleteItem = async (id) => {
    if(!confirm('Delete this item?')) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container">
      <h1>MERN CRUD (Simple)</h1>
      <ItemForm
        addItem={addItem}
        editing={editing}
        updateItem={updateItem}
        cancelEdit={() => setEditing(null)}
      />
      {loading
        ? <p>Loading...</p>
        : <ItemList items={items} onEdit={setEditing} onDelete={deleteItem} />
      }
    </div>
  );
}
