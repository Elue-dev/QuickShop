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
        wishlist: [],
        searchQuery: '',
    })

    const addToCart = (product) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: product
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

    const changeQuantity = (id, value) => {
        dispatch({
            type: 'CHANGE_QTY',
             payload: {
             id: id,
             qty: value
            }
        })
    }

    const addToWishlist = (product) => {
        dispatch({
            type: 'ADD_TO_WISHLIST',
            payload: product
        })
    }

    const removeFromWishlist = (id) => {
        dispatch({
            type: 'REMOVE_FROM_WISHLIST',
            payload: id
        })
    }

    const clearWishlist = () => {
        dispatch({ type: 'CLEAR_WISHLIST' })
    }

    const getSearch = (value) => {
        dispatch({
            type: 'FILTER_BY_SEARCH',
            payload: value
          })
    }

    const values = { 
        state, dispatch, products, setProducts , addToCart, removeFromCart, clearCart, 
        addToWishlist, removeFromWishlist, clearWishlist, changeQuantity, getSearch
    }

    return (
        <StoreContext.Provider value={values}>
            { children }
        </StoreContext.Provider>
    )
}