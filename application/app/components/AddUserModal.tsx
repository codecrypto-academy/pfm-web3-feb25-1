// components/AddUserModal.tsx
'use client';

import { useState, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createUser } from '../lib/actions';
import { FormState } from '../lib/definition';

// Función para validar dirección Ethereum
const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Componente para el botón de submit con estado de carga
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {pending ? 'Creando...' : 'Crear Usuario'}
    </button>
  );
}
interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (message: string) => void; // Nueva prop para manejar el éxito
 }

 

export default function AddUserModal({ isOpen, onClose,onSuccess}: AddUserModalProps) {
  // Estado inicial del formulario
  const initialState: FormState = { errors: {} };
  
  
  // Usar useFormState para manejar el estado del formulario y errores del servidor
  const [state, formAction] = useActionState(createUser, initialState);
  
  // Estados locales para validación del lado del cliente
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

    // 1. Añade un estado local para los errores
  const [formErrors, setFormErrors] = useState<FormState['errors']>({});

  // 2. Añade un estado para rastrear si el modal ha sido abierto
  const [hasOpened, setHasOpened] = useState(false);

  // 3. Sincroniza los errores del state con tu estado local cuando cambian
  useEffect(() => {
  if (state.errors) {
    setFormErrors(state.errors);
  }
  }, [state.errors]);

  // 4. Detecta cuando el modal se abre
  useEffect(() => {
  if (isOpen && !hasOpened) {
    setHasOpened(true);
  }
  }, [isOpen, hasOpened]);

  // 5. Resetea los errores cuando el modal se cierra
  useEffect(() => {
  if (!isOpen && hasOpened) {
    // Resetear solo los errores
    setFormErrors({});
    setHasOpened(false);
  }
  }, [isOpen, hasOpened]);

  // Efecto para cerrar el modal después de un envío exitoso
  useEffect(() => {
    if (state.success && formSubmitted) {
      setFormSubmitted(false);
      onClose();
      // Pasar el mensaje de éxito al componente padre
      onSuccess(state.message || 'Usuario creado exitosamente');
    }
  }, [state.success, state.message, formSubmitted, onClose, onSuccess]);

  // Validación de dirección Ethereum en el cliente
  const validateAddress = (value: string) => {
    if (!value) {
      setAddressError('La dirección es requerida');
      return false;
    }
    if (!isValidEthereumAddress(value)) {
      setAddressError('Dirección Ethereum inválida');
      return false;
    }
    setAddressError(null);
    return true;
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const isAddressValid = validateAddress(address);
    
    if (!isAddressValid) {
      e.preventDefault();
      return;
    }
    
    setFormSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Crear Nuevo Usuario</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} action={formAction}>
          {/* Errores generales del formulario */}
          {state.errors?._form && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <ul>
                {state.errors._form.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Campo de dirección Ethereum */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                validateAddress(e.target.value);
              }}
              className={`shadow appearance-none border ${
                addressError || state.errors?.address ? 'border-red-500' : 'border-gray-300'
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="0x..."
            />
            {addressError && (
              <p className="text-red-500 text-xs italic mt-1">{addressError}</p>
            )}
            {state.errors?.address && (
              <ul className="text-red-500 text-xs italic mt-1">
                {state.errors.address.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Campo de nombre */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`shadow appearance-none border ${
                formErrors?.name ? 'border-red-500' : 'border-gray-300'
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Nombre completo"
            />
            {formErrors?.name && (
              <ul className="text-red-500 text-xs italic mt-1">
                {formErrors.name.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Campo de rol */}
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              className={`shadow appearance-none border ${
                state.errors?.role ? 'border-red-500' : 'border-gray-300'
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            >
              <option value="">Seleccionar rol</option>
              <option value="admin">Administrator</option>
              <option value="factory">Factory</option>
              <option value="assembler">Assembler</option>
              <option value="logistic">Logistic</option>
              <option value="retailer">Retailer</option>
              <option value="consumer">Consumer</option>
            </select>
            {state.errors?.role && (
              <ul className="text-red-500 text-xs italic mt-1">
                {state.errors.role.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-between">
            <SubmitButton />
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
