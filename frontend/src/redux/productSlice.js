import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState:{
        products:[],
        cart:[]
    },
    reducers:{
        //actions 
        //set product
        setProducts:(state,action)=>{
            state.products = action.payload

        },
        //set cart
        setCart:(state,action)=>{
            state.cart = action.payload

        }
    }
})

export const {setProducts,setCart} = productSlice.actions
export default productSlice.reducer