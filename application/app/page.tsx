'use client';

import { ethers } from "ethers";
import { useWeb3 } from '@/context/Web3Context';
import { useState } from "react";

interface Data {
  payload: string;
  signedTx: string;
  status: string;
  account: string;
}

export default function Home() {

  const { account, provider } = useWeb3();
  const [data, setData] = useState<Data | null>(null);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nombre = formData.get('nombre') as string;
    const role = formData.get('role') as string;
    const address = formData.get('address') as string;  // Asumiendo que tienes un campo role en tu formulario
  
    if (!nombre || !role || !address) {
      alert('Please fill in all fields');
      return;
    }
  
    if (!provider) {
      alert('Provider not connected');
      return;
    }
  
    try {
      const signer = await provider.getSigner();
      const ethereumAddress = address; // Obtener la dirección Ethereum del usuario
      
      // Crear el mensaje que será firmado
      const message = JSON.stringify({
        action: "createUser",
        name: nombre,
        role: role,
        address: address
      });
      
      // Firmar el mensaje
      const signature = await signer.signMessage(message);
      
      console.log("Signed message:", signature);
      console.log("Ethereum address:", ethereumAddress);
  
      // Verificar la firma (opcional, para debug)
      const verifiedAddress = ethers.verifyMessage(message, signature);
      console.log("Signer", verifiedAddress);
  
      // Enviar los datos al endpoint
      const response = await fetch('http://localhost:5551/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ethereumAddress,
          role,
          signature,
          message
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Server response:", responseData);
      
      // Aquí puedes manejar la respuesta exitosa
      alert('User created successfully!');
      
    } catch (error) {
      console.error("Error during user creation:", error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold"></h1>
      <form className="mt-8 space-y-4 max-w-md" onSubmit={handleSend}>
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            
            name="nombre"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            id="role"
            
            name="role"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Addres
          </label>
          <input
            type="text"
            id="address"
            
            name="address"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            
          />
        </div>
        
       
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          FIRMAR
        </button>
      </form>
{/*       {data && (
        <div>
          <h2>Payload:</h2>
          <pre>{JSON.stringify(data.payload, null, 2)}</pre>
          <h2>Signed Transaction:</h2>
          <pre>{data.signedTx}</pre>
          <h2>Status:</h2>
          <pre>{data.status}</pre>
          <h2>Account:</h2>
          <pre>{data.account}</pre>
        </div>
      )} */}
      
    </div>
  );
} 
  