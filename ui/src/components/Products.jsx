import React from 'react'
import Product_card from './Product_card'
import { useContext } from 'react'
import { DesiContext } from '../context/DesiContext.jsx'

const Products = () => {
    
    const { pdtsToDisplay } = useContext(DesiContext)

    return (
    <>
    <br/>
    <p className='text-2xl font-bold text-center'>Explore the wide range of products available</p>
    <br/>
    <div className='flex flex-wrap gap-4 justify-center p-4'>
      {pdtsToDisplay.map((product) => (
        <Product_card key={product.id} product={product} />
      ))}
    </div>
    <br/>
    </>
  )
}

export default Products
