import express from 'express'
import { getProducts, getProductById, adminDeleteProduct, adminUpdateProduct, adminCreateProduct, reviewProduct, getTopProducts } from '../controllers/productControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'
import { upload } from '../config/cloudinary.js'


const router = express.Router()


// fetch all products
router.get('/', getProducts)

//fetch a single product
router.get('/top', getTopProducts)
router.get('/:id', getProductById)
router.post('/createproduct', protect, admin, adminCreateProduct)
router.delete('/:id', protect, admin, adminDeleteProduct)
router.put('/:id', protect, admin, upload.single('image'), adminUpdateProduct)
router.post('/:id/reviews', protect, reviewProduct)

export default router;