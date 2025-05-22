import React from 'react';
import { Table } from 'antd';



const TabelaPost = ({dadosList,idClicado, isModalOpen }) => {
 

  
 
   
      
      const totalData = dadosList.length > 0 ? dadosList.map((lista) => ({
          id: lista._id,
          titulo: lista.title,
          data: new Date(lista.updatedAt).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
          autor: lista.author,
        })) : [];
        
        


      const handleClick = (post) => {
        idClicado(post.id);
        isModalOpen(true);
      };


  const columns = [
    {
      title: 'Título',
      dataIndex: 'titulo',
      render: (text, record) => (
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => handleClick(record)


          }
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.titulo.localeCompare(b.titulo),
    },
    {
      title: 'Data',
      dataIndex: 'data',
      sorter: (a, b) => a.data - b.data,
    },
    {
      title: 'Autor',
      dataIndex: 'autor',
      sorter: (a, b) => a.autor.localeCompare(b.autor),
    },
  ];

  return (
    <>
   
    <div className='w-full overflow-x-auto bg-white rounded shadow capitalize'>
      <Table
        columns={columns}
        
        dataSource={totalData}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </div>
    </>
  );
};

export default TabelaPost;
