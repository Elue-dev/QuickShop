import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';

function App() {
  return (
    <Router>
      <Navbar />
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
          </Routes>
        </div>
      <Footer />
    </Router>
  );
}

export default App;
