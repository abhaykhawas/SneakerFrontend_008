import React, {useState} from 'react'
import { singupUser } from '../api/api'
import { toast } from 'react-toastify'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignup () {
        try{
            const res = await singupUser({name, email, password})
            localStorage.setItem("token", res.data.token)
            toast.success("Signup Successful")
            window.location.href = "/home"
            
        }
        catch(err) {
            toast.error("Signup failed")
        }
    }

    return (
    <div className='p-6 max-w-md mx-auto'>
        <h2 className='text-2xl font-bold mb-4'>Create Account</h2>
        <input className='p-2 w-full mb-3' type="text" placeholder='Name...' onChange={(e) => setName(e.target.value)}/>
        <input className='p-2 w-full mb-3' type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)}/>
        <input className='p-2 w-full mb-3' type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />

        <button className='bg-black text-white p-2' onClick={handleSignup}>Signup</button>
    </div>
    )
}

export default Signup