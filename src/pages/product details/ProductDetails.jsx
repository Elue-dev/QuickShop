import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../../contexts/StoreContext'
import { BiLoader } from 'react-icons/bi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './productDetails.scss'

export default function ProductDetails() {
    const { id } = useParams()
    const [ item, setItem ] = useState([])
    const { state: { cart, wishlist }, addToCart, addToWishlist, removeFromWishlist} = useStore()

    useEffect(() => {
        const prodDetail = async () => {
            const details = await fetch(process.env.REACT_APP_API +id)
            const detailsData = await details.json()
            setItem(detailsData)
        }

        prodDetail()
    }, [])

    const handleAddItem = () => {
        addToCart(item)
        toast.success('Item added to your cart', {autoClose: 1000, pauseOnFocusLoss: false} )
    }

    const handleAddWishlist = () => {
        addToWishlist(item)
        toast.success('Item added to your wishlist', {autoClose: 1000, pauseOnFocusLoss: false} )
    }

    const handleRemoveWishlist = (product) => {
        removeFromWishlist(product)
        toast.success('Item removed from your wishlist', {autoClose: 1000, pauseOnFocusLoss: false} )
    }

    if (item.length === 0) {
        return(
            <div className='spinner details_spinner'>
             <BiLoader />
            </div>
        ) 
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
                <p className='detail_price'>
                    <span>NGN {item.price}</span>
                    <span>NGN {item.price - 349}</span>
                </p>
                {cart.some(c => c.id === item.id) ? (
                    <button disabled className="btn add_to_cart disabled">In cart</button>
                ) : (
                    <button onClick={handleAddItem} className="btn add_to_cart">Add to cart</button>
                )}
                 {wishlist.some(w => w.id ===  item.id) ? (
                   <button onClick={() => handleRemoveWishlist(item)} className="btn buy_now">Remove from wishlist</button>
                ) : (
                    <button onClick={handleAddWishlist} className="btn buy_now">Add to wishlist</button>
                )}
            </div>
        </div>
    </div>
  )
}