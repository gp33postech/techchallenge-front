import React, { useState, useEffect } from 'react';
import Button from '../components/button/Button';
import { UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SectionCard from '../components/card/SectionCard';
import InputBusca from '../components/research/InputBusca';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { useIsMobile } from "../hooks/useIsMobile";

const Home = () => {
  const navigate = useNavigate();
  const { logado } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [palavraChave, setPalavraChave] = useState('');
  const [url, setUrl] = useState(`${API_URL}/posts/`);
  const [options, setOptions] = useState({ method: 'GET' });
  const { data, error, loading } = useFetch(url, options);
  const isMobile = useIsMobile();

  // Estado para alternar visualização
  const [visualizacaoCarrossel, setVisualizacaoCarrossel] = useState(!isMobile);
  // Sempre começa como lista no mobile
  useEffect(() => {
  if (isMobile) setVisualizacaoCarrossel(false);
  else setVisualizacaoCarrossel(true);
}, [isMobile]);

  const buscar = () => {
    if (palavraChave.trim() !== '') {
      setUrl(`${API_URL}/posts/search?query=${palavraChave}`);
      setOptions({ method: 'POST' });
    } else {
      setUrl(`${API_URL}/posts/`);
      setOptions({ method: 'GET' });
    }
  };

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
    <div className="bg-slate-300 min-h-[100vh] px-12 py-8">
      <div className="flex items-center justify-between w-full gap-4 flex-col sm:flex-row">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-700 mb-0">Postagens</h1>
        <div className="flex-1 flex justify-center">
          <InputBusca
            value={palavraChave}
            text="Pesquisar postagens"
            onChange={(e) => setPalavraChave(e.target.value)}
            className="w-full max-w-xl"
          />
        </div>
        {logado ? (
          <div className="flex-shrink-0 ml-0 sm:ml-4">
            <Button
              texto="Painel Admin"
              icon={UserOutlined}
              onClick={() => navigate('/listaspost')}
              className="text-base"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 ml-0 sm:ml-4" style={{ width: 120 }} />
        )}
      </div>

      {/* Botão de alternância de visualização */}
      <div className="flex justify-end mb-2">
        <button
          className={`flex items-center gap-1 px-2 py-1 text-xs rounded shadow-sm border border-gray-300 ${!visualizacaoCarrossel ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"} transition`}
          onClick={() => setVisualizacaoCarrossel((prev) => !prev)}
          aria-label="Alternar visualização"
         
        >
          <UnorderedListOutlined />
          Visualização
        </button>
      </div>

      <div className="mt-2">
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
          <SectionCard data={data} carousel={visualizacaoCarrossel} />
        ) : (
          <p className="text-center mt-8">Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Home;