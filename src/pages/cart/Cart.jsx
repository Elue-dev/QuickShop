import { useState } from 'react'
import { useStore } from '../../contexts/StoreContext'
import { MdDelete  } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './cart.scss'

export default function Cart() {
    const { state: {cart}, removeFromCart } = useStore()
    const [count, setCount] = useState(1)

  return (
    <div className='cart'>
        <h1 className='cart_title'>Your cart</h1>
        {!cart.length && <p className='cart_empty'>Cart is Empty, <Link to='/'>Start adding items</Link></p> }
        {cart.map(item => (
            <>
            <div className="cart_item" key={item.id}>
                <div className="item_image">
                    <img src={item.preview} alt={item.name} />
                </div>
                <div> {item.name}</div>
                <div><b>NGN</b> {item.price}</div>
                <div><b>Quantity:</b> <input type="text" value={count} onChange={(e)=>setCount(e.target.value)} className='count_input' /> <br /></div>
                <button className="remove_item" onClick={() => removeFromCart(item)}><MdDelete className='remove_icon' /></button>
            </div>
            {cart.length !== 1 ? (<p><hr /><hr /></p> ): ''}
            </>
        ))}
    </div>
  )
}