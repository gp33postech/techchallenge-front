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
  const [dados, setDados] = useState([]); // Estado para armazenar os dados retornados
  const [url, setUrl] = useState(`${API_URL}/posts/`);
  const [options, setOptions] = useState({ method: 'GET' });
  const { data, error, loading } = useFetch(url, options);

  // Função buscar
  const buscar = () => {
    if (palavraChave.trim() !== '') {
      setUrl(`${API_URL}/posts/search?query=${palavraChave}`);
      setOptions({ method: 'POST' });
    } else {
      setUrl(`${API_URL}/posts/`);
      setOptions({ method: 'GET' });
    }
  };

  // useEffect para monitorar mudanças na palavra-chave
  useEffect(() => {
    const delay = setTimeout(() => {
      buscar(); // Chama a função buscar
    }, 100); // Atraso enquanto o usuário digita

    return () => clearTimeout(delay); // Limpa o timeout anterior
  }, [palavraChave]);

  // useEffect para atualizar os dados quando a API retornar
useEffect(() => {
  if (data) {
    console.log('Resposta da API:', data);
    setDados(Array.isArray(data) ? data : []);
  }
}, [data]);
  return (
    <>
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

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <span className="text-3xl font-semibold text-gray-700 animate-pulse">
              Carregando...
            </span>
          </div>
        )}

        {error && <p>Erro ao carregar os dados: {error.message}</p>}

        {dados && (
          <SectionCard data={dados} />
        )}
      </div>
    </>
  );
};

export default Home;