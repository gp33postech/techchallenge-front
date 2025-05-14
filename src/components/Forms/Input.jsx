import React, { useState } from 'react';

const Input = ({
  Titulo,
  placeholder,
  tamanho,
  tipo,
  styleTitulo,
  value,
  onChange,
  accept // Adicione se quiser aceitar só imagens, por exemplo
}) => {
  const [nomeArquivo, setNomeArquivo] = useState("Nenhum arquivo escolhido");

  return (
    <div>
      <h4 className={`${styleTitulo} font-semibold text-sm md:text-base capitalize text-left`}>
        {Titulo}
      </h4>
      {tipo === 'file' ? (
        <div className="flex items-center mt-2">
          <label
            htmlFor="inputArquivo"
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Escolher arquivo
          </label>
          <input
            id="inputArquivo"
            type={tipo}
            accept={accept}
            style={{ display: 'none' }}
            onChange={e => {
              const file = e.target.files[0];
              setNomeArquivo(file ? file.name : "Nenhum arquivo escolhido");
              if (onChange) onChange(e);
            }}
          />
          <span className="ml-3 text-white">{nomeArquivo}</span>
        </div>
      ) : (
        <input
          className={`mb-10 p-1 h-8 focus:outline-none focus:ring-4 focus:ring-blue-600 ${tamanho}`}
          type={tipo}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
