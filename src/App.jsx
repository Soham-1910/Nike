import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Product from './pages/Product'
import SearchResults from './pages/SearchResults'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import Footer from './components/Footer' // Imported Footer
import Help from './pages/Help'
import SignIn from './pages/SignIn'

// Helper component to fix scroll-to-bottom on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden selection:bg-black selection:text-white'>
      {/* Ensures users start at the top of every page */}
      <ScrollToTop />

      {/* Permanent Header */}
      <Navbar />

      {/* Main content area that expands to push the footer down */}
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/search/:query' element={<SearchResults />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<Product />} />

          {/* User & Support Routes */}
          <Route path="/help" element={<Help />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Informational Routes */}
          <Route path='/about' element={<div className='py-20 text-center text-4xl font-black italic uppercase italic tracking-tighter'>About UNIWUE</div>} />
          <Route path='/contact' element={<div className='py-20 text-center text-4xl font-black italic uppercase italic tracking-tighter'>Contact Us</div>} />
          <Route path='/login' element={<div className='py-20 text-center text-4xl font-black italic uppercase italic tracking-tighter'>Login</div>} />

          {/* Premium 404 Page */}
          <Route path='*' element={
            <div className='py-40 text-center flex flex-col items-center justify-center gap-4'>
              <h1 className='text-6xl font-black italic tracking-tighter'>404</h1>
              <p className='uppercase font-bold tracking-widest text-gray-400'>Page Not Found</p>
            </div>
          } />
        </Routes>
      </main>

      {/* Permanent Footer */}
      <Footer />
    </div>
  )
}

export default App