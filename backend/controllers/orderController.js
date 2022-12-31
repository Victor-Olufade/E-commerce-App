import asyncHandler from 'express-async-handler'
import Order from '../models/order.js'

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error("No order items")
  }else{
    const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })
    await order.save()
    
    res.status(201).json({
        order,
        message: "Order successfully placed"
    })
  }
})

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'email name')
    if(order){
      return res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
      }
      await order.save()
      return res.json({
        order,
        message: 'Payment Successful'
      })
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

export const getUserOrders = async(req, res) => {
  const orders = await Order.find({user: req.user._id})
  return res.json(orders)
}


export const getOrders = async(req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  return res.json(orders)
}

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if(order){
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save()
    return res.json({
      order,
      message: 'Delivered'
    })
  }else{
      res.status(404)
      throw new Error('Order not found')
  }
})