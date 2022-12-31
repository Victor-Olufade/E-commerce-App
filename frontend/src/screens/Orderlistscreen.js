import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import Formcontainer from '../components/Formcontainer'
import { useProvider } from '../useContext/productContext'
import { useNavigate } from "react-router-dom";
import Message from '../components/Message'

const Orderlistscreen = () => {
    const {allOrders, getAllOrders} = useProvider()
    const navigate = useNavigate()
    const isLoggedIn = JSON.parse(localStorage.getItem('currentorderInfo'))
    useEffect(()=>{
        getAllOrders()
        // if(isLoggedIn && isLoggedIn.isAdmin){
        //     getAllOrders()
        // }else{
        //     navigate('/login')
        // }
        
    },[])
   
  return (
    <Table striped bordered hover responsive className='table-sm'>
        <thead>
            <tr>
                <th>ID</th>
                <th>order</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {allOrders.map(order=>(
                <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                        {order.isPaid ? (order.paidAt.substring(0, 10)) : (
                            <i className='fas fa-times' style={{color: 'red'}}></i>
                        )}
                    </td>
                    <td>
                        {order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (
                            <i className='fas fa-times' style={{color: 'red'}}></i>
                        )}
                    </td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                            <Button variant='light' className='btn-sm'>
                               Details
                            </Button>
                        </LinkContainer>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
  )
}

export default Orderlistscreen