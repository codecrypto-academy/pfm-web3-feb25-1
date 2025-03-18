import React from 'react';

const Header: React.FC = () => {
    return (
      <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">Mi Aplicación</div>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          
        >
          Conectar
        </button>
      </header>
    );
  };
  
  export default Header;