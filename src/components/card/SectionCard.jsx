import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const SectionCard = ({ data }) => {
    console.log('SectionCard recebeu:', data);
    const navigate = useNavigate();

    return (
        <>
            <section className="mt-10 flex flex-wrap gap-4 justify-center items-center sm:justify-start">
                {Array.isArray(data) && data.length > 0 ? (
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
                    ))
                ) : (
                    <p className="text-center w-full">Nenhum resultado encontrado.</p>
                )}
            </section>
        </>
    );
};

export default SectionCard;