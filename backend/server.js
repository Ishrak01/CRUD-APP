const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const expenseRoute=require('./routes/expenseRoute')
const others=require('./routes/others')
const morgan = require('morgan');

const connectDB = require('./config/DB.js');



//configure env
dotenv.config()

//configuring database
connectDB()

const app = express();


//middleware
app.use(morgan('dev'))
app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>{
  res.send('Your api is live ')
})

app.use('/',expenseRoute)
app.use('/',others)


//run server
const PORT=process.env.PORT || 5500
app.listen(PORT,()=> console.log("server is connected"))





