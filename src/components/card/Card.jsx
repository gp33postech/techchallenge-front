const Card = ({ titulo, image, conteudo, autor, updatedAt, onClick, fullWidth }) => {

  function resumirTextoBonito(texto, limite = 100) {
    if (texto.length <= limite) return texto;
    const cortado = texto.slice(0, limite);
    const ultimoEspaco = cortado.lastIndexOf(' ');
    return cortado.slice(0, ultimoEspaco).trim() + '...';
  }

  // Limite maior para lista (fullWidth), menor para carrossel
  const resumo = resumirTextoBonito(conteudo, fullWidth ? 220 : 100);

  const dataArrumada = new Date(updatedAt).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <>
      <div
  className={
    fullWidth
      ? 'flex flex-col w-full md:w-4/5 mx-auto min-h-[340px] h-[380px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-lg hover:bg-gray-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300 ease-in-out'
      : 'flex flex-col w-full sm:max-w-[300px] md:max-w-[350px] lg:max-w-[430px] min-h-[340px] h-[380px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-lg hover:bg-gray-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300 ease-in-out'
  }
  onClick={onClick}
>
        <img
          className='w-full h-40 object-cover rounded-t-lg'
          src={image ? image : "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"}
          alt="IMG"
        />

        <h2
          className="text-2xl font-bold text-center p-1 text-gray-600 truncate"
          title={titulo}
        >
          {titulo}
        </h2>

        <p className='text-gray-600 font-arial p-3 text-sm md:text-base lg:text-lg'>{resumo}</p>

        <div className="flex-grow"></div>
        <p className="flex items-center justify-between text-gray-600 font-arial p-3 text-sm ">
          <span className="capitalize"><b>Autor: </b>{autor}</span>
          <span>
            Atualizado em: {dataArrumada}
          </span>
        </p>
      </div>
    </>
  )
}

export default Card