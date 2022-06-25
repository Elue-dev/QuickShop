import { useAuth } from '../../contexts/AuthContext'
import { useStore } from '../../contexts/StoreContext'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { RiShoppingCartLine } from 'react-icons/ri'
import './checkout.scss'
import { useEffect, useState } from 'react';

export default function Checkout() {
  const { user } = useAuth()
  const { state: { cart }, products } = useStore()
  const [total, setTotal] = useState(null)

  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: products.price,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    redirect_url: "https://quickshopapp.netlify.app",
    customer: {
      email: user.email,
    },
    customizations: {
      title: 'QuickShop checkout',
      description: 'Payment for items in cart',
      logo:  'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    setTotal(cart.reduce((total, current) => total + Number(current.price - 349), 0))
}, [cart])

  return (
    <div className='checkout'>
      {cart.length ? (
        <>
          <h1 className="heading">Confirm your order</h1>
          <p>Reciepient: <b>{user.email}</b></p>
          <div className="heading_grid">
              <p>Product</p>
              <p>Name</p>
              <p>Price</p>
          </div>
          {cart.map(product => (
            <div>
    
              <div className="details_grid">
                <img src={product.preview} alt={product.name} />
                <p>{product.name}</p>
                <p>NGN {product.price - 349}</p>
              </div>
              <hr /> <br />
            </div>
          ))}
          <div className='pay_grid'>
            <p>.</p>
            <button className='pay_btn' onClick={() => {
                        handleFlutterPayment({
                        callback: (response) => {
                        console.log(response);
                        closePaymentModal()
                     },
                     onClose: () => {},
                });
                }}>Pay NGN{total}</button>
          </div>
      </>) : (
        <h1>Nothing to checkout</h1>
      )}

      {cart.length ? (
        <div style={{ paddingTop: '3rem'}} className='cards'>
          For flutterwave cards to test with in the payment page, use any of the cards in this  
          <a 
           href='https://developer.flutterwave.com/docs/integration-guides/testing-helpers/' 
           style={{ color: '#bb5353'}}>Link
          </a>
        </div>
      ) : null}
    </div>
  )
}
