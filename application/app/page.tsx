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
/*     const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('/api/users');
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockUsers: User[] = [
          {
            address: "0xc79A4B75b085E902F46f56db9B6Fc753c36b19ab",
            role: "factory",
            name: "Big Motors C.A",
            active: true
        },
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
    }; */
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5551/users/allusers');
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
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


