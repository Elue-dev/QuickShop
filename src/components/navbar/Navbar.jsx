import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { BsFillHeartFill } from 'react-icons/bs'
import { ImCart } from 'react-icons/im'
import './navbar.scss'
import { useStore } from '../../contexts/StoreContext'
import { useState } from 'react'

export default function Navbar() {
  const { state: {cart} } = useStore()
  const [showAuth, setShowAuth] = useState(false)

  return (
    <nav>
      <div className="navbar">
        <Link to='/' className='logo'><p>Quick<span>Shop</span></p></Link>
          <ul className='nav_links'>
            <li><p><FaUserAlt className='nav_icon user' onClick={()=>setShowAuth(!showAuth)} /></p></li>
            <li><Link to='/'><BsFillHeartFill className='nav_icon wishlist' /></Link></li>
            <li><Link to='/cart'><ImCart className='nav_icon cart' /></Link></li>
            <Link to='/'><span className='wishlist_count count'>0</span></Link>
            <Link to='/cart'><span className='cart_count count'>{cart.length}</span></Link>
            <div className='user_auth' onClick={()=>setShowAuth(false)}>
              <div className={showAuth ? 'auth_links show' : 'auth_links'}>
                <Link to='/login'>Login</Link><br />
                <Link to='/signup'>Sign Up</Link>
              </div>
            </div>
          </ul>
      </div>
    </nav>
  )
}
