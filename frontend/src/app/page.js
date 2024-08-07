"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';

const ExpenseTracker = () => {
 
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5500/readExpense');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  };

  const addExpense = async () => {
    try {
      const newExpense = { title, amount,category };
      const response = await axios.post('http://localhost:5500/createExpense', newExpense);
      setExpenses([...expenses, response.data]);
      setTitle('');
      setAmount('');
      setCategory('');
  
    } catch (error) {
      console.error('Error adding expense', error);
    }
  };

  const updateExpense = async (id) => {
    try {
      const updatedExpense = { title, amount,category };
      await axios.put(`http://localhost:5500/updateExpense/${id}`, updatedExpense);
      setExpenses(expenses.map(expense => (expense.id === id ? { ...updatedExpense, id } : expense)));
      fetchExpenses();
      setTitle('');
      setAmount('');
      setCategory('');
      
      setEditing(null);
    } catch (error) {
      console.error('Error updating expense', error);
    }
  };

  

  const deleteExpense = async (id) => {
    
    try {
      await axios.delete(`http://localhost:5500/delete/${id}`);
      setExpenses(expenses.filter(expense => expense.id !== id));
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateExpense(editing);
    } else {
      addExpense();
    }
  };

  const startEditing = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
 
    setEditing(expense._id);
  };

  return (
    <div className=" mx-[120px]">
    
      <form onSubmit={handleSubmit} className="">
        <div className="">
          
          <input
            type="text"
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="">
         
          <input
            type="number"
            placeholder='Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="">
          
          <input
            type="text"
            placeholder='Category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <br/>
        <button type="submit" className="px-2 py-2 bg-blue-500 text-white rounded-lg">
          {editing ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>
      <br/>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="mb-2 p-2 border rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">Title: {expense.title}</h2>
              <p className='font-bold text-red-500'>Amount: {expense.amount} BDT </p>
              <p className='font- text-blue-700'>Category: {expense.category}</p>
            </div>
            <div>
              <button onClick={() => startEditing(expense)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2">
                Edit
              </button>
              <button onClick={() => deleteExpense(expense._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
