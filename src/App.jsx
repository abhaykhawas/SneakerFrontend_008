import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  
  return (
    <>
      <ToastContainer/>
      <Navbar/>
      
      <Outlet/>
    </>
  )
}

export default App
