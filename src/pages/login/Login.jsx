import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineReportGmailerrorred } from 'react-icons/md'
import { BiLoader } from 'react-icons/bi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../contexts/AuthContext'
import './login.scss'
import { useEffect } from 'react'

export default function Login() {
  const emailRef = useRef(null)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
      emailRef.current.focus()
  }, [])


  async function handleSubmit(e) {
    e.preventDefault()

    try {
        setError('')
        setLoading(true)
        await login(email, password)
        setEmail('')
        setPassword('')
        navigate('/')
        setLoading(false)
        toast.success('Successfully logged in', {autoClose: 3000, pauseOnFocusLoss: false})
    } catch (err){
        if (err.message === 'Firebase: Error (auth/user-not-found).') {
            setError('User not found')
            window.setTimeout(() => {
              setError('')
          }, 3000)
        }
        if (err.message === 'Firebase: Error (auth/wrong-password).') {
            setError('Wrong password')
            window.setTimeout(() => {
              setError('')
          }, 3000)
        }
        if (err.message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
            setError('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later')
            window.setTimeout(() => {
              setError('')
          }, 15000)
        }
    }
    setLoading(false)
}

  return (
    <div className='login'>
      <h1>Log In</h1>
      {error && <p className=' alert error'> <MdOutlineReportGmailerrorred className='error_icon' />  {error} </p>}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span> <br />
            <input 
             type="email"
             value={email} 
             ref={emailRef}
             onChange={(e)=>setEmail(e.target.value)} 
            />
        </label> <br />
        <label>
          <span>Password:</span> <br />
            <input 
              type="password"
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} 
              required
             />
        </label> <br />
        <button className='btn'>{loading ? <BiLoader /> : 'Continue'}</button>
      </form>
      <p className='forgot_password'>
        <Link to='/forgot-password'>Forgot password?</Link>
      </p>
      <p className='get_account'>New to QuickShop? 
        <Link to='/signup'>Sign Up</Link>
      </p>
    </div>
  )
}