import { configureStore } from '@reduxjs/toolkit'
// import productReducer from './features/Products'
import {
  productListReducers,
  productDetailsReducers,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialStateValue = {
    cart: {cartItems: cartItemsFromStorage}
}

const store = configureStore({
  reducer: {
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer,
  },
})

export default store
