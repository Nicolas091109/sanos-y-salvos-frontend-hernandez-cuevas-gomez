import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <nav className="bg-white shadow-md p-4 flex justify-center space-x-6">
        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">Iniciar Sesión</Link>
        <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">Registrarse</Link>
      </nav>

      <div className="container mx-auto">
        <Routes>
          {/* Ruta por defecto redirige a Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;