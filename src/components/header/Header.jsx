import { RiLoginCircleLine,RiUserFollowLine  } from "react-icons/ri";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Header = ({nomeUsuario}) => {
  
  const { logado} = useAuth();
  
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home')
  }
  
  const handleLogin = () => {
    if (!logado) {              
      navigate('/login');
    }
  }
  
  return (
    <div className='flex justify-between items-center bg-gray-800 text-white p-4 '>
        <p className='pl-10 text-xl font-bold' onClick={goToHome}>Blog Tech</p>
        <a onClick={handleLogin}
          className='flex gap-2 justify-center items-center ali mr-10 pr-2 rounded hover:bg-gray-700' href="#"> 
          <RiLoginCircleLine size={20} />  {`${nomeUsuario}`}
        </a>
    </div>
  )
}

export default Header
