import React, { useContext, useReducer, useState } from "react";
import { StoreReducer } from "./StoreReducer";

const StoreContext = React.createContext()

export const useStore = () => {
    return useContext(StoreContext)
}

export const StoreProvider = ({ children }) => {

    const [products, setProducts] = useState([])

    const [state, dispatch] = useReducer(StoreReducer, {
        cart: [],
        wishlist: []
    })

    const addToCart = (payload) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: payload
        })
    }

    const removeFromCart = (id) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: id
        })
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    const addToWishlist = (payload) => {
        dispatch({
            type: 'ADD_TO_WISHLIST',
            payload: payload
        })
    }

    const values = { state, dispatch, products, setProducts , addToCart, removeFromCart, clearCart, addToWishlist}

    return (
        <StoreContext.Provider value={values}>
            { children }
        </StoreContext.Provider>
    )
}