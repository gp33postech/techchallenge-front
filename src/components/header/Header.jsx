
import { RiLoginCircleLine,RiUserFollowLine  } from "react-icons/ri";
import { useAuth } from '../../context/AuthContext';




const Header = ({nomeUsuario}) => {
  
  const { logado, login, logout } = useAuth();
  
  
  const handleLogin = () => {
    if (logado) {
      logout();
    }
    else {
      login();
    }
    
  }
  
  return (
    <div className='flex justify-between items-center bg-gray-800 text-white p-4 '>
        <p className='pl-10 text-xl font-bold'>Blog Tech</p>

        { logado ? (
          <div  onClick={handleLogin} 
                className='flex gap-2 justify-center items-center ali mr-10 pr-2'>
                <RiUserFollowLine size={20}/>
                {`${nomeUsuario}`}
          </div>
                  ): (
          <a    onClick={handleLogin}
                className='flex gap-2 justify-center items-center ali mr-10 pr-2 rounded hover:bg-gray-700' href="#"> 
                <RiLoginCircleLine size={20} /> Login
          </a>)
  
       }
        
        
        
        
        
      
    </div>
  )
}

export default Header
