# Desarrollo y Despliegue del Entorno con Hyperledger Fabric

## Prerrequisitos  
Para poner en marcha el entorno de desarrollo es necesario contar con las siguientes herramientas instaladas:

- **Docker**  
- **Hyperledger Fabric Samples**  
- **Node.js y NPM**  
- **Fabric CA**

## Configuración de la Red Blockchain

### 1. Levantar la Red de Hyperledger Fabric  
Ejecutar los siguientes comandos para iniciar la red de Fabric:

```sh  
./network.sh up  
```

### 2. Creación del Canal y Despliegue del Chaincode  
Para configurar el canal y desplegar el Chaincode en la red, ejecutar:

```sh  
./network.sh down &&  \\  
./network.sh up createChannel -c supplychainchannel &&  \\  
./network.sh deployCCAAS -ccn vehicleparts -ccp ../asset-transfer-basic/chaincode-typescript  
```  
## Desarrollo del Chaincode  
El Chaincode define la lógica de negocio de la trazabilidad de piezas y vehículos. A continuación, se muestra un contrato básico:

```typescript  
import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';

@Info({ title: 'VehiclePartsContract', description: 'Gestión de piezas y vehículos' })  
export class VehiclePartsContract extends Contract {  
      
    @Transaction()  
    @Returns('string')  
    public async registerPart(ctx: Context, partId: string, emissions: number): Promise\<string\> {  
        const part \= { id: partId, emissions };  
        await ctx.stub.putState(partId, Buffer.from(JSON.stringify(part)));  
        return \`Pieza registrada con ID ${partId}\`;  
    }  
}  
```

### Para ejecutar el Chaincode en modo servidor:  
```sh  
export CHAINCODE\_SERVER\_ADDRESS=host.docker.internal:9998  
export CHAINCODE\_ID=vehicleparts\_1.0:0c2471e01863862d67b62d19420ae1fffc029c2cf6c3e3f12933a776d781204c  
npm start  
```

## API para la Interacción con el Chaincode  
El proyecto incluye una API que permite interactuar con la red de Fabric para registrar y consultar piezas y vehículos. Revisar el directorio \`API\` para más detalles.

## Firma Digital con MetaMask  
Se implementa un sistema de firma digital utilizando MetaMask y ethers.js:

```typescript  
import { ethers } from "ethers";  
import { useWeb3 } from '@/context/Web3Context';

const signedTx \= await signer.signMessage(payload);  
console.log("Signed transaction:", signedTx);  
const verifiedAddress \= ethers.verifyMessage(payload, signedTx);  
```

# Arquitectura del Proyecto

## 1. Red Blockchain

La infraestructura blockchain se basa en Hyperledger Fabric con los siguientes componentes:

- **Fabric CA** para la gestión de identidades

- **Canales privados** para la trazabilidad segura de activos

- **Chaincode en TypeScript** para la gestión de la cadena de suministro

## 2 Elementos de la Cadena de Suministro

- **Fábrica de Piezas**: Recibe materias primas y genera piezas tokenizadas, registrando las emisiones de CO2 generadas en el proceso.

- **Fábrica de Ensamblaje**: Recibe las piezas y ensambla vehículos completos. El vehículo final es un nuevo token que hereda los datos de las piezas utilizadas.

- **Retailer**: Recibe los vehículos ensamblados y los pone a disposición del consumidor final.

## 3 Frontend

El sistema cuenta con una aplicación frontend desarrollada con **Next.js** y **Tailwind CSS**, proporcionando:

- Paneles personalizados según el rol del usuario

- Integración con **Fabric SDK** para interactuar con la red blockchain

# Despliegue

## 1 Despliegue de la Red Fabric

Para desplegar la red blockchain:

```sh

./network.sh up createChannel -c supplychainchannel

./network.sh deployCCAAS -ccn vehicleparts -ccp ../asset-transfer-basic/chaincode-typescript

```

## 2 Despliegue del Frontend

El frontend se puede desplegar en **Vercel** con soporte para SSL/TLS y monitoreo en tiempo real.

—

Este proyecto representa una solución integral para la trazabilidad de piezas y vehículos, permitiendo una medición precisa del impacto ambiental en todo el proceso de fabricación.