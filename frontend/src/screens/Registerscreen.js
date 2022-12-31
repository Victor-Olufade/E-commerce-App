import {useState} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Formcontainer from '../components/Formcontainer'
import { useProvider } from '../useContext/productContext'
import { useNavigate } from "react-router-dom";
import Message from '../components/Message'

const Registerscreen = () => {
    const {Signup} = useProvider()
    const [formData, setFormData] = useState({})
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const redirect = '/login'
    const submitHandler = (e) => {
        e.preventDefault() 
        if(formData.password !== formData.confirmpassword){
            setMessage("Passwords do not match")
        }else{
            Signup(formData)
            setTimeout(()=>{
                navigate('/login')
              }, 2000)
        }
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
  return (
    <Formcontainer>
    {message && <Message variant='danger'>{message}</Message>}    
    <h1>Sign-Up</h1>
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='text'
            name='name'
            placeholder='Enter name'
            onChange={handleChange}></Form.Control>
        </Form.Group>

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

        <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
            type='password'
            name='confirmpassword'
            placeholder='Confirm password'
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
            SignUp
        </Button>
    </Form>

    <Row>
        <Col className='py-3'>
        Have An Account?{' '}
        <Link to={redirect? `/login?redirect=${redirect}`: '/login'}> login</Link>
        </Col>
    </Row>
</Formcontainer>
  )
}

export default Registerscreen