import React, {useState, useEffect} from 'react'
import { getMyOrders, createReview } from '../api/api'
import { toast } from 'react-toastify'

function Orders() {

    const [orders, setOrders] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")


    useEffect(() => {
        async function load() {
            const res = await getMyOrders()
            setOrders(res.data)
        }
        load()
    }, [])

    const openReviewModal = (productId) => {
        setSelectedProduct(productId)
        setShowModal(true)
        setRating(0)
        setComment('')
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedProduct(null)
        setRating(0)
        setComment('')
    }

    const handleSubmitReview = async () => {
        if(!rating || rating<1 || rating> 5){
            return toast.warn("Please select a rating between 1 & 5")
        }
        if(!comment.trim()){
            return toast.warn("Please add a comment")
        }

        try{
            await createReview({
                productId: selectedProduct,
                rating: rating,
                comment: comment
            })
            toast.success("Review submitted successfully")
            closeModal()
        }
        catch(err) {
            toast.error(err.response?.data?.message || "Failed to submit a review")
        }
    }

    return (
        <div className='p-4 max-w-xl mx-auto'>
            <h2 className='text-xl font-bold mb-4'>My Orders</h2>

            {
                orders.map((o) => (
                    <div key={o._id} className='shadow p-3 mb-3 rounded'>
                        <p>{o._id}</p>
                        <p>{o.status}</p>
                        <p>{o.orderItems?.[0].product.name}</p>
                        {o.status === 'Delivered' && (
                            <button 
                                className='mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                                onClick={() => {openReviewModal(o.orderItems[0].product._id)}}
                            >
                                Write Review
                            </button>
                        )}
                    </div>
                ))
            }


            {/* Review modal */}
            {showModal && (
                <div className='fixed inset-0 bg-[rgba(0,0,0,0.8)]  flex items-center justify-center'>
                    <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
                        <h3 className='text-xl font-bold mb-3'>Write a review</h3>

                        <div className='mb-4'>
                            <label className='block text-sm font-semibold mb-2'>Rating</label>
                            <div className='flex gap-2'>
                                {[1,2,3,4,5].map((star) => (
                                    <button 
                                        key={star} 
                                        type='button' 
                                        onClick={() => setRating(star)}
                                        className={`text-2xl ${rating >= star ? 'text-yellow-500': 'text-gray-300'} hover:text-yellow-400`}
                                    >*</button>
                                ) )}
                            </div>
                            {rating > 0 && (
                                <p className='text-sm text-gray-600 mt-1'>{rating} out of 5</p>
                            )}
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm font-semibold mb-2'>Comment</label>
                            <textarea
                                className='w-full p-2 border rounded'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder='Share your thoughts about this product...'
                            />
                        </div>

                        <div className='flex gap-2 justify-end'>
                            <button className='px-4 py-2 rounded border hover:bg-gray-100' onClick={closeModal}>Cancel</button>
                            <button className='px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded' onClick={handleSubmitReview}>Submit Review</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Orders