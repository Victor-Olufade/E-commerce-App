import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listProducts } from "../actions/productActions";


const initialState = {
    productslist: []
},

export const productSlice = createSlice({
    name: "productslist",
    
    reducers: {
        Productlist: listProducts,
    }
})

const {actions, reducer} = productSlice
export const {Productlist} = actions
export default reducer