import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectFabric } from './hlf.js';
import { ethers } from 'ethers';
const app = express();

const port = 5551;

app.use(cors());
app.use(bodyParser.json());

const pingContract = await connectFabric("PingContract");
const userContract = await connectFabric("UserContract");

app.get('/ping', async (req, res) => {
    try {
        const result = await pingContract.submitTransaction('ping');
        console.log(result);
        res.json({ result: Buffer.from(result).toString('utf-8') });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});


// Endpoint para obtener todos los usuarios
app.get('/users/allusers', async (req, res) => {
    try {
        const result = await userContract.evaluateTransaction('queryAllUsers');
        res.json(JSON.parse(Buffer.from(result).toString('utf-8')));
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un usuario específico por su dirección
app.get('/users/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const result = await userContract.evaluateTransaction('readUser', address);
        res.json(JSON.parse(Buffer.from(result).toString('utf-8')));
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para crear un nuevo usuario
app.post('/users/createuser', async (req, res) => {
    try {
        const { address, role, name } = req.body;
        
        // Validar datos de entrada
        if (!address || !role || !name) {
            return res.status(400).json({ error: 'Se requieren los campos address, role y name' });
        }
        
        // Generar una dirección aleatoria si no se proporciona una válida
        let userAddress = address;
        if (!ethers.isAddress(address) && address !== 'admin') {
            const wallet = ethers.Wallet.createRandom();
            userAddress = wallet.address;
        }
        
        await userContract.submitTransaction('createUser', userAddress, role, name);
        res.status(201).json({ 
            message: 'Usuario creado correctamente',
            address: userAddress
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar un usuario existente
app.put('/users/:address/update', async (req, res) => {
    try {
        const { address } = req.params;
        const { role, name } = req.body;
        
        // Validar datos de entrada
        if (!role || !name) {
            return res.status(400).json({ error: 'Se requieren los campos role y name' });
        }
        
        await userContract.submitTransaction('updateUser', address, role, name);
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para desactivar un usuario
app.put('/users/:address/deactivate', async (req, res) => {
    try {
        const { address } = req.params;
        await userContract.submitTransaction('deactivateUser', address);
        res.json({ message: 'Usuario desactivado correctamente' });
    } catch (error) {
        console.error('Error al desactivar usuario:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para activar un usuario
app.put('/users/:address/activate', async (req, res) => {
    try {
        const { address } = req.params;
        await userContract.submitTransaction('activateUser', address);
        res.json({ message: 'Usuario activado correctamente' });
    } catch (error) {
        console.error('Error al activar usuario:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para consultar usuarios por rol
app.get('/users/role/:role', async (req, res) => {
    try {
        const { role } = req.params;
        const result = await userContract.evaluateTransaction('queryUsersByRole', role);
        res.json(JSON.parse(Buffer.from(result).toString('utf-8')));
    } catch (error) {
        console.error('Error al consultar usuarios por rol:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para consultar usuarios por estado
app.get('/users/status/:active', async (req, res) => {
    try {
        const { active } = req.params;
        const isActive = active === 'true' || active === '1';
        const result = await userContract.evaluateTransaction('queryUsersByStatus', isActive.toString());
        res.json(JSON.parse(Buffer.from(result).toString('utf-8')));
    } catch (error) {
        console.error('Error al consultar usuarios por estado:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para verificar si un usuario existe
app.get('/users/:address/exists', async (req, res) => {
    try {
        const { address } = req.params;
        const result = await userContract.evaluateTransaction('userExists', address);
        const exists = Buffer.from(result).toString('utf-8') === 'true';
        res.json({ exists });
    } catch (error) {
        console.error('Error al verificar existencia de usuario:', error);
        res.status(500).json({ error: error.message });
    }
});

// Inicializar el ledger (solo para desarrollo/pruebas)
app.post('/init', async (req, res) => {
    try {
        await userContract.submitTransaction('initLedger');
        res.json({ message: 'Ledger inicializado correctamente' });
    } catch (error) {
        console.error('Error al inicializar ledger:', error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/users/:address/delete', async (req, res) => {
    try {
        const { address } = req.params;
        
        // Opcional: Añadir verificaciones adicionales de seguridad
        // Por ejemplo, verificar que el usuario que hace la solicitud tiene permisos de administrador
        
        await userContract.submitTransaction('deleteUserId', address);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export default app;
