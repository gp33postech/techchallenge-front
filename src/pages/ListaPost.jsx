import React, { useState, useEffect } from 'react';
import InputBusca from '../components/research/InputBusca';
import { FaPlus } from "react-icons/fa";
import Button from '../components/button/Button';
import TabelaPost from '../components/List/TabelaPost';
import { useFetch } from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import ModalConfirmacao from '../components/modalConfirmacao/ModalConfirmacao';

const ListaPost = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [palavraChave, setPalavraChave] = useState('');
  const [dadosTabela, setdadosTabela] = useState('');
  const [idPost, setIdPost] = useState('');
  const [url, setUrl] = useState(`${API_URL}/posts/`);
  const [options, setOptions] = useState({ method: 'GET' });
  const { data, error, loading } = useFetch(url, options);
  const [confirmarModal, setConfirmarModal] = useState(false);
  const navigate = useNavigate();

  const buscar = () => {
    if (palavraChave !== '') {
      setUrl(`${API_URL}/posts/search?query=${palavraChave}`);
      setOptions({ method: 'POST' });
    } else {
      setUrl(`${API_URL}/posts/`);
      setOptions({ method: 'GET' });
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      buscar();
    }, 1000);

    return () => clearTimeout(delay);
  }, [palavraChave]); // ← corrigido: `buscar` estava na dependência, o que não é necessário

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
        onClose={() => setConfirmarModal(false)}
        onConfirm={() => {
          setConfirmarModal(false);
          navigate(`/editarpost/${idPost}`);
        }}
      />
      <div className="p-12 bg-slate-300 min-h-[100vh]">
        <div className="flex flex-wrap justify-between items-center w-full mb-5">
          <h1 className="text-3xl font-bold text-gray-700">Lista de Postagem</h1>
          <div className="flex flex-wrap gap-3 items-center">
            <InputBusca
              value={palavraChave}
              text="pesquisar"
              onChange={(e) => setPalavraChave(e.target.value)}
            />
            <Button
              className="min-h-[42px]"
              size="lg"
              onClick={() => navigate('/editarpost')}
              texto="novo"
              icon={FaPlus}
            />
            <Button
              className="ml-6 border-[1px] border-solid border-blue-600"
              onClick={() => navigate('/home')}
              variant="secondary"
              texto="voltar"
            />
          </div>
        </div>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <span className="text-3xl font-semibold text-gray-700 animate-pulse">
              Carregando...
            </span>
          </div>
        )}

        {error && <p className="mt-14 text-sm text-red-700 bg-red-100 border border-red-300 rounded px-4 py-2 text-center">
                    Erro ao carregar os dados
                </p>}

        {dadosTabela && (
          <TabelaPost
            dadosList={dadosTabela}
            idClicado={setIdPost}
            isModalOpen={setConfirmarModal}
          />
        )}
      </div>
    </>
  );
};

export default ListaPost;
