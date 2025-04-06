import { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import axios from 'axios';

export function TodoForm() {
  const [title, setTitle] = useState('');
  const { fetchTodos } = useContext(TodoContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title cannot be empty');
    await axios.post('http://localhost:5000/api/todos', { title });
    setTitle('');
    fetchTodos();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="flex-1 border p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button className="bg-green-600 text-white px-4">Add</button>
    </form>
  );
}
