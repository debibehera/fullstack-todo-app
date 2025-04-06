import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/login', form);

    login(res.data.token);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2" />
      <button className="w-full bg-blue-600 text-white p-2">Login</button>
    </form>
  );
}