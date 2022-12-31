import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Formcontainer from '../components/Formcontainer'
import { useNavigate } from 'react-router-dom'
import Checkoutsteps from '../components/Checkoutsteps'

const Shippingscreen = () => {
  const navigate = useNavigate()
  const [shippingDetails, setShippingDetails] = useState({})
  const [formData, setFormData] = useState({})
  localStorage.setItem('formData', JSON.stringify(formData))
  useEffect(()=>{
    setShippingDetails(JSON.parse(localStorage.getItem('formData')))
},[])
  
  
  
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  
  const submitHandler = async(e) => {
    e.preventDefault()
    localStorage.setItem('formData', JSON.stringify(formData))
    navigate('/payment')
  }

  
  return (
    <Formcontainer>
    <Checkoutsteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name= "address"
            placeholder="Enter address"
            defaultValue={shippingDetails.address}
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Enter city"
            defaultValue={shippingDetails.city}
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalcode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalcode"
            placeholder="Enter postalcode"
            defaultValue={shippingDetails.postalcode}
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            placeholder="Enter country"
            defaultValue={shippingDetails.country}
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
            Continue
        </Button>
      </Form>
    </Formcontainer>
  )
}

export default Shippingscreen
