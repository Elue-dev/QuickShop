import { useStore } from '../../contexts/StoreContext'
import './wishList.scss'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function WishList() {
  const { state: {wishlist}, removeFromWishlist } = useStore()
  
  const handleRemove = (item) => {
    removeFromWishlist(item)
    toast.success('Item removed from your wishlist', {autoClose: 1000, pauseOnFocusLoss: false} )
  }

  return (
    <div className='wishlist'>
      {wishlist?.map(wish => (
        <>
        <h2>{wish.name}</h2>
        <button onClick={() => handleRemove(wish)}>remove</button>
        </>
      ))}
    </div>
  )
}
