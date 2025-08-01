import { useNavigate, useParams } from 'react-router-dom';
import { React, useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import Button from '../components/button/Button';

const Detalhes = () => {
  const { id } = useParams();
  const API_BASE = import.meta.env.VITE_API_URL;

  const [url, setUrl] = useState(`${API_BASE}/posts/${id}`);
  const [options, setOptions] = useState({ method: 'GET' });

  const { data, error, loading } = useFetch(url, options);
  const [titulo, setTitulo] = useState('');
  const navigate = useNavigate();
  const [imagem, setImagem] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [updatedAt, setUpdateAt] = useState('');
  const paragrafos = conteudo.split(/\r?\n/);
  


    const dataArrumada = new Date(updatedAt).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  useEffect(() => {
    if (data) {
      setTitulo(data.title);
      setImagem(data.image);
      setConteudo(data.description);
      setAutor(data.author);
      setUpdateAt(data.updatedAt);

    }
  }, [data]);

  

  return (
    <>
      {loading && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <span className="text-3xl font-semibold text-gray-700 animate-pulse">
                        Carregando...
                    </span>
                </div>
            )}
            {error && (
                <p className="mt-14 text-sm text-red-700 bg-red-100 border border-red-300 rounded px-4 py-2 text-center">
                    Erro ao carregar os dados
                </p>
            )}

{data && (<div className="flex flex-col p-12 bg-slate-300 min-h-[100vh] gap-6 items-center">
        <div className="flex justify-between items-center w-full mt-5">
          <h1 className="text-sm sm:text-3xl font-bold text-gray-700 capitalize">
            {titulo}
          </h1>
          <Button
            className="ml-6 border-[1px] border-solid border-blue-600"
            onClick={() => {
              navigate('/home');
            }}
            variant="secondary"
            texto="voltar"
          />
        </div>

        <div className="flex flex-col justify-center items-center bg-white w-[80vw] shadow-[0_35px_35px_rgba(0,0,0,0.3)] rounded-2xl ring-4">
          <img
            src={
              imagem
                ? imagem
                : 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
            }
            alt={titulo}
            className="w-[50vw] h-[150px] sm:h-[250px] lg:h-[420px] object-cover rounded-lg mt-5"
          />
         <div className="text-gray-700 text-sm md:text-lg font-semibold mt-5 w-[70vw]">
              {paragrafos.map((paragrafo, index) =>
                paragrafo.trim() !== '' ? (
                <p
                  key={index}
                    className={`text-left leading-snug indent-8 mb-2 last:mb-0`}
                  >
                {paragrafo}
      </p>
    ) : null
  )}
</div>
          <div className='flex justify-between items-center w-full p-5'>
          <p className="text-sm italic text-gray-600 text-end">
            Por{' '}
            <span className=" font-semibold text-gray-800">
              {autor} 
            </span>
          </p>
          <p className=' font-semibold text-gray-800 ' > {dataArrumada} </p>
          </div>
          
        </div>
      </div>)}
      
    </>
  );
};

export default Detalhes;
