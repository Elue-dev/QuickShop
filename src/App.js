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
import Error404 from './components/error404/Error404';

function App() {
  return (
    <Router>
      <Navbar />
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/:error' element={<Error404 />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/wishlist' element={<WishList />} />
            <Route exact path='/product/:id' element={<ProductDetails />} />
            <Route exact path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </div>
      <Footer />
    </Router>
  );
}

export default App;
