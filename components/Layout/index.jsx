import React from 'react';
import Head from 'next/head';
import Footer from '../Footer';

const Layout = ({ title, children }) => {
  return (
    <div className='flex flex-col justify-between min-h-screen mx-auto px-8 bg-slate-50 overflow-hidden'>
      <Head>
        <title>{title}</title>
      </Head>
      <main className=''>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;