import Product_card from './Product_card'
import { useState, useEffect } from 'react'

const Recommendations = () => {
    
    const [recommendedPdts, setRecommendedPdts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log('Fetching recommended products from backend...');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/recommended`);
            const data = await response.json();
            setRecommendedPdts(data);
            console.log('Fetched recommended products:', data);
        };
        fetchProducts();
    }, []);

    return (
    <div className="recommended">
        <h2>Recommended for you</h2>
        <p>Pick the best fit</p>
        <div className="card-container">
            {
                recommendedPdts.map((product) => <Product_card key={product.pdt_id} product={product}/>)
            }
        </div>
    </div>
  )
}

export default Recommendations
