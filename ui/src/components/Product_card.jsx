import React from 'react'
import {useNavigate} from 'react-router-dom'

const Product_card = ({product}) => {
    
    const navigate = useNavigate();

    const handlePdt = () => {
        console.log("Product clicked: ", product);
        navigate(`/product/${product.pdt_id}`);
    }

    return (
    <div className='product-card cursor-pointer' onClick={handlePdt}>
        <img src={new URL(`${product.pdt_photo_path}`, import.meta.url).href} alt={product.pdt_name} />
        <p>{product.pdt_name}</p>
        <p>{product.pdt_brand}</p>
        <p>Rs. {product.pdt_rate} /-</p>
    </div>
  )
}

export default Product_card
