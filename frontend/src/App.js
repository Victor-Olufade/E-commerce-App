import React from 'react'
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen.js';
import Productscreen from './screens/Productscreen';
import Cartscreen from './screens/Cartscreen';
import DataFetcher from './useContext/productContext';
import { Context } from './useContext/Reducer';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Registerscreen from './screens/Registerscreen';
import Shippingscreen from './screens/Shippingscreen';
import Paymentscreen from './screens/Paymentmethod';
import Placeorder from './screens/Placeorder';
import Orderscreen from './screens/Orderscreen';
import Userlistscreen from './screens/Userlistscreen';
import Usereditscreen from './screens/Usereditscreen';
import Productlist from './screens/Productlist';
import ProductEditScreen from './screens/ProductEditScreen';
import Orderlistscreen from './screens/Orderlistscreen';



function App() {
  return (
    <DataFetcher>
    <Context>
    <ToastContainer/>
    <Router>
    <Header/>
    <main className='py-3'>
      <Container>
      <Routes>
      <Route path='/search/:keyword' element={<Homescreen/>} exact/>

      <Route path='/search/:keyword/page/:pageNumber' element={<Homescreen/>} />

      <Route path='/page/:pageNumber' element={<Homescreen/>} />

      <Route path='/' element={<Homescreen/>} />
     
      <Route path='/product/:id' element={<Productscreen/>} />

      <Route path='/order/:id' element={<Orderscreen/>} />

      <Route path='/login' element={<Loginscreen/>} />

      <Route path='/register' element={<Registerscreen/>} />

      <Route path='/profile' element={<Profilescreen/>} />
     
      <Route path='/cart' element={<Cartscreen/>} />

      <Route path='/shipping' element={<Shippingscreen/>} />

      <Route path='/payment' element={<Paymentscreen/>} />

      <Route path='/placeorder' element={<Placeorder/>} />

      <Route path='/admin/userlist' element={<Userlistscreen/>} />

      <Route path='/admin/productlist' element={<Productlist/>} exact/>

      <Route path='/admin/productlist/:pageNumber' element={<Productlist/>} exact/>

      <Route path='/admin/user/:id/edit' element={<Usereditscreen/>} />

      <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>} />

      <Route path='/admin/orderlist' element={<Orderlistscreen/>} />

      </Routes>
      
      </Container>
    
    </main>
     <Footer/>
    </Router>
    </Context>
    </DataFetcher>
    
  );
}

export default App;
