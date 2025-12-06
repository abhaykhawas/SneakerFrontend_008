import React, {useState, useEffect} from 'react'
import { getProductById, createOrder, getProductReview } from '../api/api'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProductDetails() {

    const { pid } = useParams()
    const [product, setProduct] = useState(null)
    const [size, setSize] = useState(null)
    const [reviews, setReviews] = useState([])
    const [loadingReviews, setLoadingReviews] = useState(false)
    const [averageRating, setAverageRating] = useState(0)

    useEffect(() => {
        async function load() {
            const res = await getProductById(pid)
            setProduct(res.data)
        }
        load()
    }, [])

    useEffect(() => {
        async function loadReviews() {
            setLoadingReviews(true)
            try{
                const res = await getProductReview(pid)
                console.log(res.data)
                let ratingSum = 0
                res.data.map((review) => {
                    ratingSum = ratingSum + review.rating
                })
                ratingSum = ratingSum/res.data.length
                setAverageRating(ratingSum || 0)
                setReviews(res.data || [])
            }
            catch(err) {
                toast.error(err.message)
                setReviews([])
            }
            finally{
                setLoadingReviews(false)
            }
        }
        loadReviews()
    }, [])

    const buyNow = async () => {
        if(!size) return toast.warn("Select size!!!");

        try{
            await createOrder({
                "orderItems": [
                    {
                        "product": pid,
                        "size": size,
                        "qty": 1,
                        "price": product.price 
                    }
                ],
                "totalPrice": product.price
            })
            toast.success("Order Placed!")
        }
        catch(err){
            toast.error("Order failed")
        }
    }

    if(!product) return <p>Loading.....</p>

    return (
        <div className='p-4 max-w-xl mx-auto'>
            <img src={product.images?.[0]} alt="Shoe" className='w-full h-80'/>

            <h2 className='text-2xl font-bold mt-3'>{product.name}</h2>
            <p className='text-gray-500'>{product.description}</p>
            <p className='text-xl font-semibold'>{product.price}</p>

            <div className='mt-4'>
                <h3 className='font-bold mb-2'>Select Size</h3>
                <div className='flex gap-2'>
                    {
                        [5,6,7,8,9,10].map((s) => (
                            <button
                                className={`p-2 border rounded m-1 ${size==s? "bg-black text-white":""}`}
                                key={s}
                                onClick={() => setSize(s)}
                                disabled={product.stock[String(s)] === 0}
                            >
                                {s}
                            </button>
                        ))
                    }
                </div>
            </div>
            
            <button onClick={buyNow} className='mt-4 bg-black text-white p-3'>Buy Now</button>


            {/* Review section */}

            <div className='mt-8 mb-4 border-t p-3'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-bold'>Reviews</h2>
                    <p>Average Rating : {averageRating}/5</p>
                </div>

                {loadingReviews ? (
                    <p className='text-gray-400'>Loading Reviews...</p>
                ):(
                    reviews.length === 0 ? (
                        <p>No reviews yet. Buy it and be the first one to review this product!</p>
                    ) : (
                        <div className='my-4'>
                            {reviews.map((review, index) => (
                                <div className='shadow rounded-lg p-4 bg-gray-200 mt-3'>
                                    <div className='mb-2'>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center font-semibold'>
                                                {review.user?.name?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                            <div>
                                                <p className='font-semibold'>{review.user?.name || "Anonymous"}</p>
                                            </div>
                                            {review.rating && (
                                                <div className='flex items-center gap-1'>
                                                    <span className='text-sm'>{review.rating}/5</span>
                                                </div>
                                            )} 
                                        </div>
                                    </div>
                                    {review.createdAt && (
                                        <span className='text-sm text-gray-500'>
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    )}

                                    <div>
                                        {review.comment && (
                                            <p className='text-gray-700 mt-2'>{review.comment}</p>
                                        )}
                                    </div>
                                </div>

                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default ProductDetails