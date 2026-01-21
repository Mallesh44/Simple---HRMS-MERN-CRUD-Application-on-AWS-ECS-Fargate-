import React, { useEffect, useState } from 'react';

const initial = { name: '', description: '' };

export default function ItemForm({ addItem, editing, updateItem, cancelEdit }){
  const [form, setForm] = useState(initial);

  useEffect(()=> {
    if(editing) setForm({ name: editing.name, description: editing.description || '' });
    else setForm(initial);
  }, [editing]);

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    if(editing) updateItem(editing._id, form);
    else addItem(form);
    setForm(initial);
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={onChange} />
      <div>
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
        {editing && <button type="button" onClick={() => { cancelEdit(); setForm(initial); }}>Cancel</button>}
      </div>
    </form>
  );
}
