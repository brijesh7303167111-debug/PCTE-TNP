import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import React from 'react';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

function App() {
 
  return (
   <>
   <section className=''>
      <Navbar />
      <main style={{ minHeight: '80vh'  }}>
        <Outlet />
      </main>

      <Footer />
      </section>
    </>
  )
}

export default App
