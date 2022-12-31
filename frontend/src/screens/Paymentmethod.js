import { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import Formcontainer from '../components/Formcontainer'
import { useNavigate } from 'react-router-dom'
import Checkoutsteps from '../components/Checkoutsteps'

const Paymentscreen = () => {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  useEffect(() => {
    const shippingDetails = JSON.parse(localStorage.getItem('formData'))
    if (!shippingDetails.address) {
      navigate('/shipping')
    }
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()
    localStorage.setItem('paymentMethod', paymentMethod)
    navigate('/placeorder')
  }

  return (
    <Formcontainer>
      <Checkoutsteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit-Card"
            id="PayPal"
            name="PaymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
       
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
        
      </Form>
    </Formcontainer>
  )
}

export default Paymentscreen
