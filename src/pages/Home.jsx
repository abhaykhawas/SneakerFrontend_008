import React, {useEffect, useState} from 'react'
import { getProducts } from '../api/api'
import ProductCard from '../components/ProductCard'

function Home() {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        async function load() {
            const res = await getProducts()
            setProducts(res.data)
        }
        load()
    }, [])

    return (
        <div className='p-4 grid grid-cols-2 md:grid-cols-4 gap-4'>
            {
            products.map((p) => (
                <ProductCard product={p} key={p._id}/>
            ))
            }
        </div>
    )
}

export default Home