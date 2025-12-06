import React, { useState } from 'react'
import { loginUser } from '../api/api'
import { toast } from 'react-toastify'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        try{
            const res = await loginUser({email, password})
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('role', res.data.role)
            toast.success("Login Successful")
            if(res.data.role === 'admin'){
                window.location.href = "/admin" 
            }
            else{
                window.location.href = "/home"
            }
            
        }
        catch (err){
            toast.error("Login failed")
        }
    }

    return (
        <div className='p-6 max-w-md mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Login</h2>
            <input className=' p-2 w-full mb-3' type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)}/>
            <input className='p-2 w-full mb-3' type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
            <button className='bg-black text-white p-2 w-full' onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login