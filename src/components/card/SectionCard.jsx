import React, { useRef, useState } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SectionCard = ({ data, carousel }) => {
    const navigate = useNavigate();

    // Ref para controlar o carrossel
    const sliderRef = useRef(null);

    const [pagina, setPagina] = useState(0);
    const cardsPorPagina = 3;
    const totalPaginas = Math.ceil(data.length / cardsPorPagina);

    const handlePrev = () => {
        if (carousel && sliderRef.current) {
            sliderRef.current.slickPrev();
        } else {
            setPagina((prev) => Math.max(prev - 1, 0));
        }
    };

    const handleNext = () => {
        if (carousel && sliderRef.current) {
            sliderRef.current.slickNext();
        } else {
            setPagina((prev) => Math.min(prev + 1, totalPaginas - 1));
        }
    };

    const showCarousel = carousel && Array.isArray(data) && data.length >= 3;

    if (showCarousel) {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1024, settings: { slidesToShow: 2 } },
                { breakpoint: 600, settings: { slidesToShow: 1 } }
            ]
        };

        return (
            <section className="mt-10 w-full">
                <Slider ref={sliderRef} {...settings}>
                    {data.map((post) => (
                        <div key={post._id} className="px-2">
                            <Card
                                titulo={post.title}
                                image={post.image}
                                conteudo={post.description}
                                autor={post.author}
                                onClick={() => navigate(`/detalhes/${post._id}`)}
                            />
                        </div>
                    ))}
                </Slider>
                {/* Botões para navegação do carrossel */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={handlePrev}
                        className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
                    >
                        Próxima
                    </button>
                </div>
            </section>
        );
    }

    // Renderização padrão (lista paginada)
    const inicio = pagina * cardsPorPagina;
    const fim = inicio + cardsPorPagina;
    const cardsVisiveis = data.slice(inicio, fim);

    return (
        <>
            <section className="mt-10 flex flex-wrap gap-4 justify-center items-center sm:justify-start">
                {cardsVisiveis.map((post) => (
                    <Card
                        key={post._id}
                        titulo={post.title}
                        image={post.image}
                        conteudo={post.description}
                        autor={post.author}
                        onClick={() => navigate(`/detalhes/${post._id}`)}
                    />
                ))}
            </section>
            <div className="flex justify-center gap-8 mt-10">
                <button
                    onClick={handlePrev}
                    disabled={pagina === 0}
                    className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <button
                    onClick={handleNext}
                    disabled={pagina === totalPaginas - 1}
                    className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
                >
                    Próxima
                </button>
            </div>
        </>
    );
};

export default SectionCard;