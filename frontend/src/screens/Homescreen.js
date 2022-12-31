import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Products'
import { useProvider } from '../useContext/productContext'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from './ProductCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'

const Homescreen = () => {
  
  const {getAllProducts, products, page, pages, getTopProducts} = useProvider()
  const params = useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1
  

  useEffect(() => {
    getAllProducts(keyword, pageNumber);
    getTopProducts()
  }, [keyword, pageNumber])


  return (
    <>
   <Meta/>
    {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'>Go Back</Link>}
      <h1>Latest Products</h1>
     
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            )
          })}
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''}/>
    </>
  )
}

export default Homescreen
