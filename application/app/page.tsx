import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from './components/Header';
import UserList from './components/UserList';
import { User } from './lib/definition';
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
    <Head>
      <title>Home | Mi Aplicación</title>
      <meta name="description" content="Listado de usuarios de mi aplicación" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />
    </div>
  );
}
