import { useEffect, useState } from 'react'
import { useStore } from '../../contexts/StoreContext'
import { v4 as uuidv4 } from 'uuid'
import './admin.scss'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
    const { products, setProducts } = useStore()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState()
    // const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        
        const product = { id: uuidv4(), image, name, price, description }

            fetch (`https://5d76bf96515d1a0014085cf9.mockapi.io/product`, {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(product)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .then(console.log(product))
    }

  return (
    <form onSubmit={handleSubmit} className='admin'>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
        <input 
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder='product name'
        />
         <input 
            type="text"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            placeholder='product price'
        />
         <input 
            type="text"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder='product description'
        />
        <button type='submit'>submit</button>
    </form>
  )
}
