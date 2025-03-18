'use server';

import { revalidatePath } from 'next/cache';
import { FormState } from './definition';

export async function testForm(formData: FormData){
    console.log('testFrom', formData);
}

  /**
 * Crea un nuevo usuario enviando los datos al endpoint de la blockchain
 * @param formData Datos del usuario a crear (address, name, role)
 * @returns El usuario creado o un error
 */

export async function createUser(prevState: FormState, formData: FormData): Promise<FormState> {
    // Extraer datos del formulario
    const address = formData.get('address') as string;
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;

    // Validaciones del lado del servidor
    const errors: FormState['errors'] = {};

    if (!address) {
        errors.address = ['The address is required'];
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        errors.address = ['Invalid adddress format'];
    }

    if (!name) {
        errors.name = ['The name is required'];
    }

    if (!role) {
        errors.role = ['The role is required'];
    }

    // Si hay errores, retornarlos
    if (Object.keys(errors).length > 0) {
        return {
        errors,
        success: false
        };
    }

    try {
        // Realizar la solicitud al endpoint de la blockchain
        const response = await fetch('http://localhost:5551/users/createuser', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            address: address,
            name: name,
            role: role
            }),
            // Importante para server actions
            cache: 'no-store'
        });
    
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            return {
            message: errorData.message || `Error: ${response.status} ${response.statusText}`
            };
        }
        
        // Revalidar la ruta para actualizar los datos en la UI
        revalidatePath('/');
        
        console.log('Creating user:', { address, name, role });
        
        return {
            success: true,
            message: 'User added successfully'
        };
    } catch (error) {
        console.error('Error creating the user:', error);
        
        return {
            errors: {
                _form: ['Error creating the new user.Please try again later.']
            },
            success: false
            };
    }
}


  /**
 * Verifica si una dirección Ethereum ya existe en la blockchain
 * @param address Dirección Ethereum a verificar
 * @returns Booleano indicando si la dirección existe
 */
export async function checkAddressExists(address: string): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:5551/users/${address}/exists`, {
        cache: 'no-store'
      });
  
      if (!response.ok) {
        return false;
      }
  
      const data = await response.json();
      return data.exists || false;
    } catch (error) {
      console.error('Error checking address from appi:', error);
      return false;
    }
}


