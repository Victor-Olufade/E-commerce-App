import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import productRouter from './routes/productRoute.js'
import userRouter from './routes/userRoute.js'
import orderRouter from './routes/orderRoute.js'
import logger from 'morgan'
import cors from 'cors'


dotenv.config()
connectDb()

const app = express()

app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(cors())



app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// app.use(notFound)

// app.use(errHandler)

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res)=>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
}else{
    app.get('/', (req, res)=>{
        res.send('API is running...')
    })
}


