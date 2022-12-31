import { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import {PayPalButton} from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader.js'
import { useProvider } from '../useContext/productContext.js'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '../utils/axios'


const Orderscreen = () => {
  
  const { orderDetails, updateOrderToPaid, getOrderDetails, updateOrderToDelivered } = useProvider()
  const [sdkReady, setSdkReady] = useState(false)
  const params = useParams()
  const isLoggedIn = JSON.parse(localStorage.getItem('currentUserInfo'))
   
    useEffect(()=>{
      getOrderDetails(params.id)
      console.log(getOrderDetails, 'beans');
      const addPayPalScript = async ()=> {
        const {data: clientId} = await apiGet('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
      if(orderDetails.isPaid){
        // getOrderDetails(params.id)
      }
      else if(!orderDetails.isPaid){
        if(!window.paypal){
          addPayPalScript()
        }else{
          setSdkReady(true)
        }
      }
      
    }, [])
   
  const deliverHandler = () => {
    updateOrderToDelivered(params.id)
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    updateOrderToPaid(params.id, paymentResult)
    
  }
  return (
    <>
      <h1>Order {orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: {orderDetails.user.name}</strong>
              </p>
              <p>
                Email:
                <a href={`mailto:${orderDetails.user.email}`}>
                  {orderDetails.user.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {orderDetails.shippingAddress.address},
                {orderDetails.shippingAddress.city},
                {orderDetails.shippingAddress.country},
                {orderDetails.shippingAddress.postalcode}
              </p>
              {orderDetails.isDelivered ? (
                <Message variant="success">
                  Delivered at time {orderDetails.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {orderDetails.paymentMethod},
              </p>
              {orderDetails.isPaid ? (
                <Message variant="success">
                  Paid at {orderDetails.paidAt}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderDetails.orderItems.length === 0 ? (
                <Message>Your Cart Is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetails.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>

                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${orderDetails.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!orderDetails.isPaid && (
                <ListGroup.Item>
                  {!sdkReady ? <Loader/> : (
                    <PayPalButton amount={orderDetails.totalPrice} onSuccess={successPaymentHandler}/>
                  )}
                </ListGroup.Item>
              )}
              {isLoggedIn.isAdmin && orderDetails.isPaid && !orderDetails.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                    Mark as delivered
                  </Button>
                </ListGroup.Item>
              )} 
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Orderscreen
