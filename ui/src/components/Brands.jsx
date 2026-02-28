import React from 'react'
import { DesiContext } from '../context/DesiContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Brands = () => {
  const { products, pdtsToDisplay, setPdtsToDisplay } = useContext(DesiContext);
  const navigate = useNavigate();

  const handleAvasa = () => {
    console.log("Avasa clicked");
    const filteredProducts = products.filter(product => product.pdt_brand === "Avasa");
    setPdtsToDisplay(filteredProducts);
    navigate('/products'); // Navigate to the products page after filtering
  }

  const handleBullseye = () => {
    console.log("Bulls Eye clicked");
    const filteredProducts = products.filter(product => product.pdt_brand === "Bulls Eye");
    setPdtsToDisplay(filteredProducts);
    navigate('/products'); // Navigate to the products page after filtering
  }

  const handleCathy = () => {
    console.log("Cathy clicked");
    const filteredProducts = products.filter(product => product.pdt_brand === "Cathy");
    setPdtsToDisplay(filteredProducts);
    navigate('/products'); // Navigate to the products page after filtering
  }

  const handleKochelin = () => {
    console.log("Kochelin clicked");
    const filteredProducts = products.filter(product => product.pdt_brand === "Kochelin");
    setPdtsToDisplay(filteredProducts);
    navigate('/products'); // Navigate to the products page after filtering
  }

  const handleRaymonds = () => {
    console.log("Raymonds clicked");
    const filteredProducts = products.filter(product => product.pdt_brand === "Raymonds");
    setPdtsToDisplay(filteredProducts); 
    navigate('/products'); // Navigate to the products page after filtering
  }

  const handleBasics = () => {
    console.log("Basics clicked");
    const filteredProducts = products.filter(product => product.pdt_brand === "Basics");
    setPdtsToDisplay(filteredProducts);
    navigate('/products'); // Navigate to the products page after filtering
  }

  const handleWestside = () => {
    console.log("Westside clicked");
    const filteredProducts = products.filter(product => product.pdt_brand === "Westside");
    setPdtsToDisplay(filteredProducts); 
    console.log("Filtered products for Westside:", filteredProducts);
    navigate('/products'); // Navigate to the products page after filtering
  }

  const handleOwnd = () => {
    console.log("Ownd clicked");
    const filteredProducts = products.filter(product => product.pdt_brand === "Ownd");
    setPdtsToDisplay(filteredProducts);
    navigate('/products'); // Navigate to the products page after filtering
  }
  
  const handleKimberly = () => {
    console.log("Kimberly clicked");
    const filteredProducts = products.filter(product => product.pdt_brand === "Kimberly");
    setPdtsToDisplay(filteredProducts);
    navigate('/products'); // Navigate to the products page after filtering
  }

    return (
    <div className="topics">
        <h1>Brand Recommendations for you</h1>
        <div className="topics-container">
            <p className='cursor-pointer' onClick={handleAvasa}>Avasa</p>
            <p className='cursor-pointer' onClick={handleBullseye}>Bulls Eye</p>
            <p className='cursor-pointer' onClick={handleCathy}>Cathy</p>
            <p className='cursor-pointer' onClick={handleKochelin}>Kochelin</p>
            <p className='cursor-pointer' onClick={handleRaymonds}>Raymonds</p>
            <p className='cursor-pointer' onClick={handleBasics}>Basics</p>
            <p className='cursor-pointer' onClick={handleWestside}>Westside</p>
            <p className='cursor-pointer' onClick={handleOwnd}>Ownd</p>
            <p className='cursor-pointer' onClick={handleKimberly}>Kimberly</p>
        </div>
    </div>
  )
}

export default Brands
