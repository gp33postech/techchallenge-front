import React from 'react'

const Card = ({titulo,image, conteudo, autor, updatedAt,onClick}) => {

   

    function resumirTextoBonito(texto, limite = 100) {
        if (texto.length <= limite) return texto;
        const cortado = texto.slice(0, limite);
        const ultimoEspaco = cortado.lastIndexOf(' ');
        return cortado.slice(0, ultimoEspaco).trim() + '...';
      }

      const resumo = resumirTextoBonito(conteudo);

      const dataFormatada = updatedAt
        ? new Date(updatedAt).toLocaleDateString('pt-BR')
        : '';

  return (
    <>
        
            <div className='flex flex-col w-full min-h-[360px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[430px]   bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-lg hover:bg-gradient-to-b hover:from-gray-100 hover:to-gray-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300 ease-in-out'
            onClick={onClick}
            >
                
                <img className='"w- h-40 object-cover rounded-t-lg'  src={ image ? image : "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d" } alt="IMG" 
                
                />
                
               
                <h2 className='text-2xl font-bold text-center p-1 text-gray-600'>{titulo}</h2>
               
                <p className='text-gray-600 font-arial p-3 text-sm md:text-base lg:text-lg '>{resumo}</p>

                <p className='text-gray-600 font-arial p-3 text-sm'>
                    <b>Autor: </b>
                    {autor}
                </p>
           
            {updatedAt && (
                <p className='text-gray-600 font-arial p-3 text-sm'>
                    Atualizado em: {dataFormatada}
                </p>
            )}
       
                
            </div>
            
            
        
    </>
  )
}

export default Card
