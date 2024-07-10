"use client"

import axios from 'axios';
import { useState } from 'react';

const Search = () => {
  const [title, setTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  


 

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/search/${title}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  
  return (
    <div className=" mx-[120px] p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Search Expenses by Title</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter expense title"
            className="border rounded p-2 flex-grow text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            Search
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Search Results</h2>
        {searchResults.length > 0 ? (
          <ul className="list-disc list-inside font-semibold">
            {searchResults.map((expense) => (
              <li key={expense._id} className="mb-2">
                {expense.title} - {expense.amount} BDT - {expense.category}
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses found</p>
        )}
      </div>

      
    </div>
  );
};

export default Search;
