import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/todos');
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, fetchTodos, loading }}>
      {children}
    </TodoContext.Provider>
  );
};