import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';

// Definición del objeto Usuario
interface User {
    address: string;  // ID único del usuario
    role: string;     // Rol del usuario en el sistema
    name: string;     // Nombre del usuario
    active: boolean;  // Estado del usuario (activo/inactivo)
}

// Prefijo para las claves en el estado mundial
const USER_PREFIX = 'user:';

@Info({ title: 'UserContract', description: 'Contrato para gestionar usuarios en la red' })
export class UserContract extends Contract {

    /**
     * Inicializa el contrato con un usuario administrador por defecto
     */
    @Transaction()
    public async initLedger(ctx: Context): Promise<void> {
        console.info('============= Inicializando Contrato de Usuarios =============');
        
        const defaultUser: User = {
            address: 'admin',
            role: 'admin',
            name: 'Administrador',
            active: true
        };
        
        await ctx.stub.putState(USER_PREFIX + defaultUser.address, Buffer.from(JSON.stringify(defaultUser)));
        console.info('Usuario administrador creado');
    }

    /**
     * Crea un nuevo usuario en el ledger
     */
    @Transaction()
    public async createUser(ctx: Context, address: string, role: string, name: string): Promise<void> {
        console.info('============= Creando Usuario =============');
        
        // Verificar si el usuario ya existe
        const userKey = USER_PREFIX + address;
        const userExists = await this.userExists(ctx, address);
        if (userExists) {
            throw new Error(`El usuario con dirección ${address} ya existe`);
        }

        // Crear el nuevo usuario
        const user: User = {
            address,
            role,
            name,
            active: true // Por defecto, el usuario se crea activo
        };

        // Guardar el usuario en el estado mundial
        await ctx.stub.putState(userKey, Buffer.from(JSON.stringify(user)));
        console.info(`Usuario ${address} creado correctamente`);
    }

    /**
     * Consulta un usuario por su dirección
     */
    @Transaction(false)
    @Returns('string')
    public async readUser(ctx: Context, address: string): Promise<string> {
        console.info('============= Consultando Usuario =============');
        
        const userKey = USER_PREFIX + address;
        const userJSON = await ctx.stub.getState(userKey);
        
        if (!userJSON || userJSON.length === 0) {
            throw new Error(`El usuario con dirección ${address} no existe`);
        }
        
        return userJSON.toString();
    }

    /**
     * Actualiza la información de un usuario existente
     */
    @Transaction()
    public async updateUser(ctx: Context, address: string, role: string, name: string): Promise<void> {
        console.info('============= Actualizando Usuario =============');
        
        // Verificar si el usuario existe
        const userKey = USER_PREFIX + address;
        const userExists = await this.userExists(ctx, address);
        if (!userExists) {
            throw new Error(`El usuario con dirección ${address} no existe`);
        }

        // Obtener el usuario actual para mantener su estado de activación
        const userJSON = await ctx.stub.getState(userKey);
        const existingUser: User = JSON.parse(userJSON.toString());

        // Actualizar los campos del usuario manteniendo el estado de activación
        const updatedUser: User = {
            address,
            role,
            name,
            active: existingUser.active
        };

        // Guardar el usuario actualizado
        await ctx.stub.putState(userKey, Buffer.from(JSON.stringify(updatedUser)));
        console.info(`Usuario ${address} actualizado correctamente`);
    }

    /**
     * Desactiva un usuario (en lugar de eliminarlo)
     */
    @Transaction()
    public async deactivateUser(ctx: Context, address: string): Promise<void> {
        console.info('============= Desactivando Usuario =============');
        
        // Verificar si el usuario existe
        const userKey = USER_PREFIX + address;
        const userExists = await this.userExists(ctx, address);
        if (!userExists) {
            throw new Error(`El usuario con dirección ${address} no existe`);
        }

        // Obtener el usuario actual
        const userJSON = await ctx.stub.getState(userKey);
        const user: User = JSON.parse(userJSON.toString());

        // Desactivar el usuario
        user.active = false;

        // Guardar el usuario desactivado
        await ctx.stub.putState(userKey, Buffer.from(JSON.stringify(user)));
        console.info(`Usuario ${address} desactivado correctamente`);
    }

    /**
     * Activa un usuario previamente desactivado
     */
    @Transaction()
    public async activateUser(ctx: Context, address: string): Promise<void> {
        console.info('============= Activando Usuario =============');
        
        // Verificar si el usuario existe
        const userKey = USER_PREFIX + address;
        const userExists = await this.userExists(ctx, address);
        if (!userExists) {
            throw new Error(`El usuario con dirección ${address} no existe`);
        }

        // Obtener el usuario actual
        const userJSON = await ctx.stub.getState(userKey);
        const user: User = JSON.parse(userJSON.toString());

        // Activar el usuario
        user.active = true;

        // Guardar el usuario activado
        await ctx.stub.putState(userKey, Buffer.from(JSON.stringify(user)));
        console.info(`Usuario ${address} activado correctamente`);
    }

    /**
     * Consulta todos los usuarios en el ledger
     */
    @Transaction(false)
    @Returns('string')
    public async queryAllUsers(ctx: Context): Promise<string> {
        console.info('============= Consultando Todos los Usuarios =============');
        
        const startKey = USER_PREFIX;
        const endKey = USER_PREFIX + '\uffff';
        
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const allUsers = [];
        
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allUsers.push(record);
            result = await iterator.next();
        }
        
        return JSON.stringify(allUsers);
    }

    /**
     * Consulta usuarios por rol
     */
    @Transaction(false)
    @Returns('string')
    public async queryUsersByRole(ctx: Context, role: string): Promise<string> {
        console.info('============= Consultando Usuarios por Rol =============');
        
        const startKey = USER_PREFIX;
        const endKey = USER_PREFIX + '\uffff';
        
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const usersByRole = [];
        
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record: User;
            try {
                record = JSON.parse(strValue);
                if (record.role === role) {
                    usersByRole.push(record);
                }
            } catch (err) {
                console.log(err);
            }
            result = await iterator.next();
        }
        
        return JSON.stringify(usersByRole);
    }

    /**
     * Consulta usuarios por estado de activación
     */
    @Transaction(false)
    @Returns('string')
    public async queryUsersByStatus(ctx: Context, active: boolean): Promise<string> {
        console.info('============= Consultando Usuarios por Estado =============');
        
        const activeFlag = active;
        const startKey = USER_PREFIX;
        const endKey = USER_PREFIX + '\uffff';
        
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const usersByStatus = [];
        
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record: User;
            try {
                record = JSON.parse(strValue);
                if (record.active === activeFlag) {
                    usersByStatus.push(record);
                }
            } catch (err) {
                console.log(err);
            }
            result = await iterator.next();
        }
        
        return JSON.stringify(usersByStatus);
    }

    /**
     * Verifica si un usuario existe en el ledger
     */
    @Transaction(false)
    @Returns('boolean')
    public async userExists(ctx: Context, address: string): Promise<boolean> {
        const userKey = USER_PREFIX + address;
        const userJSON = await ctx.stub.getState(userKey);
        return userJSON && userJSON.length > 0;
    }
}
