import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Searchbox.css'

const Searchbox = () => {
  const [keyword, setKeyWord] = useState('')
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()){
        navigate(`/search/${keyword}`)
    }else{
      navigate('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder='Search Products...'
        className='textInput'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='button' size='sm'>
        Search
      </Button>
    </Form>
  )
}

export default Searchbox
