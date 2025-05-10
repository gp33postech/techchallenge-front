import React, { useState,useEffect } from 'react';
import InputBusca from '../components/research/inputBusca';
import { FaPlus } from "react-icons/fa";
import Button from '../components/button/Button';
import TabelaPost from '../components/List/TabelaPost';
import { useFetch } from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import ModalConfirmacao from '../components/modalConfirmacao/ModalConfirmacao';

const ListaPost = () => {
    const [palavraChave, setPalavraChave] = useState('');
    const [dadosTabela,setdadosTabela] = useState('');
    const [idPost, setIdPost] = useState('');
    const [url, setUrl] = useState('http://localhost:5000/api/posts/');
    const [options, setOptions] = useState({ method: 'GET' });
    const { data, error, loading } = useFetch(url,options);
    const [confirmarModal, setConfirmarModal] = useState(false);
    const navigate = useNavigate();
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const buscar = () => {
        if (palavraChave !== '') {
          setUrl(`http://localhost:5000/api/posts/search?query=${palavraChave}`);
          setOptions({ method: 'POST' });
        }else  {
            setUrl('http://localhost:5000/api/posts/');
            setOptions({ method: 'GET' });
        }
      };
    
    useEffect(() => {
        const delay = setTimeout(() => {
          buscar();
        }, 1000);
      
        return () => clearTimeout(delay);
      }, [buscar]);

      useEffect(() => {
        if (data) {
          setdadosTabela(data);
        }
      }, [data]);

    
    return (
     <>
      <ModalConfirmacao
      texto="Deseja editar este post?"
      open={confirmarModal}
      onClose={() => {
       
      setConfirmarModal(false);
        
      }}
       
      onConfirm={() => {
        setConfirmarModal(false);
        navigate(`/editarpost/${idPost}`);
        console.log('Editar post', idPost);
       
      }}
    />
        <div className='p-12 bg-slate-300 min-h-[100vh]'>
            
            <div className='flex flex-wrap justify-between items-center w-full mb-5 '>
                <h1 className='text-3xl font-bold text-gray-700 justify-center items-center '>
                    Lista de Postagem
                </h1>
                <div className='flex flex-wrap gap-3 justify-center items-center '>
                    <InputBusca value={palavraChave}
                        text = {'pesquisar'}
                        onChange={(e) => setPalavraChave(e.target.value)}
                    
                    
                    />
                    <Button className='min-h-[42px]' size={'lg'} onClick={() =>{navigate('/editarpost')}} texto = "novo" icon ={FaPlus}/> 
                        
                    
                    <Button className= 'ml-6 border-[1px] border-solid border-blue-600' onClick={()=>{navigate('/home')}} variant='secondary' texto ="voltar" />
                </div>
            </div>
                {loading && <div className="fixed inset-0 flex items-center justify-center z-50">
                        <span className="text-3xl font-semibold text-gray-700 animate-pulse">Carregando...</span>
            
                </div> }
                {error && <p>Erro ao carregar os dados: {error.message}</p>}

                {dadosTabela && <TabelaPost dadosList={dadosTabela} idClicado={setIdPost} isModalOpen={setConfirmarModal} />}
            
            
        </div>
     </>
    );
};

export default ListaPost;