import React from 'react'

const TextArea = ({Titulo, placeholder,tipo ,value , onChange,styleTitulo}) => {
  return (
    
    <>
    
        <h4 className={`${styleTitulo} font-semibold text-sm md:text-base mb-0 capitalize text-left `}>
        {Titulo}
      </h4>
        <textarea className={`mt-2 p-1 h-60 sm:h-80 focus:outline-none focus:ring-4 focus:ring-blue-600" w-full `} 
        type={tipo} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        />
    </>
    
  )
}

export default TextArea
