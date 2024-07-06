const expense=require('../model/expenseModel')

//create an expense
exports.createExpense=async(req,res)=>{
  const{title,amount}=req.body

  try {
    const newExpense=new expense({title,amount})
    await newExpense.save()
    res.status(201).json(newExpense)
  } catch (error) {
    res.status(500).json({error:err.message})
  }
}

//read all expense

exports.readExpense=async(req,res)=>{
  try {
    const expenses=await expense.find()
    res.status(200).json(expenses)
  } catch (error) {
    res.status(500).json({error:err.message})
  }
}

//update an expense
exports.updateExpense=async(req,res)=>{
  const {id}=req.params
  const {title,amount}=req.body

  try {
    const update=await expense.findByIdAndUpdate(
      id,
      {title,amount},
      {new:true}
    )

    if (!update){
      return res.status(404).json({message:"expense not found"})
    }
    res.status(200).json(update)
  } catch (error) {
    console.error('Error updating :', error);
    res.status(500).json({ error: 'Internal server error' });

  }
}

//delete expense
exports.deleteExpense=async(req,res)=>{
  const{id}=req.params
  try {
    const deletedExpense=await expense.findByIdAndDelete(id)
    if(!deletedExpense){
      return res.status(404).json({message:'expense not found'})
    }
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    console.error('Error :', error);
    res.status(500).json({error:err.message})
  }
}