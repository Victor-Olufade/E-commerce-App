import {useEffect, useState} from 'react'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import { useProvider } from '../useContext/productContext'
import { useNavigate } from "react-router-dom";
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap';

const Profilescreen = () => {
    const {userDetails, getUserDetails, updateUserProfile, getAllUserOrders, userOrders} = useProvider()
    const [formData, setFormData] = useState({})
    const [message, setMessage] = useState("")
   
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const isLoggedIn = JSON.parse(localStorage.getItem('currentUserInfo'))
    useEffect(()=>{
        getAllUserOrders()
        if(!isLoggedIn){
            navigate('/login')
        }else{
            getUserDetails()
        }
        
    }, [])
   
    const submitHandler = (e) => {
        e.preventDefault() 
        
        if(formData.password !== formData.confirmpassword){
            setMessage("Passwords do not match")
        }else{
            updateUserProfile(formData)
        }
    }

  return (
    <>
    {message && <Message variant='danger'>{message}</Message>}  
    <Row>
       <Col md={3}>
       <h2>User Profile</h2>
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='text'
            name='name'
            placeholder='Enter name'
            defaultValue={userDetails.name}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            defaultValue={userDetails.email}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
            type='password'
            name='password'
            placeholder='Enter password'
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
            type='password'
            name='confirmpassword'
            placeholder='Confirm password'
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Update
        </Button>
    </Form>
       </Col>
       <Col md={9}>
        <h2>My Orders</h2>
        {(
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                     <th>ID</th>
                     <th>DATE</th>
                     <th>TOTAL</th>
                     <th>PAID</th>
                     <th>DELIVERED</th>
                     <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userOrders.map(order=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm' variant='light'>Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> 
        )}
       </Col>
    </Row>
</>
  )
}

export default Profilescreen