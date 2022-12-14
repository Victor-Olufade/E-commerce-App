import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDb from './config/db.js'  
import colors from 'colors'  
import productRouter from './routes/productRoute.js'
import logger from 'morgan'
import cors from 'cors'
// import 
// import {notFound, errHandler} from './middleware/errorMiddleware.js'


dotenv.config()
connectDb()

const app = express()

app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.get('/', (req, res)=>{
    res.send("API IS RUNNING")
})

app.use('/api/products', productRouter)

// app.use(notFound)

// app.use(errHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);
})