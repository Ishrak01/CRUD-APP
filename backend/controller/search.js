const expense=require('../model/expenseModel')

// Search expenses by title
exports.searchExpensesByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const expenses = await expense.find({ title: new RegExp(title, 'i') })
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error searching by title:', error);
    res.status(500).json({ error: error.message });
  }
};

// Calculate total expenses
exports.calculateTotalExpenses = async (req, res) => {
  try {
    const expenses = await expense.find();
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    res.status(200).json({ totalAmount });
  } catch (error) {
    console.error('Error calculating total expenses:', error);
    res.status(500).json({ error: error.message });
  }
};