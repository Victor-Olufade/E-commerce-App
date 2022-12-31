import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import Formcontainer from '../components/Formcontainer'
import { useProvider } from '../useContext/productContext'
import { useNavigate } from "react-router-dom";
import Message from '../components/Message'

const Userlistscreen = () => {
    const {adminGetAllUsers, allUsers, deleteUser} = useProvider()
    const navigate = useNavigate()
    const isLoggedIn = JSON.parse(localStorage.getItem('currentUserInfo'))
    useEffect(()=>{
        if(isLoggedIn && isLoggedIn.isAdmin){
            adminGetAllUsers()
        }else{
            navigate('/login')
        }
        
    })
    const deleteHandler=(id)=>{
        if(window.confirm('Are you sure ?')){
            deleteUser(id);
        } 
    }
  return (
    <Table striped bordered hover responsive className='table-sm'>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {allUsers.map(user=>(
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td>
                        {user.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}}></i>) : (
                            <i className='fas fa-times' style={{color: 'red'}}></i>
                        )}
                    </td>
                    <td>
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                            </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                            <i className='fas fa-trash'></i>
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
  )
}

export default Userlistscreen