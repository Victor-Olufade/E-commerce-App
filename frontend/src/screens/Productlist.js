import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import Formcontainer from '../components/Formcontainer'
import { useProvider } from '../useContext/productContext'
import { useNavigate } from "react-router-dom";
import Paginate from '../components/Paginate'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'

const Productlist = () => {
    const {getAllProducts, products, deleteProduct, createProduct, page, pages } = useProvider()
    const navigate = useNavigate()
    const params = useParams()
    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1
    const isLoggedIn = JSON.parse(localStorage.getItem('currentUserInfo'))
    useEffect(()=>{
        if(isLoggedIn && isLoggedIn.isAdmin){
            getAllProducts('', pageNumber)
        }else{
            navigate('/login')
        }
        
    },[pageNumber])
   
    const deleteHandler=(id)=>{
        if(window.confirm('Are you sure ?')){
            deleteProduct(id);
        } 
    }

    const createProductHandler = () => {
        createProduct();
    }
  return (
    <>
    <Row className='align-items-center'>
        <Col>
        <h1>Products</h1>
        </Col>
        <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> Create Product
            </Button>
        </Col>
    </Row>
    <Table striped bordered hover responsive className='table-sm'>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {products.map(product=>(
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}
                    </td>
                    <td>{product.brand}</td>
                    <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                            </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                            <i className='fas fa-trash'></i>
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
    <Paginate page={page} pages={pages} isAdmin={true}/>
    </>
  )
}

export default Productlist