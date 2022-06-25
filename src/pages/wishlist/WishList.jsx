import { useStore } from '../../contexts/StoreContext'
import { Link } from 'react-router-dom'
import { AiOutlineClose  } from 'react-icons/ai'
import { IoHeartDislikeSharp } from 'react-icons/io5'
import { FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RelatedProducts from './RelatedProducts'
import './wishList.scss'

export default function WishList() {
  const { state: {wishlist}, removeFromWishlist } = useStore()
  
  const handleRemoveWish = (item) => {
    removeFromWishlist(item)
    toast.success('Item removed from your wishlist', {autoClose: 1000, pauseOnFocusLoss: false} )
  }

  return (
    <div className='wishlist'>
      <h1 className='wishlist_title'>Your wishlist</h1>
      {!wishlist.length && <p className='wishlist_empty'>
        <IoHeartDislikeSharp className='wish_empty' />
        <p>Your have nothing in your wishlist</p>
        </p>
      }
      {wishlist.length ? (
        <p className='wish_length'>
         You have <b>{wishlist.length === 1 ? '1 item' : `${wishlist.length} items`}</b> in your wishlist so far.
        </p>
      ) : null}
      {wishlist?.map(wish => (
        <>
          <div className="wishlist_item" key={wish.id}>
            <div className="item_image">
              <img src={wish.preview} alt={wish.name} />
            </div>
            <div className='cart_price'><b>NGN</b> {wish.price - 349}</div>
                <Link to={`/product/${wish.id}`}>
                  <FaEye className='view_item' />
              </Link>
            <button className="remove_item" onClick={() => handleRemoveWish(wish)}>
              <AiOutlineClose className='remove_icon' />
            </button>
          </div>
          <hr /><hr />
        </>
      ))}
      <RelatedProducts  />
    </div>
  )
}
