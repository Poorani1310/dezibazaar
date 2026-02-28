import { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { DesiContext } from "../context/DesiContext.jsx";
import axios from "axios";

const Product = () => {
  
  const { id } = useParams();
  console.log("Product ID: ", id);
  const [product, setProduct] = useState({});
  const { user, setUser } = useContext(DesiContext);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`);
        const data = await response.json();
        setProduct(data);
        console.log("Product data: ", data);
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };
    fetchProduct();
  }, []);

  const handleAddCart = async () => {
    try {
        if(!user) {
          alert("Please login to add items to cart");
          return;
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/product/add-to-cart`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          uid: user.uid, 
          pid: product.pdt_id, 
        }),
      });
      const data = await response.json();
      console.log("Add to cart response: ", data);
      alert("Item added to cart successfully");
      navigate("/mycart");
    } catch (error) {
      console.error("Error adding to cart: ", error);
    }
  };

  const handleBuy = async () => {
    try {
        if(!user) {
          alert("Please login to buy items");
          return;
        }
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/buy-now`, {
          uid: user.uid, 
          pid: product.pdt_id, 
          price : product.pdt_rate 
        });
        console.log(response);
        initiatePayment(response.data.order);
      } catch (error) {
      console.error("Error buying product: ", error);
    }
  };

  const initiatePayment = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, 
      amount: order.amount, 
      currency: order.currency,
      name: 'Acme Corp',
      description: 'Test Transaction',
      order_id: order.id, 
      handler: (response) => {
          axios.post(`${import.meta.env.VITE_API_URL}/product/update_order`, {
          uid: user.uid, 
          pid: product.pdt_id, 
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature
        });
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
        <br/>
        <h1 className="text-3xl font-bold">{product.pdt_name}</h1>
        <p className="text-xl text-gray-600">From {product.pdt_brand}</p>
        <img className='w-68 h-78 border rounded-xl' src={new URL(`${product.pdt_photo_path}`, import.meta.url).href} alt={product.pdt_name} />
        <p className="text-2xl font-semibold">Rs. {product.pdt_rate} /-</p>
        <div className="p-2 flex flex-col gap-2">
        <div className="buttons">
          <button onClick={handleAddCart}>Add to Cart</button>
          <button onClick={handleBuy}>Buy Now</button>
        </div>
        <p className="p-2">Customer reviews: </p>
        <p>1. The Product was very good and received in good quality.</p>
        <p>2. Excellent product, highly recommend!</p>
        <p>3. Satisfied with the purchase, will buy again.</p>
        </div>
        <br/>
    </div>
  )
}

export default Product
