import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setCurrentUser(parsedUser);
    }

    // Inicializar cuenta admin si no existe
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let updated = false;

    if (!users.find(u => u.email === 'admin@sanosysalvos.cl')) {
      users.push({
        email: 'admin@sanosysalvos.cl',
        password: 'admin',
        name: 'Administrador Principal',
        role: 'ADMIN',
        initial: 'AD'
      });
      updated = true;
    }

    if (!users.find(u => u.email === 'test@user.cl')) {
      users.push({
        email: 'test@user.cl',
        password: '1234',
        name: 'Usuario Demo',
        role: 'USER',
        initial: 'UD'
      });
      updated = true;
    }

    if (updated) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  const fillCredentials = (e, emailVal, passVal) => {
    e.preventDefault();
    setActiveTab('login');
    setEmail(emailVal);
    setPassword(passVal);
    setError('');
    setSuccess('');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password || !name) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      setError('El correo ya está registrado');
      return;
    }

    const newUser = {
      email,
      password,
      name,
      role: 'USER',
      initial: name.substring(0, 2).toUpperCase()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Cuenta creada con éxito. ¡Ahora puedes iniciar sesión!');
    setActiveTab('login');
    // Limpiar campos
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoggedIn(true);
      setCurrentUser(user);
      navigate('/');
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-portal-bg font-dmsans text-white relative overflow-hidden">
      {/* Background Texture & Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[rgba(20,120,80,0.3)] blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgba(80,50,160,0.2)] blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.3em] font-bold text-mint uppercase leading-none mb-1">SANOS Y SALVOS</span>
          <span className="text-xl font-playfair font-bold text-white">Portal de usuarios</span>
        </div>
        
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full p-1">
          {!isLoggedIn ? (
            <>
              <button 
                onClick={() => setActiveTab('login')}
                className={`px-6 py-2 text-sm font-medium transition-colors ${activeTab === 'login' ? 'text-white' : 'text-white/60'}`}
              >
                Iniciar sesión
              </button>
              <button 
                onClick={() => setActiveTab('register')}
                className={`px-6 py-2 text-sm font-bold rounded-full transition-all ${activeTab === 'register' ? 'bg-mint text-portal-bg' : 'text-white/60 hover:text-white'}`}
              >
                Crear cuenta
              </button>
            </>
          ) : (
            <button 
              onClick={handleGoHome}
              className="px-6 py-2 text-sm font-bold bg-mint text-portal-bg rounded-full hover:bg-mint/90 transition-all"
            >
              Ir al Inicio
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 min-h-[calc(100vh-120px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full py-12">
          
          {/* Column Left: Hero */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-mint rounded-full shadow-[0_0_10px_#5dca8e]"></div>
              <span className="text-xs tracking-[0.4em] font-bold text-white/40 uppercase">COMUNIDAD CONECTADA</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-playfair font-extrabold leading-tight mb-6">
              Hola,<br />
              <span className="text-mint italic">bienvenido.</span>
            </h1>
            
            <p className="text-lg text-white/40 font-light leading-relaxed mb-10 max-w-md">
              Gestiona tus reportes, conecta con organizaciones y ayuda a que más mascotas vuelvan a casa.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={(e) => fillCredentials(e, 'test@user.cl', '1234')}
                className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl flex flex-col text-left hover:bg-white/10 hover:border-mint/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2 h-2 bg-mint rounded-full group-hover:shadow-[0_0_8px_#5dca8e] transition-all"></div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">USER DEMO</span>
                </div>
                <span className="text-xs font-mono text-white/60">test@user.cl / 1234</span>
              </button>
              
              <button 
                onClick={(e) => fillCredentials(e, 'admin@sanosysalvos.cl', 'admin')}
                className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl flex flex-col text-left hover:bg-white/10 hover:border-brand-amber/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2 h-2 bg-brand-amber rounded-full group-hover:shadow-[0_0_8px_#f5c842] transition-all"></div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">ADMIN ROOT</span>
                </div>
                <span className="text-xs font-mono text-white/60">admin@sanosysalvos.cl / admin</span>
              </button>
            </div>
          </div>

          {/* Column Right: Session Panel */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
              
              {!isLoggedIn ? (
                <>
                  {/* Tabs */}
                  <div className="flex gap-8 mb-10 border-b border-white/5">
                    <button 
                      onClick={() => setActiveTab('login')}
                      className={`pb-4 text-sm font-medium transition-all relative ${activeTab === 'login' ? 'text-white' : 'text-white/30'}`}
                    >
                      Iniciar sesión
                      {activeTab === 'login' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-mint"></div>}
                    </button>
                    <button 
                      onClick={() => setActiveTab('register')}
                      className={`pb-4 text-sm font-medium transition-all relative ${activeTab === 'register' ? 'text-white' : 'text-white/30'}`}
                    >
                      Crear cuenta
                      {activeTab === 'register' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-mint"></div>}
                    </button>
                  </div>

                  <form onSubmit={activeTab === 'login' ? handleLogin : handleRegister} className="space-y-5">
                    {activeTab === 'register' && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Nombre completo</label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-mint/50 transition-all"
                          placeholder="Tu nombre"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Correo electrónico</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-mint/50 transition-all"
                        placeholder="ejemplo@correo.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Contraseña</label>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-mint/50 transition-all"
                        placeholder="••••••••"
                      />
                    </div>

                    {error && <p className="text-red-400 text-xs font-medium ml-1">{error}</p>}
                    {success && <p className="text-mint text-xs font-medium ml-1">{success}</p>}

                    <button 
                      type="submit"
                      className="w-full py-4 bg-mint text-portal-bg rounded-2xl text-base font-bold hover:bg-mint/90 transition-all shadow-lg shadow-mint/20 mt-4"
                    >
                      {activeTab === 'login' ? 'Iniciar sesión' : 'Registrarme'}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="bg-[rgba(20,120,80,0.2)] border border-mint/20 rounded-3xl p-6 mb-8 relative overflow-hidden group">
                    <div className="absolute top-4 right-4">
                      <div className="w-2 h-2 bg-mint rounded-full animate-ping"></div>
                      <div className="absolute inset-0 w-2 h-2 bg-mint rounded-full"></div>
                    </div>
                    <h3 className="text-mint font-bold mb-1">Sesión activa</h3>
                    <p className="text-xs text-mint/60 leading-relaxed">
                      Bienvenido de vuelta, {currentUser?.name}.
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-10 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-mint/10 border border-mint/20 rounded-full flex items-center justify-center text-mint font-bold text-lg">
                        {currentUser?.initial}
                      </div>
                      <div>
                        <div className="font-bold text-white">{currentUser?.name}</div>
                        <div className={`text-[10px] px-2 py-0.5 rounded inline-block mt-1 font-bold ${currentUser?.role === 'ADMIN' ? 'text-brand-amber bg-brand-amber/10' : 'text-mint bg-mint/10'}`}>
                          {currentUser?.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={handleGoHome}
                      className="w-full py-4 bg-white text-portal-bg rounded-2xl text-sm font-bold hover:bg-white/90 transition-all"
                    >
                      Ir al menú principal
                    </button>
                    <div className="text-center pt-4">
                      <p className="text-sm text-white/30 mb-6">¿Quieres entrar con otra cuenta?</p>
                      <button 
                        onClick={handleLogout}
                        className="w-full py-4 border border-white/10 rounded-2xl text-sm font-bold text-white/60 hover:bg-white/5 hover:text-white transition-all"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
