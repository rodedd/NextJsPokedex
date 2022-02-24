import React from 'react';
import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ title, children }) => {
  return (
    <div className='container mx-auto bg-yellow-100'>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className=''>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;