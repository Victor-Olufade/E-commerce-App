import { useState, useEffect, useContext } from 'react'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button
} from 'react-bootstrap'
import Message from '../components/Message'
import { useProvider } from '../useContext/productContext'
import { useNavigate, Link } from 'react-router-dom'
import Checkoutsteps from '../components/Checkoutsteps'
import { InfoContext } from '../useContext/Reducer'
import { apiGet } from '../utils/axios'

const Placeorder = () => {
  const Globalstate = useContext(InfoContext)
  const cartItems = Globalstate.state
  const [shippingDetails, setShippingDetails] = useState({})

  const {addOrder, orderId, getOrderDetails, orderDetails} = useProvider()
  const navigate = useNavigate()
 
  useEffect(() => {
  

    setShippingDetails(JSON.parse(localStorage.getItem('formData')));
    getOrderDetails(orderId)
  }, [addOrder, getOrderDetails, orderId])
  const method = localStorage.getItem('paymentMethod')
 
  const aggregratePrice = cartItems.reduce((acc, item)=>acc + item.price * item.qty, 0)
  const itemPrice = aggregratePrice.toFixed(2)
  const shippingPrice = aggregratePrice > 100 ? 0 : 100
  const taxPrice = Number((0.15 * aggregratePrice).toFixed(2))
  const totalPrice = (aggregratePrice + shippingPrice + taxPrice).toFixed(2)

  const placeOrderHandler = () => {
    addOrder({
        orderItems: cartItems,
        shippingAddress: shippingDetails,
        paymentMethod: method,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });
   
  }


  const Next = () => {
    navigate(`/order/${orderId}`)
  }
  return (
    <>
      <Checkoutsteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingDetails.address},{shippingDetails.city},
                {shippingDetails.country},{shippingDetails.postalcode}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {method},
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your Cart Is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
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
                  <Col>${itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >Place Order</Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block py-2"
                  disabled={cartItems.length === 0}
                  onClick={Next}
                >Next</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Placeorder
