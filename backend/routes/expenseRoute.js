const express=require('express')
const router=express.Router()

const{createExpense,readExpense,updateExpense,deleteExpense}=require('../controller/expense')


router.post('/createExpense',createExpense)
router.get('/readExpense',readExpense)
router.put('/updateExpense/:id',updateExpense)
router.delete('/delete/:id',deleteExpense)


module.exports=router