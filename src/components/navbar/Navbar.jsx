import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { BsFillHeartFill } from 'react-icons/bs'
import { ImCart } from 'react-icons/im'
import './navbar.scss'
import { useStore } from '../../contexts/StoreContext'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Navbar() {
  const { state: { cart, wishlist } } = useStore()
  const [showAuth, setShowAuth] = useState(false)
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()
  const { user, logout } = useAuth()

    const handleLogout = async () => {
        setError('')

        try {
            await logout()
            navigate('/')
            toast.success('Successfully logged out', {autoClose: 2000, pauseOnFocusLoss: false})
        }  catch(err) {
            setError(err.messsge)
        }
    }

  return (
    <nav>
      <div className="navbar">
        <Link to='/' className='logo'><p>Quick<span>Shop</span></p></Link>
          <ul className='nav_links'>
            <li><p><FaUserAlt className='nav_icon user' onClick={()=>setShowAuth(!showAuth)} /></p></li>
            {/* <li><Link to='/wishlist'><BsFillHeartFill className='nav_icon wishlist' /></Link></li> */}
            <li><Link to='/cart'><ImCart className='nav_icon cart' /></Link></li>
            {/* <Link to='/wishlist'><span className='wishlist_count count'>{wishlist.length}</span></Link> */}
            <Link to='/cart'><span className='cart_count count'>{cart.length}</span></Link>
            <div className='user_auth' onClick={()=>setShowAuth(false)}>
              <div className={showAuth ? 'auth_links show' : 'auth_links'}>
                {user ? (
                  <>
                    <p>Hi, <b>{user.email}</b></p><br />
                    <p className='logout' onClick={handleLogout}>Logout</p>
                  </>
                ) : (
                  <>
                    <Link to='/login'>Login</Link><br />
                    <Link to='/signup'>Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </ul>
      </div>
      <ToastContainer />
    </nav>
  )
}
