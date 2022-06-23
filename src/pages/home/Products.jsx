import { useEffect } from "react"
import { useStore } from "../../contexts/StoreContext"
import { BsCartPlus, BsCartCheck } from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa'

export default function Products() {

    const { state: {cart}, products, setProducts, addToCart } = useStore()

    useEffect(() => {
        const getProducts = async () => {
            const fetchProducts = await fetch ('https://5d76bf96515d1a0014085cf9.mockapi.io/product')
            const jsonData = await fetchProducts.json()
            setProducts(jsonData)
        }

        getProducts()
    }, [])

    console.log(products)

  return (
    <>
        <h1 className="heading">PRODUCTS</h1>
        <div className="products_data">
            {products.map(product => (
                <div className="products_card" key={product.id}>
                    <div className="product_details">
                        <div className="items_icon">
                            {cart.some(p => p.id === product.id) ? (
                                <>
                                    <BsCartCheck className="add_item_icon"/>
                                    <FaRegEye className="details_icon"/>
                                 </>
                            ) : (
                                <>
                                    <BsCartPlus className="add_item_icon" onClick={() => addToCart(product)} />
                                    <FaRegEye className="details_icon"/>
                                </>
                            )}
                        </div>
                        <div className="product_image">
                            <img src={product.preview} alt={product.name} />
                        </div>
                        <div className="product_texts">
                            <h2>{product.name}</h2>
                            <p><b>Brand:</b> {product.brand}</p> 
                            <p><b>Price:</b> NGN {product.price}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}
