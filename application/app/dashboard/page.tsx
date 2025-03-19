'use client';

import React, { useEffect, useState } from 'react';


export default function DashboardPage() {
  // Estado para simular carga de datos
  const [loading, setLoading] = useState(true);
  
  
  // Datos de ejemplo para el dashboard
  const co2Data = [
    { name: 'Factory', value: 2450 },
    { name: 'Assembler', value: 1850 },
    { name: 'Logistics', value: 3200 },
    { name: 'Retailer', value: 560 },
  ];

  const productsData = {
    totalVehicles: 324,
    totalParts: 9865,
    pendingTransfers: 42,
    completedTransfers: 287,
    activeUsers: 89,
  };

  const vehicleTypes = [
    { name: 'Sedán', value: 140, percentage: 43 },
    { name: 'SUV', value: 95, percentage: 29 },
    { name: 'Eléctrico', value: 65, percentage: 20 },
    { name: 'Híbrido', value: 24, percentage: 8 },
  ];

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calcular el total de CO2 emitido
  const totalCO2 = co2Data.reduce((acc, item) => acc + item.value, 0);

  return (

    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard de Trazabilidad de CO2</h1>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Total CO2: {totalCO2} kg</span>
        </div>
      </div>

      {/* Tarjetas de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Vehículos Registrados</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="text-2xl font-bold">{productsData.totalVehicles}</div>
          <p className="text-xs text-gray-500">+12% respecto al mes pasado</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Piezas Fabricadas</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="text-2xl font-bold">{productsData.totalParts}</div>
          <p className="text-xs text-gray-500">+8% respecto al mes pasado</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Transferencias Completadas</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div className="text-2xl font-bold">{productsData.completedTransfers}</div>
          <p className="text-xs text-gray-500">+22% respecto al mes pasado</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Usuarios Activos</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-2xl font-bold">{productsData.activeUsers}</div>
          <p className="text-xs text-gray-500">+5% respecto al mes pasado</p>
        </div>
      </div>

      {/* Navegación por pestañas simple */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <a href="#" className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Resumen
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Emisiones de CO2
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Productos
            </a>
          </nav>
        </div>
      </div>

      {/* Panel de emisiones de CO2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Distribución de Emisiones de CO2</h2>
          <p className="text-sm text-gray-500 mb-6">Desglose por etapa de la cadena de suministro</p>
          
          {/* Tabla de emisiones de CO2 */}
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CO2 (kg)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Porcentaje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {co2Data.map((item) => (
                  <tr key={item.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {((item.value / totalCO2) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {totalCO2}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    100%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Huella de Carbono por Tipo de Vehículo</h2>
          <p className="text-sm text-gray-500 mb-6">Relación entre tipo de vehículo y emisiones</p>
          
          {/* Barras de progreso simples para emisiones por tipo de vehículo */}
          <div className="space-y-4">
            {vehicleTypes.map((type) => (
              <div key={type.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{type.name}</span>
                  <span className="text-sm font-medium text-gray-700">{type.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${type.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de transferencias activas */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Transferencias Activas</h2>
        <p className="text-sm text-gray-500 mb-6">Productos actualmente en tránsito</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Producto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Origen
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destino
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CO2 Estimado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  NFT-VEH-2023-001
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Vehículo (Sedán)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Assembler
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Logistics
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  185kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    En tránsito
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  NFT-VEH-2023-002
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Vehículo (SUV)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Logistics
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Retailer
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  210kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    En tránsito
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  TOK-PART-2023-087
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Pieza (Motor)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Factory
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Assembler
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  75kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Entregado
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Sección de Resumen */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Resumen del Sistema</h2>
        <p className="text-sm text-gray-500 mb-4">Métricas clave del sistema de trazabilidad de CO2</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-2">Impacto de CO2</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>CO2 Total Rastreado: {totalCO2} kg</li>
              <li>Promedio por Vehículo: {Math.round(totalCO2 / productsData.totalVehicles)} kg</li>
              <li>Actor con Mayor Impacto: Logistics (3200 kg)</li>
              <li>Actor con Menor Impacto: Retailer (560 kg)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-2">Estadísticas de Producto</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Vehículos Totales: {productsData.totalVehicles}</li>
              <li>Piezas Fabricadas: {productsData.totalParts}</li>
              <li>Transferencias Pendientes: {productsData.pendingTransfers}</li>
              <li>Transferencias Completadas: {productsData.completedTransfers}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}