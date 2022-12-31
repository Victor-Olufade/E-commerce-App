import express from 'express'
import {
    addOrderItems, getOrderById, updateOrderToPaid, getUserOrders, getOrders, updateOrderToDelivered
} from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getorder/:id', protect, getOrderById)
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.put('/:id/pay', protect, updateOrderToPaid)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)
router.get('/getalluserorders', protect, getUserOrders)



export default router
