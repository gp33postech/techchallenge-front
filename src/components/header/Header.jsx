import { RiLoginCircleLine,RiUserFollowLine  } from "react-icons/ri";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Header = () => {
  
  const {logado,nomeUsuario, logout, setNomeUsuario} = useAuth();
  
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home')
  }
  
  const handleLogin = () => {
    if (!logado) {              
      navigate('/login');
    }else {
      confirm('deseja mesmo fazer o logout ?')
      logout()
    
      setNomeUsuario('')
    }
  }
  
  return (
    <div className='flex justify-between items-center bg-gray-800 text-white p-4 capitalize '>
        <p className='pl-10 text-xl font-bold' onClick={goToHome}>Blog Tech</p>
        
        
        {nomeUsuario ? (
          <a onClick={handleLogin}
          className='flex gap-2 justify-center items-center ali mr-10 pr-2 rounded hover:bg-gray-700' href="#"> 
          <RiUserFollowLine size={20} /> {nomeUsuario}
        </a>

        ): 
        
        
        
        (<a onClick={handleLogin}
          className='flex gap-2 justify-center items-center ali mr-10 pr-2 rounded hover:bg-gray-700' href="#"> 
          <RiLoginCircleLine size={20} /> Login
        </a>)}
        
       
    </div>
  )
}

export default Header
