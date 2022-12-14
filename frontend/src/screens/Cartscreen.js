import React, {useEffect, useParams} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'

const Cartscreen = (location) => {
    const params = useParams()
    const dispatch = useDispatch()
    const productId = params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const cart = useSelector(state=>state.cart)
    const {cartItems} = cart

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
  return (
    <Row>
        <Col md={8}>
            <h1>Shopping cart</h1>
            {cartItems.length === 0 ? <Message>Your cart is empty<Link to='/'>Go back</Link></Message> : (
                <ListGroup variant='flush'></ListGroup>
            )}
        </Col>
        <Col md={2}>
        </Col>
        <Col md={2}>
        </Col>
    </Row>
  )
}

export default Cartscreen