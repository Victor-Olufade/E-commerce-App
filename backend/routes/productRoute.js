import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/product.js'


const router = express.Router()


// fetch all products
router.get('/', asyncHandler(async(req, res)=>{
    const products = await Product.find({})
    res.json(products)
}))


//fetch a single product
router.get('/:id', asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        return res.json(product)
    }else{
         res.status(404)
         throw new Error('product not found')
    
}}))

export default router;