import { useEffect, useState } from 'react'
import { useStore } from '../../contexts/StoreContext'
import { MdDelete  } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import { ImPriceTags } from 'react-icons/im'
import { BsFillBasket3Fill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './cart.scss'
import { useAuth } from '../../contexts/AuthContext'

export default function Cart() {
    const { state: {cart}, removeFromCart } = useStore()
    const [count, setCount] = useState(1)
    const [total, setTotal] = useState(null)
    const { user } = useAuth()
    const { clearCart} =  useStore()
    const navigate = useNavigate()

    useEffect(() => {
        setTotal(cart.reduce((total, current) => total + Number(current.price - 349), 0))
    }, [cart])

    const handleRemoveItem = (product) => {
        removeFromCart(product)
        toast.success('Item removed from your cart', {autoClose: 1000, pauseOnFocusLoss: false} )
    }

    const handleClearCart  = () => {
        clearCart()
        toast.success('Cart cleared', {autoClose: 1000, pauseOnFocusLoss: false} )
    }

    const handleCheckoutRedirect= () => {
        if (!user) {
          toast.info('You must add an account to checkout', {autoClose: 1900, pauseOnFocusLoss: false})
          navigate('/login')
        }
      }

  return (
    <div className='cart'>
        <h1 className='cart_title'>Your cart</h1>
        {!cart.length && <p className='cart_empty'>Your QuckShop Cart is Empty, <Link to='/'>Start shopping</Link></p> }
        {cart?.map(item => (
            <>
                <div className="cart_item" key={item.id}>
                    <div className="item_image">
                        <Link to={`/product/${item.id}`}><img src={item.preview} alt={item.name} /></Link>
                    </div>
                    <div> {item.name}</div>
                    <div><b>NGN</b> {item.price - 349}</div>
                    <div><b>Quantity:</b> <input
                        type="text" 
                        value={count} 
                        onChange={(e)=>setCount(e.target.value)} 
                        className='count_input' /> <br /></div>
                         <Link to={`/product/${item.id}`}><FaEye className='view_item' /></Link>
                    <button className="remove_item" onClick={() => handleRemoveItem(item)}>
                        <MdDelete className='remove_icon' />
                    </button>
                </div>
                <hr /><hr />
            </>
        ))}
        {cart.length > 1 ? (
            <div className='clear_cart_row'>
                <p>.</p>
                <p className='clear_cart' onClick={handleClearCart}>Clear cart</p>
            </div>
        ): null}
       {cart.length ? (
            <div className="summary">
                <h2 className='summary_title'>Summary</h2>
                <p><BsFillBasket3Fill className='summary_icon' /><b><i>Number of Products:</i></b> {cart.length}</p>
                <p><ImPriceTags className='summary_icon' /><b><i>Total cost:</i></b> NGN {total}</p>
                <Link to='/checkout' onClick={handleCheckoutRedirect} className='checkout_btn'>Checkout</Link>
            </div>
       ) : null}
    </div>
  )
}