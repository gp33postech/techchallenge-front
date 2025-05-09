import React from 'react';


const ModalConfirmacao = ({ open, onClose, onConfirm,texto }) => {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">{texto}</h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;