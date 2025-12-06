import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const token = localStorage.getItem('token')

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        window.location.href = "/"
    }

    return (
    <nav className='p-4 bg-black text-white flex justify-between'>
        <Link to={'/'} className='font-bold text-xl'>Sneaker Store</Link>

        <div className='flex gap-4'>
            <Link to={'/home'}>Home</Link>
            {
                !token ? (
                    <>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/signup'}>signup</Link>
                    </>
                ) : (
                    <>
                        <Link to={"/orders"}>My Order</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                )
            }
        </div>
    </nav>
    )
}

export default Navbar