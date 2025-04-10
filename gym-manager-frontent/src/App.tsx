
import './App.css'
import { Route, Routes} from 'react-router-dom';
import Registre from './pages/Registre';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Tarifas from './pages/Tarifas';
import { UserProvider } from './context/userContext';
import { ToastContainer } from 'react-toastify';
import Confirmacion from './pages/Confirmacion';
import Clases  from './pages/usuari/Clases';
import Entrenadors from './pages/usuari/Entrenadors';
import Configuracio from './pages/usuari/Configuracio';
import Nutricion from './pages/usuari/Nutricion';
import Contacto from './pages/usuari/Contacto';


import DashboardAdmin from './pages/admin/DashboardAdmin';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; 
import { useState } from 'react';
import { Tarifa } from './type/tarifas';
import DashboardEntrenador from './pages/entrenador/Dashboardentrenador';


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
              <Route path="/profile" element={<Profile />} />
              <Route path='/tarifas' element={<Tarifas setTarifaSel={setTarifaSel} />} />
              <Route path='/admin' element={<DashboardAdmin />} />
              <Route path='/confirmacion' element={<Confirmacion tarifa={TarifaSel}/>} />
              <Route path='/clases' element={<Clases />} />
              <Route path='/entrenadors' element={<Entrenadors />} />
              <Route path='/configuracio' element={<Configuracio />} />
              <Route path='/nutricion' element={<Nutricion />} />
              <Route path='/contacto' element={<Contacto />} />
              
              {/* Rutas para el dashboard del entrenador */}

              <Route path='/dashboardentrenador' element={<DashboardEntrenador />} />
              

          </Routes>
        </div>
        </UserProvider>
        <ToastContainer />
   </I18nextProvider>
    </>
    )
}

export default App

