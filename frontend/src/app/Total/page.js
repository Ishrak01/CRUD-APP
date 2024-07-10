"use client"
import { useState } from 'react';

import axios from 'axios';

const page = () => {

  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotal = async () => {
    try {
      const response = await axios.get('http://localhost:5500/total');
      setTotalAmount(response.data.totalAmount);
    } catch (error) {
      console.error('Error calculating total expenses:', error);
    }
  };

  


  return (
    <div>
      <div className="mx-[120px] mb-8">
        <h2 className="text-xl font-semibold mb-2">Calculate Total Expenses</h2>
        <button
          onClick={calculateTotal}
          className="bg-green-500 text-white rounded px-4 py-2"
        >
          Calculate Total
        </button>
        <p className="mt-2 font-semibold">Total Amount: {totalAmount} BDT</p>
      </div>
    </div>
  )
}

export default page