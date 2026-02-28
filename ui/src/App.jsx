import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useContext } from 'react'
import { useEffect } from 'react'
import Home from './components/Home'
import Products from './components/Products'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DesiContext } from './context/DesiContext.jsx'
import {auth, provider} from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Product from './components/Product.jsx'
import Myorders from './components/Myorders.jsx'
import Mycart from './components/Mycart.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'


function App() {
  const [count, setCount] = useState(0);
  const { products, setProducts, pdtsToDisplay, setPdtsToDisplay, user, setUser, logFlag, setLogFlag } = useContext(DesiContext);
  
  useEffect(() => {

      onAuthStateChanged(auth, (loginuser)=>{
        if(loginuser)
        {
          setUser(loginuser);
          setLogFlag(true)
          console.log('user in userContext', loginuser)
          console.log(loginuser)
        }
        else{
          setUser('');
          setLogFlag(false)
        }
      })

      const fetchProducts = async () => {
      console.log('Fetching products from backend...');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await response.json();
      console.log('Fetched products:', data);
      setProducts(data);
      setPdtsToDisplay(data);
    };
    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/myorders" element={<Myorders />} />
        <Route path="/mycart" element={<Mycart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
