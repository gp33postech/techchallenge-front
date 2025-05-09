import React from 'react'



const Input = ({Titulo, placeholder, tamanho,tipo ,styleTitulo,value,onChange } ) => {
   
  return (
    <>
      <h4 className={`${styleTitulo} font-semibold text-sm md:text-base capitalize text-left`}>
        {Titulo}
      </h4>
      <input className={`mb-10 p-1 h-8 focus:outline-none focus:ring-4 focus:ring-blue-600" ${tamanho}`} 
      type={tipo} 
      placeholder={placeholder}
      value={value} 
      onChange={onChange}
      />
    </>
  )
}

export default Input
