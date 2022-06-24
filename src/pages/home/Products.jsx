import { useEffect } from "react"
import { useStore } from "../../contexts/StoreContext"
import { BsCartPlus, BsCartCheck } from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Products() {

    const { state: {cart}, products, setProducts, addToCart } = useStore()

    useEffect(() => {
        const getProducts = async () => {
            const fetchProducts = await fetch (process.env.REACT_APP_API)
            const jsonData = await fetchProducts.json()
            setProducts(jsonData)
        }

        getProducts()
    }, [])

    const handleAddItem = (product) => {
        addToCart(product)
        toast.success('Item added to your cart', {autoClose: 1000, pauseOnFocusLoss: false} )
    }

  return (
    <>
        <h1 className="heading">PRODUCTS</h1>
        <div className="products_data">
            {products?.map(product => (
                <div className="products_card" key={product.id}>
                    <div className="products_details">
                        <div className="items_icon">
                            {cart.some(p => p.id === product.id) ? (
                                <>
                                    <BsCartCheck className="add_item_icon"/>
                                    <Link to={`/product/${product.id}`}><FaRegEye className="details_icon"/></Link>
                                 </>
                            ) : (
                                <>
                                    <BsCartPlus className="add_item_icon" onClick={()=>handleAddItem(product)} />
                                    <Link to={`/product/${product.id}`}><FaRegEye className="details_icon"/></Link>
                                </>
                            )}
                        </div>
                        <div className="product_image">
                            <img src={product.preview} alt={product.name} />
                        </div>
                        <div className="product_texts">
                            <h2>{product.name}</h2>
                            <p><b>Brand:</b> {product.brand}</p> 
                            <p><b>Price:</b> NGN {product.price - 349}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}
