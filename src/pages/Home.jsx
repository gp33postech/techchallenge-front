import React, { useState, useEffect } from 'react';
import Button from '../components/button/Button';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SectionCard from '../components/card/SectionCard';
import InputBusca from '../components/research/InputBusca';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';

const Home = () => {
  const navigate = useNavigate();
  const { logado } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [palavraChave, setPalavraChave] = useState('');
  const [url, setUrl] = useState(`${API_URL}/posts/`);
  const [options, setOptions] = useState({ method: 'GET' });
  const { data, error, loading } = useFetch(url, options);

  const buscar = () => {
    if (palavraChave.trim() !== '') {
      setUrl(`${API_URL}/posts/search?query=${palavraChave}`);
      setOptions({ method: 'POST' });
    } else {
      setUrl(`${API_URL}/posts/`);
      setOptions({ method: 'GET' });
    }
  };

  // Busca inicial e ao limpar a pesquisa (sem debounce)
  useEffect(() => {
    if (palavraChave.trim() === '') {
      buscar();
    }
    // eslint-disable-next-line
  }, [palavraChave === '']);

  // Busca com debounce ao digitar
  useEffect(() => {
    buscar();
    // eslint-disable-next-line
  }, [palavraChave]);

  return (
    <div className="flex flex-col p-12 bg-slate-300 min-h-[100vh]">
      <div className="flex flex-wrap justify-between items-center w-full mt-5">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-700">Postagens</h1>
        <InputBusca
          value={palavraChave}
          text="Pesquisar postagens"
          onChange={(e) => setPalavraChave(e.target.value)}
        />
        {logado && (
          <Button
            texto="Painel Admin"
            icon={UserOutlined}
            onClick={() => navigate('/listaspost')}
            className="text-sm"
          />
        )}
      </div>

      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <span className="text-3xl font-semibold text-gray-700 animate-pulse">
            Carregando...
          </span>
        </div>
      ) : error ? (
        <p className="mt-14 text-sm text-red-700 bg-red-100 border border-red-300 rounded px-4 py-2 text-center">
                    Erro ao carregar os dados
                </p>
      ) : Array.isArray(data) && data.length > 0 ? (
        <SectionCard data={data} />
      ) : (
        <p className="text-center mt-8">Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};

export default Home;