import { useAuth } from '../../contexts/AuthContext'
import { useStore } from '../../contexts/StoreContext'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { RiShoppingCartLine } from 'react-icons/ri'
import './checkout.scss'

export default function Checkout() {
  const { user } = useAuth()
  const { state: { cart }, products } = useStore()

  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: products.price,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    redirect_url: "https://localhost:3000",
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
                <img src={product.preview} alt="" />
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
                }}>Pay</button>
          </div>
      </>) : (
        <h1>Nothing to checkout</h1>
      )}
    </div>
  )
}
