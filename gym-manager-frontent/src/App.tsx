
import './App.css'
import { Route, Routes} from 'react-router-dom';
import Registre from './pages/Registre';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Tarifas from './pages/Tarifas';
import { UserProvider } from './context/userContext';
import { ToastContainer } from 'react-toastify';
import Confirmacion from './pages/Confirmacion';

import DashboardAdmin from './pages/admin/DashboardAdmin';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; 
import { useState } from 'react';
import { Tarifa } from './type/tarifas';

function App() {

  const [TarifaSel, setTarifaSel] = useState<Tarifa | null>();

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
              <Route path='/tarifas' element={<Tarifas setTarifaSel={setTarifaSel} />} />
              <Route path='/admin' element={<DashboardAdmin />} />
              <Route path='/confirmacion' element={<Confirmacion tarifa={TarifaSel}/>} />
          </Routes>
        </div>
        </UserProvider>
        <ToastContainer />
   </I18nextProvider>
    </>
    )
}

export default App

