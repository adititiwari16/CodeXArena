import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
// import Footer from './components/Footer';
import Login from './pages/login';
import Signup from './pages/register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Problems from './pages/problems'; 
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
              <Problems />
            </PrivateRoute>
          } />
          <Route path="/problems" element={<Problems />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
