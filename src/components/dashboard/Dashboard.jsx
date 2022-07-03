import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { MdSpaceDashboard } from 'react-icons/md'
import { BsHeart, BsForwardFill } from 'react-icons/bs'
import { GiShoppingCart } from 'react-icons/gi'
import { MdBackspace } from 'react-icons/md'
import { useStore } from '../../contexts/StoreContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './dashboard.scss'

export default function Dashboard() {
    const { user, currentUser, logout } = useAuth()
    const { state: { cart, wishlist } } = useStore()
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleLogout = async () => {
        setError('')

        try {
            await logout()
            navigate('/')
            toast.success(`Successfully logged out ${user.email}`, {
              autoClose: 4000, 
              pauseOnFocusLoss: false
            })
        }  catch(err) {
            setError(err.messsge)
        }
    }

  return (
    <div className='dashboard'>
        <p>
           <MdBackspace className='back cart_back' onClick={()=>navigate(-1)} />
        </p>
        <div className='page_desc'>
        <p><Link to='/'>Home</Link> / <span>Dashboard</span></p>
      </div>
        <h1 className="heading">YOUR DASHBOARD</h1>
        <p className='dashboard_header'>
            <MdSpaceDashboard className='dashboard_icon' />
            Welcome to your Dashboard, <b>{user.displayName || user.email}!</b>
        </p><br />
        <p>Your email: <b>{user.email}</b></p> 
         Update this email?
          <Link to='/reset-email'><span style={{ color: '#bb5353', marginLeft: '.3rem'}}>
            Reset here</span>
        </Link>
        <div className="wishlist_details">
            <div className='dashboard_wishlist'>
                <p className='dash_wish'><BsHeart className='dash_icon' /> <b>Wishlist</b></p>
                <p className='wishlist_count'>
                    <BsForwardFill /> You have <b>{wishlist.length === 1 ? 
                    ('1 item') : 
                    `${wishlist.length} items`} </b> in your wishlist so far
                </p>
            </div>
             {wishlist.length ? (
                <div className='dashboard_products'>
                    <p className='prod_details'>{wishlist.length === 1 ? 'It includes': 'They include'}:</p>
                    <div>
                        {wishlist.map(product => (
                            <li key={product.id}>
                                {product.name}
                                &nbsp;(<span style={{ color: '#bb5353'}}>NGN</span> {product.price})
                            </li>
                        ))}
                    </div>
                </div>
             ) : (null)}
        </div>
        <div className="cart_details">
            <p className='dash_cart'>
                <GiShoppingCart className='dash_icon'/> <b>Cart</b>
            </p>
            <p className='cart_count'>
                <BsForwardFill /> You have <b>{cart.length === 1 ? 
                ('1 item') : 
            `${cart.length} items`} </b> in your cart so far
            </p>
        </div>
        {cart.length ? (
                <div className='dashboard_products'>
                    <p className='prod_details'>{cart.length === 1 ? 'Details are:' : 'They include:'}</p>
                    <div>
                        {cart.map(product => (
                            <li key={product.id}>
                                {product.name}
                                &nbsp;(<span style={{ color: '#bb5353'}}>NGN</span> {product.price})
                            </li>
                        ))}
                    </div>
                    <p className='dash_checkout'>Ready to checkout {cart.length === 1 ? ('this product') : ('these products')}? <Link to='/checkout' className='start'>Start now</Link></p>
                </div>
        ) : (null)}
        <button className="dashboard_btn shop_btn"><Link to='/'>Keep shopping</Link></button>
        <button className="dashboard_btn logout_btn" onClick={handleLogout}>Logout</button>
    </div>
  )
}
