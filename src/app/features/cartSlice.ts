import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addItemToShoppingCart } from "../../utils";


export interface CartProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
}
export interface CartState {
    cartProducts: CartProduct[];
}
const initialState: CartState = {
    cartProducts: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartProduct>) => {
            state.cartProducts = addItemToShoppingCart(action.payload, state.cartProducts);
        },
        removeFromCart:(state,action)=>{
            state.cartProducts=state.cartProducts.filter(item=>item.id!==action.payload)
        },
        clearCart:(state)=>{
            state.cartProducts=[]
        }
    }
});

export const { addToCart,removeFromCart,clearCart} = cartSlice.actions;

export const selectCart = ({ cart }) =>cart;

export default cartSlice.reducer;
