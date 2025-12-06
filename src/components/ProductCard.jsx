import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({product}) {
  return (
    <div className="w-[300px] m-2 p-3 rounded shadow">
        <Link to={`/products/${product._id}`} >
            <img src={product.images?.[0]} alt="Product" className='w-full rounded h-40 ' />
            <h3 className='font-bold mt-2'>{product.name}</h3>
            <p className='text-gray-700'>${product.price}</p>
        </Link>
    </div>
    
  )
}

export default ProductCard