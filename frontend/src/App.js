import React from 'react'
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen.js';
import Productscreen from './screens/Productscreen';
import Cartscreen from './screens/Cartscreen';
import DataFetcher from './useContext/productContext';



function App() {
  return (
    <DataFetcher>
    <Router>
    <Header/>
    <main className='py-3'>
      <Container>
      <Routes>
      <Route path='/' element={<Homescreen/>} />
     
      <Route path='/product/:id' element={<Productscreen/>} />
     
      <Route path='/cart/:id' element={<Cartscreen/>} />
      </Routes>
      
      </Container>
    
    </main>
     <Footer/>
    </Router>
    </DataFetcher>
  );
}

export default App;
