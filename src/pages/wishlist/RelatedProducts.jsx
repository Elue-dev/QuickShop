import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiLoader } from 'react-icons/bi'

export default function RelatedProducts() {

    const [related, setRelated] = useState([])

    useEffect(() => {
        const relatedProducts = async () => {
            const relatedData = await fetch(process.env.REACT_APP_API)
            const relatedResults  = await relatedData.json()
            setRelated(relatedResults)
        }

        relatedProducts()
    },[])

    if (related.length === 0) {
        return(
            <div className='spinner related_spinner'>
             <BiLoader />
            </div>
        ) 
    }

  return (
    <div className='related_products'>
        <h1 className="heading">Recommended for you</h1>
            <div className="related_data">
                {related?.slice(6,10).map(product => (
                    <Link to={`/product/${product.id}`} key={product.id}  >
                        <div className='related_grid'>
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
