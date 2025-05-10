import { React, useState } from 'react';
import Card from './Card';
import { useFetch } from '../../hooks/useFetch';
import ModalConfirmacao from '../modalConfirmacao/ModalConfirmacao';
import { useNavigate } from 'react-router-dom';

const SectionCard = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [url, setUrl] = useState(`${API_URL}/posts/`);
    const [options, setOptions] = useState({ method: 'GET' });
    const { data, error, loading } = useFetch(url, options);
    const navigate = useNavigate();

    return (
        <>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <span className="text-3xl font-semibold text-gray-700 animate-pulse">
                        Carregando...
                    </span>
                </div>
            )}
            {error && <p>Erro ao carregar os dados: {error.message}</p>}

            <section className="mt-10 flex flex-wrap gap-4 justify-center items-center sm:justify-start">
                {data &&
                    data.map((post) => (
                        <Card
                            key={post._id}
                            titulo={post.title}
                            image={post.image}
                            conteudo={post.description}
                            autor={post.author}
                            onClick={() => {
                                navigate(`/detalhes/${post._id}`);
                            }}
                        />
                    ))}
            </section>
        </>
    );
};

export default SectionCard;
