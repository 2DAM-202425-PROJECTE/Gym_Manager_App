
import './App.css'
import { Route, Routes} from 'react-router-dom';
import Registre from './pages/Registre';
import Login from './pages/Login';


function App() {

  return (
    <div>
       <Routes>
          <Route index element={<Login />}/>
          <Route path="/registre" element={<Registre />} />
      </Routes>
    </div>
    )
}

export default App
