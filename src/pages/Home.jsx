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

  // Único useEffect para busca: busca imediata ao abrir/limpar, debounce ao digitar
  useEffect(() => {
    if (palavraChave.trim() === '') {
      buscar();
      return;
    }
    const delay = setTimeout(() => {
      buscar();
    }, 300);
    return () => clearTimeout(delay);
    // eslint-disable-next-line
  }, [palavraChave]);

  return (
  <div className="bg-slate-300 min-h-[100vh]">
    <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-700 mt-7">Postagens</h1>
      {logado && (
        <div className="self-start sm:self-auto">
          <Button
            texto="Painel Admin"
            icon={UserOutlined}
            onClick={() => navigate('/listaspost')}
            className="text-base"
          />
        </div>
      )}
    </div>
    <div className="flex flex-col items-center mt-8 mb-6">
      <InputBusca
        value={palavraChave}
        text="Pesquisar postagens"
        onChange={(e) => setPalavraChave(e.target.value)}
        className="w-full max-w-xl"
      />
    </div>
    <div className="mt-8">
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
        <SectionCard data={data} carousel />
      ) : (
        <p className="text-center mt-8">Nenhum resultado encontrado.</p>
      )}
    </div>
  </div>
);}

export default Home;