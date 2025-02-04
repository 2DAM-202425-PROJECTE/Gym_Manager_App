
import './App.css'
import { Route, Routes} from 'react-router-dom';
import Registre from './pages/Registre';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Pago from './pages/Pago';
import { UserProvider } from './context/userContext';
import { ToastContainer } from 'react-toastify';

import DashboardAdmin from './pages/admin/DashboardAdmin';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; 

function App() {
  return (
    <>
   <I18nextProvider i18n={i18n}>
    <ToastContainer />
        <UserProvider>
          <div>
          <Routes>
              <Route index element={<Home />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/registre" element={<Registre />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/pago' element={<Pago />} />
              <Route path='/admin' element={<DashboardAdmin />} />
          </Routes>
        </div>
        </UserProvider>
        <ToastContainer />
   </I18nextProvider>
    </>
    )
}

export default App

