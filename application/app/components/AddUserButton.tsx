'use client';

import { useState } from 'react';
import AddUserModal from './AddUserModal';
import { Toast } from './Toast'; // Necesitaremos crear este componente

export default function AddUserButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSuccess = (message: string) => {
    setSuccessMessage(message);
    
    // Opcional: Ocultar el mensaje después de unos segundos
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#05df72]  hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
      >
        Add user
      </button>
      
      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
      
      {/* Mostrar mensaje de éxito */}
      {successMessage && (
        <Toast 
          message={successMessage} 
          type="success" 
          onClose={() => setSuccessMessage(null)} 
        />
      )}
    </>
  );
}