import React from 'react'
import { Link } from 'react-router-dom'

export default function Success() {
  return (
    <div>
        <h1>THANK YOU FOR YOUR PURCHASE</h1>
        <Link to='/'>Back to home</Link>
    </div>
  )
}
