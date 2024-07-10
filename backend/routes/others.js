const express=require('express')
const router=express.Router()

const{searchExpensesByTitle,calculateTotalExpenses}=require('../controller/search')

router.get('/search/:title',searchExpensesByTitle)
router.get('/total',calculateTotalExpenses)







module.exports=router