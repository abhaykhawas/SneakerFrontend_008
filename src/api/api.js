import axios from "axios";

const API = axios.create({baseURL: "https://sneakerbackend-008.onrender.com/api"})

// attach the token if exsists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token) req.headers.Authorization = token;
    return req
})


// Auth ----
export const loginUser = (data) => API.post('/users/login', data)
export const singupUser = (data) => API.post('/users/signup', data)

// products ----
export const getProducts = () => API.get('/products')
export const getProductById = (id) => API.get(`/products/${id}`)
export const createProduct = (data) => API.post('/products', data)
export const updateProduct = (data, id) => API.put(`/products/${id}`, data)
export const deleteProduct = (id) => API.delete(`/products/${id}`)

// Orders ----
export const createOrder = (data) => API.post('/orders', data)
export const getMyOrders = () => API.get('/orders')
export const getAllOrders = () => API.get('/orders/all-orders')
export const updateOrderStatus = (id, status) => API.put(`/orders/status/${id}`, status)

// Reviews ----
export const getProductReview = (pid) => API.get(`/reviews/${pid}`)
export const createReview = (data) => API.post('/reviews', data)