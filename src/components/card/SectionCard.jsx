import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SectionCard = ({ data, carousel }) => {
    const navigate = useNavigate();

    // Só ativa o carrossel se a prop vier e houver pelo menos 3 posts
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
                <Slider {...settings}>
                    {data.map((post) => (
                        <div key={post._id} className="px-2">
                            <Card
                                titulo={post.title}
                                image={post.image}
                                conteudo={post.description}
                                autor={post.author}
                                updatedAt={post.updatedAt}
                                onClick={() => navigate(`/detalhes/${post._id}`)}
                            />
                        </div>
                    ))}
                </Slider>
            </section>
        );
    }

    // Renderização padrão (lista)
    return (
        <section className="mt-10 flex flex-wrap gap-4 justify-center items-center sm:justify-start">
            {Array.isArray(data) && data.length > 0 &&
                data.map((post) => (
                    <Card
                        key={post._id}
                        titulo={post.title}
                        image={post.image}
                        conteudo={post.description}
                        autor={post.author}
                        onClick={() => navigate(`/detalhes/${post._id}`)}
                    />
                ))
            }
        </section>
    );
};

export default SectionCard;