import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Products'
import { useProvider } from '../useContext/productContext'

const Homescreen = () => {

  const {getAllProducts, products} = useProvider()
  

  useEffect(() => {
    getAllProducts()
  }, [getAllProducts])


  return (
    <>
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
    </>
  )
}

export default Homescreen
