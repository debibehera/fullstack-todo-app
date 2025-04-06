const Todo = require('../models/todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error('Get Todos Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const todo = await Todo.create({ title, user: req.user.id });
    res.status(201).json(todo);
  } catch (err) {
    console.error('Create Todo Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.user.id)
      return res.status(404).json({ message: 'Todo not found or unauthorized' });

    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Update Todo Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.user.id)
      return res.status(404).json({ message: 'Todo not found or unauthorized' });

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error('Delete Todo Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
