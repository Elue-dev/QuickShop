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
import Dashboard from './components/dashboard/Dashboard';
import Admin from './components/admin/Admin';
import Update from './pages/name/Update';

function App() {
  return (
    <Router>
      <Navbar />
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<WishList />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path ='/reset-email' element ={<Update />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </div>
      <Footer />
    </Router>
  );
}

export default App;
