"use client";
//import { useGlobalContext } from "@/context/GlobalContext";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Header from "../components/Header";
import { useWeb3 } from "../context/Web3Context";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  const { account } = useWeb3();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
 // const user  = {name: "Admin", role: "admin", address: "0x1234"};
  interface Option {
    href:string
    label:string
  }
  const opciones: { [key: string]: Option[] } = {
    admin: [
      { href: "/dashboard/admin/users", label: "Users Management" },
      { href: "/dashboard/admin/users/add2", label: "Add User" },
    ],
    producer: [
      { href: "/dashboard/tokenizar", label: "Tokenizar" },
      { href: "/dashboard/listatoken", label: "Lista Token" },
      { href: "/dashboard/transfer", label: "Transferir Token" },
      {
        href: "/dashboard/receivedTransfers",
        label: "Transferencias Recibidas",
      },
    ],
    factory: [
      { href: "/dashboard/tokenizar", label: "Tokenizar" },
      { href: "/dashboard/listatoken", label: "Lista Token" },
      { href: "/dashboard/transfer", label: "Transferir Token" },
      {
        href: "/dashboard/receivedTransfers",
        label: "Transferencias Recibidas",
      },
    ],
    retailer: [
      { href: "/dashboard/listatoken", label: "Lista Token" },
      { href: "/dashboard/transfer", label: "Transferir Token" },
      {
        href: "/dashboard/receivedTransfers",
        label: "Transferencias Recibidas",
      },
    ],
    consumer: [
      { href: "/dashboard/listatoken", label: "Lista Token" },
      {
        href: "/dashboard/receivedTransfers",
        label: "Transferencias Recibidas",
      },
    ],
  };

  useEffect(() => {
    console.log("account",account)
    // Si no hay address, no hacemos la llamada
    if (!account) {
      setLoading(false);
      return;
    }

    // Función para obtener los datos del usuario
    const fetchUserData = async () => {
      try {
        
        const response = await fetch(`http://localhost:5551/users/${account}`);
        
        if (!response.ok) {
          throw new Error('No se pudo obtener la información del usuario');
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [account]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No se encontró el usuario</div>;

  return (
    <div>
        <Header></Header>
        <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-4 border-b border-border">
          <div className="font-medium text-bold">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.role}</div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {opciones[user.role].map((item: Option) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
    </div>
    
  );
}
