import { useState, useEffect} from 'react'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { MdOutlineReportGmailerrorred } from 'react-icons/md'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './signup.scss'

export default function SignUp() {
  const emailRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword]=  useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { signup } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    emailRef.current.focus()
}, [])


  const handleSubmit = async e => {
    e.preventDefault()

    if (password !== confirmPassword) {
        setError('Passwords do not match')
        window.setTimeout(() => {
          setError('')
         }, 3000)
      return
    }

    if (password.length > 9) {
      setError('Password must be between 6-9 characters')
      window.setTimeout(() => {
       setError('')
      }, 3000)
      return
    }

    try {
      setError('')
      setLoading(true)
      await signup(email, password)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      toast.success('Successfully signed up', {autoClose: 3000, pauseOnFocusLoss: false})
      navigate('/')
    } catch(err) {
        if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
          setError('Email already in use')
          window.setTimeout(() => {
            setError('')
        }, 3000)
        }
        if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
          setError('Password should be at least 6 characters')
          window.setTimeout(() => {
            setError('')
        }, 3000)
        }
        if (err.message === 'Firebase: Error (auth/invalid-email).') {
          setError('Invalid email')
          window.setTimeout(() => {
            setError('')
        }, 3000)
        }
        if (err.message === 'Firebase: Error (auth/network-request-failed).') {
          setError('Please check your internet connection')
          window.setTimeout(() => {
            setError('')
        }, 3000)
        }
     }

     setLoading(false)
  }

  return (
    <div className='signup'>
      <h1>Create Account</h1>
      {error && <p className='alert error'> <MdOutlineReportGmailerrorred className='error_icon' />  {error} </p>}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span> <br />
            <input type="email" value={email} ref={emailRef} onChange={(e)=>setEmail(e.target.value)} required/>
        </label> <br />
        <label>
          <span>Password:</span> <br />
            <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} required placeholder='At least 6 characters' />
        </label> <br />
        <label>
          <span>Re-enter Password:</span> <br />
            <input type="password" value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)} required />
        </label> <br />
        <button className="btn disabled">Continue</button>
      </form>
      <p className='get_account'>Have a QuickShop account? <Link to='/login'>Login</Link></p>
    </div>
  )
}