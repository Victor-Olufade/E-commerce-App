import {useState} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Formcontainer from '../components/Formcontainer'
import { useProvider } from '../useContext/productContext'
import { useNavigate } from "react-router-dom";



const Loginscreen = () => {
    const {Login} = useProvider()
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const redirect = '/'
    const submitHandler = (e) => {
        e.preventDefault() 
        Login(formData)
        setTimeout(()=>{
            navigate('/profile')
          }, 2000)
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
  return (
    <Formcontainer>
        <h1>Sign-In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                name='email'
                placeholder='Enter email'
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

            <Button type='submit' variant='primary'>
                SignIn
            </Button>
        </Form>

        <Row>
            <Col className='py-3'>
            New Customer?{' '}
            <Link to={redirect? `/register?redirect=${redirect}`: '/register'}> Register</Link>
            </Col>
        </Row>
    </Formcontainer>
  )
}

export default Loginscreen