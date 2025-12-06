import React, {useEffect, useState} from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct, getAllOrders, updateOrderStatus } from '../api/api'
import { Collapse, Select } from 'antd';

function AdminDashboard() {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [form, setForm] = useState({name: "", description: "", price: "", category: "", stock: { 5:'', 6:'', 7:'', 8:'', 9:'', 10:'' }, images: []})
    const [editId, setEditId] = useState(null)
    const [orders, setOrders] = useState([])
    const [items, setItems] = useState([])

    async function handleStatusChange(id, value){
        console.log(value)
        await updateOrderStatus(id, {"status": value})
        async function load() {
                const res = await getProducts()
                const resOrder = await getAllOrders()
                const itemsTemp = []
                for (let i = 0; i< resOrder.data.length; i=i+1){
                    itemsTemp.push({
                        key: i,
                        label: <div>
                            {resOrder.data[i]._id.slice(resOrder.data[i]._id.length-6)} - Status:<Select
                            defaultValue={resOrder.data[i].status}
                            style={{ width: 120 }}
                            onChange={(e) => handleStatusChange(resOrder.data[i]._id, e)}
                            options={[
                                { value: 'Pending', label: 'Pending' },
                                { value: 'Shipped', label: 'Shipped' },
                                { value: 'Delivered', label: 'Delivered' },
                                { value: 'Cancelled', label: 'Cancelled' },
                            ]}
                            /> - Total Price:{resOrder.data[i].totalPrice}
                        </div>,
                        children: <div>
                            
                            <div className='border border-gray-100 shadow w-fit px-4 py-2'>
                                <h2 className='text-xl font-semibold'>{resOrder.data[i].orderItems[0].product}</h2>
                                <p>{resOrder.data[i].orderItems[0].price}</p>
                                <p>{resOrder.data[i].orderItems[0].quantity}</p>
                                <p>{resOrder.data[i].orderItems[0].size}</p>
                            </div>
                        </div>
                    })
                }
                setItems(itemsTemp)
                setProducts(res.data)
                
        }
            load()
    }
   

    useEffect(() => {
        if(localStorage.getItem('role') != 'admin'){
            window.location.href = "/home"
        }
        else{
            async function load() {
                const res = await getProducts()
                const resOrder = await getAllOrders()
                const itemsTemp = []
                for (let i = 0; i< resOrder.data.length; i=i+1){
                    itemsTemp.push({
                        key: i,
                        label: <div>
                            {resOrder.data[i]._id.slice(resOrder.data[i]._id.length-6)} - Status:<Select
                            defaultValue={resOrder.data[i].status}
                            style={{ width: 120 }}
                            onChange={(e) => handleStatusChange(resOrder.data[i]._id, e)}
                            options={[
                                { value: 'Pending', label: 'Pending' },
                                { value: 'Shipped', label: 'Shipped' },
                                { value: 'Delivered', label: 'Delivered' },
                                { value: 'Cancelled', label: 'Cancelled' },
                            ]}
                            /> - Total Price:{resOrder.data[i].totalPrice}
                        </div>,
                        children: <div>
                            
                            <div className='border border-gray-100 shadow w-fit px-4 py-2'>
                                <h2 className='text-xl font-semibold'>{resOrder.data[i].orderItems[0].product}</h2>
                                <p>{resOrder.data[i].orderItems[0].price}</p>
                                <p>{resOrder.data[i].orderItems[0].quantity}</p>
                                <p>{resOrder.data[i].orderItems[0].size}</p>
                            </div>
                        </div>
                    })
                }
                setItems(itemsTemp)
                setProducts(res.data)
                setLoading(false)
            }
            load()
        }
    }, [])

    function handleChange(e) {
        setForm({...form, [e.target.placeholder]: e.target.value})
        console.log(form)
    }

    function handleStockChange(size, value){
        setForm({...form, stock: {...form.stock, [size]: Number(value)}})
        console.log(form)
    }

    async function handleSubmit() {
        if(editId){
            await updateProduct(form, editId)
        }
        else{
            await createProduct(form)
        }
        setForm({name: "", description: "", price: "", category: "", stock: { 5:'', 6:'', 7:'', 8:'', 9:'', 10:'' }, images: []})
        setEditId(null)
        async function load() {
            const res = await getProducts()
            setProducts(res.data)
        }
        load()
    }

    async function handleImageChange(value) {
        setForm({...form, images: [...form.images, value]})
    }

    function handleEdit(product) {
        setEditId(product._id)
        setForm(product)
    }

    async function handleDelete(id) {
        await deleteProduct(id)
        async function load() {
            const res = await getProducts()
            setProducts(res.data)
        }
        load()
    }

    if(loading) {
        return <div>
            LOADING...
        </div>
    }

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>

            <h2 className='text-xl font-semibold bg-blue-500 text-white px-4 py-2 mb-6 rounded'>Create/Update Product</h2>
            <div className='grid grid-cols-2 gap-4 mb-4'>
                <input type="text" value={form.name} placeholder='name' onChange={handleChange} className='p-2 border'/>
                <input type="text" value={form.description} placeholder='description' onChange={handleChange} className='p-2 border'/>
                <input type="number" value={form.price} placeholder='price' onChange={handleChange} className='p-2 border'/>
                <input type="text" value={form.category} placeholder='category' onChange={handleChange} className='p-2 border'/>

                {[5, 6, 7, 8, 9, 10 ].map(size => (
                    <input type="number" value={form.stock[size]} placeholder={`Size ${size} stock`} onChange={(e) => handleStockChange(size, e.target.value)} className='p-2 border'/>
                ))}

                <input type="text" className='p-2 border' placeholder='image 1 here...' value={form.images[0] || ""} onChange={(e) => handleImageChange(e.target.value)}/>
                <input type="text" className='p-2 border' placeholder='image 2 here...' value={form.images[1] || ""} onChange={(e) => handleImageChange(e.target.value)}/>
            </div>
            <div className='flex justify-center'>
                <button className='bg-green-600 text-white px-4 py-2 rounded' onClick={handleSubmit}>{editId ? 'Update Product' : 'Create Product'}</button>
            </div>
            

            <div className='flex justify-between gap-2'>
                <div className="product-container w-1/2">
                    <h2 className='text-xl font-semibold mt-10 mb-4'>All Products</h2>

                    <ul>
                        {products.map(p => (
                            <li key={p._id} className='border p-4 flex justify-between items-center mb-2'>
                                <div>
                                    <strong>{p.name}</strong> - ${p.price}
                                </div>
                                <div className='flex gap-2'>
                                    <button className='bg-black text-white px-3 py-1 rounded' onClick={() => handleEdit(p)}>Edit</button>
                                    <button className='bg-red-500 text-white px-3 py-1 rounded' onClick={() => handleDelete(p._id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="order-container w-1/2">
                    <h3 className='text-xl font-semibold mt-10 mb-4'>All Orders</h3>

                    {/* <ul>
                        {orders.map(order => (
                            // <li className='border p-4 flex justify-between items-center mb-2 ' key={order._id}>Order #{order._id.slice(order._id.length-6)} - Status: {order.status} - Total Price : {order.totalPrice}</li>
                        ))}
                    </ul> */}
                    <Collapse items={items} />

                </div>
            </div>
            


            
        </div>
    )
}

export default AdminDashboard