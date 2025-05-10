import Button from '../components/button/Button';
import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Forms/Input';
import Textarea from '../components/Forms/TextArea';
import ModalConfirmacao from '../components/modalConfirmacao/ModalConfirmacao';
import { useFetch } from '../hooks/useFetch';

const EditarPost = () => {
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const [options, setOptions] = useState(null);

  const { data, error, loading } = useFetch(url, options);

  const isEdicao = Boolean(id);

  const [titulo, setTitulo] = useState('');
  const [imagem, setImagem] = useState('');
  const [conteudo, setConteudo] = useState('');

  const navigate = useNavigate();
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalSalvar, setModalSalvar] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isEdicao) {
      setUrl(`${API_BASE}/posts/${id}`);
      setOptions({ method: 'GET' });
    }

    if (id && data) {
      setTitulo(data.title);
      setImagem(data.image);
      setConteudo(data.description);
    }
  }, [data, id]);

  return (
    <>
      <ModalConfirmacao
        texto="Deseja excluir?"
        open={modalExcluir}
        onClose={() => setModalExcluir(false)}
        onConfirm={async () => {
          try {
            await fetch(`${API_BASE}/posts/${id}`, {
              method: 'DELETE',
            });

            setModalExcluir(false);
            navigate('/listaspost');
          } catch (err) {
            console.error('Erro ao excluir:', err);
          }
        }}
      />

      <ModalConfirmacao
        texto="Deseja Salvar?"
        open={modalSalvar}
        onClose={() => setModalSalvar(false)}
        onConfirm={async () => {
          const url = isEdicao
            ? `${API_BASE}/posts/${id}`
            : `${API_BASE}/posts`;

          const method = isEdicao ? 'PUT' : 'POST';

          try {
            await fetch(url, {
              method,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: titulo,
                image: imagem,
                description: conteudo,
                ...(isEdicao ? {} : { author: 'Pedro Teste' }),
              }),
            });

            setModalSalvar(false);
            navigate('/listaspost');
          } catch (err) {
            console.error('Erro ao salvar:', err);
          }
        }}
      />

      <div className="p-12 bg-slate-300 min-h-[100vh] justify-center items-center">
        <div className="flex justify-between">
          <h1 className="text-xl md:text-3xl font-bold text-gray-700 justify-center items-center">
            {isEdicao ? 'Editar Postagem' : 'Nova Postagem'}
          </h1>
          <Button
            className="ml-6 border-[1px] border-solid border-blue-600"
            onClick={() => {
              navigate(`/listaspost`);
            }}
            texto="voltar"
            variant="secondary"
            size="sm"
          />
        </div>

        {error && <p className="text-red-700 justify-center text-center">{error.message}</p>}

        <div className="flex justify-center items-center gap-10">
          <div className="flex flex-col self-center gap-1 min-h-[10vh] sm:w-[600px] mt-6 p-6 rounded-lg bg-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            {loading && isEdicao && <p>Carregando...</p>}

            <Input
              Titulo="Título"
              value={titulo}
              placeholder="Título"
              tipo="text"
              tamanho="w-full"
              styleTitulo="text-left text-white"
              onChange={(e) => setTitulo(e.target.value)}
            />

            <Input
              Titulo="Imagem"
              tipo="file"
              tamanho="w-full"
              styleTitulo="text-white"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagem(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />

            <Textarea
              Titulo="Texto da Postagem"
              styleTitulo="text-white"
              placeholder="Texto da Postagem"
              tipo="text"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
            />

            <Button
              texto="Salvar"
              variant="primary"
              className="mt-6"
              onClick={() => setModalSalvar(true)}
            />

            <Button
              texto="excluir"
              className="bg-red-600 hover:bg-red-700 text-white mt-1"
              onClick={() => setModalExcluir(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarPost;
