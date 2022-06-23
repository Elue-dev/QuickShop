export const StoreReducer = (state, action) => {
    switch(action.type)  {
        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, {...action.payload, qty: 1}] }
        case 'REMOVE_FROM_CART':
            return  { ...state, cart: state.cart.filter(i => i.id !== action.payload.id)  }
        case 'CLEAR_CART':
            return { ...state, cart: []}
        case 'ADD_TO_WISHLIST':
            return { ...state, wishlist: [...state.wishlist, {...action.payload}] }
        default:
            return state
    }
}