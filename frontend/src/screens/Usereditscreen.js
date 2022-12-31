import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import Formcontainer from '../components/Formcontainer'
import { useProvider } from '../useContext/productContext'
import { useNavigate, useParams } from "react-router-dom";

const Usereditscreen = () => {
    const {adminGetUserById, user, adminUpdateUserById} = useProvider()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()
  
    const params = useParams()
    
    useEffect(()=>{
            if(!user || user._id !== params.id){
                adminGetUserById(params.id)
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        
       
    },[user])
    const submitHandler = (e) => {
        e.preventDefault() 
        adminUpdateUserById(params.id, {
            name,
            email,
            isAdmin
        })
        navigate('/admin/userlist')
    }
   
  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
    </Link>
    <Formcontainer> 
    <h1>Edit User</h1>
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='text'
            name='name'
            value={name}
            placeholder='Enter name'
            onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
            type='email'
            name='email'
            value={email}
            placeholder='Enter email'
            onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='isadmin'>
            <Form.Check
            type='checkbox'
            name='password'
            label='Is Admin'
            checked={isAdmin}
            onChange={(e)=>setIsAdmin(e.target.checked)}></Form.Check>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Update
        </Button>
    </Form>
</Formcontainer>
    </>
    
  )
}

export default Usereditscreen