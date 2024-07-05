const mongoose=require('mongoose')

const expenseSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },

  amount:{
    type:Number,
    required:true
  },

  data:{
    type:Date,
    default:Date.now
  }
})

module.exports=mongoose.model('expense',expenseSchema)