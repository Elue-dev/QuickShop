import { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function RelatedProducts() {

    const [related, setRelated] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const relatedProducts = async () => {
            const relatedData = await fetch(process.env.REACT_APP_API)
            const relatedResults  = await relatedData.json()
            setRelated(relatedResults)
        }

        relatedProducts()
    },[])

    const click = (id) => {
        navigate(id)
    }

  return (
    <div className='related_products'>
        <h1 className="heading">You may also like</h1>
            <div className="related_data">
                {related?.slice(2,10).map(product => (
                    <Link to={`/product/${product.id}`} key={product.id}  >
                        <div className='related_grid' onClick={()=>click(product.id)}>
                            <div className='related_image'>
                                <img src={product.preview} alt={product.name} />
                            </div>
                            <div className="related_texts">
                                <p>{product.name}</p>
                                <p><span>NGN</span> {product.price - 349}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
    </div>
  )
}
