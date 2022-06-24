import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../../contexts/StoreContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './productDetails.scss'

export default function ProductDetails() {
    const { id } = useParams()
    const [ item, setItem ] = useState([])
    const { state: { cart }, addToCart } = useStore()

    useEffect(() => {
        const prodDetail = async () => {
            const details = await fetch(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`)
            const detailsData = await details.json()
            setItem(detailsData)
        }

        prodDetail()
    }, [])

    const handleAddItem = () => {
        addToCart(item)
        toast.success('Item added to your cart', {autoClose: 1000, pauseOnFocusLoss: false} )
    }

  return (
    <div className='product_details'>
        <h1>Product Detail</h1>
        <div className="details_row">
            <div className="product_detail_container">
                    <div className="image_container">
                        <img src={item.preview} alt={item.name} id='large_img' />
                    </div>
            
                <div className="small_images_container">
                    {item.photos?.map((photo) => (
                        <img key={photo} src={photo} alt={item.name} className='small_image' id='small_img' />
                    ))}
                </div>
            </div>

            <div className="details_texts">
                <p className='detail_name'>{item.name}</p>
                <p>{item.description}.</p>
                <p className='detail_price'><span>NGN {item.price}</span> NGN {item.price - 349}</p>
                {cart.some(i => i.id === item.id) ? (
                    <button disabled className="btn add_to_cart disabled">Added to cart</button>
                ) : (
                    <button onClick={handleAddItem} className="btn add_to_cart">Add to cart</button>
                )}
                <button className="btn buy_now">Buy now</button>
            </div>
        </div>
    </div>
  )
}