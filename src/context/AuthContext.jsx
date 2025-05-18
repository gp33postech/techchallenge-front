import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
//precisa fazer a pagina de login
export const AuthProvider = ({ children }) => {
  const [logado, setLogado] = useState(false);
  const [nomeUsuario,setNomeUsuario] = useState('');
 
  
  

  const login = () => setLogado(true);
  const logout = () => setLogado(false);

  return (
    <AuthContext.Provider value={{ logado, login, logout,nomeUsuario, setNomeUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);