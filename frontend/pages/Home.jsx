import { TodoForm } from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

export default function Home() {
  const { todos, loading } = useContext(TodoContext);
  return (
    <div className="max-w-xl mx-auto mt-6">
      <TodoForm />
      {loading ? <p>Loading...</p> : todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}