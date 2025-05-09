import { useNavigate, useParams} from 'react-router-dom';
import { React,useEffect,useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import Button from '../components/button/Button';

const Detalhes = () => {
    const {id} = useParams();
    const [url, setUrl] = useState(`http://localhost:5000/api/posts/${id}`);
    const [options, setOptions] = useState({method: 'GET'});
    const { data, error, loading } = useFetch(url,options);
    const [titulo, setTitulo] = useState('');
    const navigate = useNavigate();
    const [imagem, setImagem] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [autor, setAutor] = useState('');

    useEffect(() => {
    if(data){
        setTitulo(data.title);
        setImagem(data.image);
        setConteudo(data.description);
        setAutor(data.author);
    }
    }, [data]);
  return (
    <>
    <div className='flex flex-col p-12 bg-slate-300 min-h-[100vh] gap-6 items-center'>
            <div className="flex justify-between items-center w-full mt-5  ">
            
                <h1 className='text-sm sm:text-3xl font-bold text-gray-700 justify-center items-center capitalize '>{titulo}</h1>
                <Button className= 'ml-6 border-[1px] border-solid border-blue-600' onClick={()=>{navigate('/home')}} variant='secondary' texto ="voltar" />
            </div>   
            <div className='flex flex-col justify-center items-center bg-white w-[80vw] shadow-[0_35px_35px_rgba(0,0,0,0.3)] rounded-2xl ring-4'>
                    <img src={ imagem ? imagem : "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d" } alt={titulo} className='w-[50vw] h-[150px] sm:h-[250px] lg:h-[420px] object-cover rounded-lg mt-5' />
                    <p
                    className='text-gray-700 text-sm md:text-lg font-semibold mt-5 text-justify w-[70vw] mb-2'
                    >{conteudo}
                    </p>

                    <p className="mt-4 text-sm italic text-gray-600 text-end">
                        Por <span className="font-semibold text-gray-800 ">{autor}</span>
                    </p>
            </div>

                    
    </div>


    
    </>
  )
}

export default Detalhes
