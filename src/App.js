import { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import AllRoutes from './components/AllRoutes';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { ModeContext } from './contexts/ModeContext'

function App() {
  const { mode } = useContext(ModeContext)
  return (
    <div className={`App ${mode}`}>
      <Router>
        <Navbar />
          <AllRoutes />
        <Footer />
      </Router>
    </div>
    
  );
}

export default App;
