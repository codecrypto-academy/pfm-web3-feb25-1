"use client"

import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from './components/Header';
import UserList from './components/UserList';
import { User } from './lib/definition';
import Image from "next/image";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call to fetch users
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('/api/users');
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockUsers: User[] = [
          { id: 1, name: 'Ana García', email: 'ana@example.com', avatar: 'https://i.pravatar.cc/150?img=1' },
          { id: 2, name: 'Carlos López', email: 'carlos@example.com', avatar: 'https://i.pravatar.cc/150?img=2' },
          { id: 3, name: 'Elena Martínez', email: 'elena@example.com', avatar: 'https://i.pravatar.cc/150?img=3' },
          { id: 4, name: 'David Rodríguez', email: 'david@example.com', avatar: 'https://i.pravatar.cc/150?img=4' },
          { id: 5, name: 'Laura Sánchez', email: 'laura@example.com', avatar: 'https://i.pravatar.cc/150?img=5' },
        ];
        
        // Simulate network delay
        setTimeout(() => {
          setUsers(mockUsers);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Home | Mi Aplicación</title>
        <meta name="description" content="Listado de usuarios de mi aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bienvenido</h1>
          <p className="mt-2 text-gray-600">Explora nuestra comunidad de usuarios</p>
        </div>
        
        <UserList users={users} isLoading={isLoading} />
      </main>
    </div>
  );
};


