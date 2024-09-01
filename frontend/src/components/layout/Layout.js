import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main
        style={{
          height: '87vh',
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
