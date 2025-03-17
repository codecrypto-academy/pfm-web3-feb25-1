import React from 'react';
import Head from 'next/head';
import Header from './components/Header';
import UserList from './components/UserList';
import AddUserButton from './components/AddUserButton';
import { Suspense } from 'react';
import { User } from './lib/definition';
import { fetchUsers } from './lib/data';

export default async function Home() {
  const  users = await fetchUsers();
  console.log(users);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Home | My Aplication</title>
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
          <UserList users={users} />
        </Suspense>
      </main>
    </div>
  );
};


