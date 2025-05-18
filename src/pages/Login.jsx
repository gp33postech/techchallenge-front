import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';



function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, setNomeUsuario} = useAuth();
  
  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = [
      { id: 1, email: "filipe@teste.com", password: 123456 },
      { id: 2, email: "adriano@teste.com", password: 123456 },
      { id: 3, email: "gabriela@teste.com", password: 123456 },
      { id: 4, email: "pedro@teste.com", password: 123456 }
    ];
    
    const usuarioEncontrado = usuarios.find((usuario) => usuario.email === email); 
    if (usuarioEncontrado !== undefined) {
      setNomeUsuario(email.substring(0, email.indexOf("@")));
      login();  
      navigate("/Home",{ state: { user: email.substring(0, email.indexOf("@")) } }); 
    } else {
      alert("Usuario ou Senha Inválido!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form 
        className="bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleLogin}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
        >
          Logar
        </button>
      </form>
    </div>
  );
}

export default Login;