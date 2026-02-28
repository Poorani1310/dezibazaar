import React from 'react'
import { useContext } from 'react'
import { DesiContext } from '../context/DesiContext.jsx'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  
  const {products, setProducts, pdtsToDisplay, setPdtsToDisplay} = useContext(DesiContext);
  const navigate = useNavigate();

  const handleMens = () => {
    console.log("Men's Fashion clicked");
    const filteredProducts = products.filter(product => product.pdt_catg === "Men");
    setPdtsToDisplay(filteredProducts);
    navigate("/products");
  }

  const handleWomens = () => {
    console.log(" Women's Fashion clicked");
    const filteredProducts = products.filter(product => product.pdt_catg === "Women");
    setPdtsToDisplay(filteredProducts);
    navigate("/products");
  }

  const handleKids = () => {
    console.log("Kids Fashion clicked");
    const filteredProducts = products.filter(product => product.pdt_catg === "Kids");
    setPdtsToDisplay(filteredProducts);
    navigate("/products");
  }

  const handleHomeKitchen = () => {
    console.log("Home & Kitchen clicked");
    const filteredProducts = products.filter(product => product.pdt_catg === "Home");
    setPdtsToDisplay(filteredProducts);
    navigate("/products");
  }

  const handleAccessories = () => {
    console.log("Accessories clicked");
    const filteredProducts = products.filter(product => product.pdt_catg === "Accessory");
    setPdtsToDisplay(filteredProducts);
    navigate("/products");
  }

  return (
    <div className="categories">
        <p className='cursor-pointer' onClick={handleMens}>Men's Fashion</p>
        <p className='cursor-pointer' onClick={handleWomens}>Women's Fashion</p>
        <p className='cursor-pointer' onClick={handleKids}>Kids Fashion</p>
        <p className='cursor-pointer' onClick={handleHomeKitchen}>Home & Kitchen</p>
        <p className='cursor-pointer' onClick={handleAccessories}>Accessories</p>
    </div>
  )
}

export default Categories
