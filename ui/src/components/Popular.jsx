import { useEffect } from 'react'
import { useState } from 'react'
import Product_card from './Product_card'

const Popular = () => {

    const [popularPdts, setPopularPdts] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            console.log('Fetching popular products from backend...');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/popular`);
            const data = await response.json();
            setPopularPdts(data);
            console.log('Fetched popular products:', data);
        };
        fetchProducts();
    }, []);
  
    return (
    <div className="popular">
        <h2>Most Popular</h2>
        <p>Pick the best fit</p>
        <div className="popular-container">
            {
                popularPdts.map((product) => <Product_card key={product.pdt_id} product={product}/>)
                    
            }
        </div> 
    </div>
  )
}

export default Popular
