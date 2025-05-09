import {React} from 'react'
import Button from '../components/button/Button';
import { UserOutlined    } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SectionCard from '../components/card/sectionCard';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    
    const navigate = useNavigate();
    const { logado } = useAuth();

   
  return (
    <>
        <div className='flex flex-col p-12 bg-slate-300 min-h-[100vh]'>
          <div className="flex flex-wrap justify-between items-center w-full mt-5">
            <h1 className='text-xl sm:text-3xl font-bold text-gray-700 justify-center items-center  '>Postagens</h1>
           {logado && <Button 
           texto="Painel Admin"
           icon={UserOutlined}
            onClick={() => navigate('/listaspost')}
            className='text-sm '
           />}
          </div>
            <SectionCard/>
    
        </div>
    
    </>
  )
}

export default Home
