'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Header from './Header';
import UserList from './UserList';
import AddUserButton from './AddUserButton';
import { Suspense } from 'react';
import { useWeb3 } from '../context/Web3Context';

export default function Home({ initialUsers }) {
  const { isConnected } = useWeb3();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Home | My Application</title>
        <meta name="description" content="Listado de usuarios de mi aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="max-w-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to user registered panel:</h1>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Users</h2>
          <AddUserButton />
        </div>
        
        <Suspense fallback={<div>Loading users...</div>}>
          <UserList users={initialUsers} />
        </Suspense>
      </main>
    </div>
  );
}