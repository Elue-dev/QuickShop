import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import ForgotPassword from './pages/forgot password/ForgotPassword'
import ProductDetails from './pages/product details/ProductDetails';
import Checkout from './pages/checkout/Checkout';
import ProtectedRoute from './components/protected route/ProtectedRoute';
import WishList from './pages/wishlist/WishList';
import Error404 from './pages/error404/Error404'

function App() {
  return (
    <Router>
      <Navbar />
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/:error' element={<Error404 />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/:error' element={<Error404 />} />
            <Route path='/wishlist' element={<WishList />} />
            <Route path='/wishlist/:error' element={<Error404 />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/login/:error' element={<Error404 />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signup/:error' element={<Error404 />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/forgot-password/:error' element={<Error404 />} />
          </Routes>
        </div>
      <Footer />
    </Router>
  );
}

export default App;
