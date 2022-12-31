import React, { useContext} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import {InfoContext} from '../useContext/Reducer'


const Cartscreen = () => {
  
  const Globalstate = useContext(InfoContext)
  const cartItems = Globalstate.state
  const dispatch = Globalstate.dispatch
  const navigate = useNavigate()

  const checkoutHandler = () => {
    navigate("/shipping");
  }
  
 
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your cart is empty<Link to = '/'> Go Back</Link></Message> : (
          <ListGroup variant='flush'>
            {cartItems.map(item => {
              return <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${(item.price * item.qty).toFixed(2)}</Col>
                  <Col md={2}>
                  <Form.Control
                        value={item.qty}>
                     
                      </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => dispatch({ type: 'REMOVE', payload: item })}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button type='button' className="btn-block" onClick={() => dispatch({ type: 'INCREASE', payload: item })}>
                      +
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button type='button' className="btn-block" onClick={() => dispatch({ type: 'DECREASE', payload: item })}>
                      -
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item)=> acc + item.qty, 0)}) items</h2>
              ${(cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0)).toFixed(2)}
            </ListGroup.Item>
            <ListGroupItem>
              <Button type = "button" className='btn-block' disabled={cartItems.length === 0} onClick={()=>checkoutHandler()}>
                Proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Cartscreen