
import './App.css'
import { Route, Routes} from 'react-router-dom';
import Registre from './pages/Registre';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';

function App() {

  return (
    <div>
       <Routes>
          <Route index element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/registre" element={<Registre />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
    )
}

export default App
