import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineReportGmailerrorred } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import GoogleButton from 'react-google-button'
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
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { login, googleSignIn } = useAuth()

  useEffect(() => {
      emailRef.current.focus()
  }, [])

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/')
      toast.success('Successfully logged in', {autoClose: 2000, pauseOnFocusLoss: false} )
    } catch(err) {
        if (err.message === 'Firebase: Error (auth/popup-closed-by-user).') {
          setError('Google sign in failed. (You exited the google sign in)')
          window.setTimeout(() => {
            setError('')
        }, 3500)
        }
    }
  }


  async function handleSubmit(e) {
    e.preventDefault()

    try {
        setError('')
        setLoading(true)
        await login(email, password)
        setEmail('')
        setPassword('')
        navigate('/')
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
      <div className="google_signin">
        {/* <div className='google'><GoogleButton className='google_signIn' onClick={handleGoogleSignIn} style={{ width: '500px', fontWeight: '700', fontSize: '1.3rem'}} /></div> */}
        <button onClick={handleGoogleSignIn} className="btn g_signin">
          <div><FcGoogle className='google_icon' /></div>
          <div>Sign in with google</div>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span> <br />
            <input type="email" value={email} ref={emailRef} onChange={(e)=>setEmail(e.target.value)}  />
        </label> <br />
        <label>
          <span>Password:</span> <br />
            <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} required />
        </label> <br />
        <button className='btn'>Continue</button>
      </form>
      <p className='forgot_password'><Link to='/forgot-password'>Forgot password?</Link></p>
      <p className='get_account'>New to QuickShop? <Link to='/signup'>Sign Up</Link></p>
    </div>
  )
}