import { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function TodoItem({ todo }) {
  const { fetchTodos } = useContext(TodoContext);
  const { token } = useContext(AuthContext); // ✅ Get token
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const toggleComplete = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, { completed: !todo.completed }, headers);
      fetchTodos();
    } catch (err) {
      console.error('Toggle complete failed:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${todo._id}`, headers);
      fetchTodos();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = async () => {
    if (!title.trim()) return;
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, { title }, headers);
      setEditing(false);
      fetchTodos();
    } catch (err) {
      console.error('Edit failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-between border p-2 mb-2 rounded shadow-sm bg-white">
      <div className="flex items-center gap-2 w-full">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="cursor-pointer"
        />
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-1 border rounded"
          />
        ) : (
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
            {todo.title}
          </span>
        )}
      </div>
      <div className="space-x-2">
        {editing ? (
          <button onClick={handleEdit} className="text-green-600 font-medium">Save</button>
        ) : (
          <button onClick={() => setEditing(true)} className="text-yellow-600 font-medium">Edit</button>
        )}
        <button onClick={handleDelete} className="text-red-600 font-medium">Delete</button>
      </div>
    </div>
  );
}
