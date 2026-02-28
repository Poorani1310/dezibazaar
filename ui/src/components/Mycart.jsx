import { useEffect, useState } from "react";
import { useContext } from "react";
import { DesiContext } from "../context/DesiContext.jsx";
import Product_card from "./Product_card.jsx";
import axios from "axios";

const Mycart = () => {
  const { user } = useContext(DesiContext);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    console.log("My cart page loaded");
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/mycart?uid=${user.uid}`,
        );
        const data = await response.json();
        console.log("Fetched cart items: ", data);
        setCartItems(data);
        const total = data.reduce((sum, item) => sum + Number(item.pdt_rate), 0);
        setTotal(total);
        console.log("Total cart value: ", total);
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      }
    };
    fetchCartItems();
  }, []);

  const handleRemove = async (pdt_id) => {
    try {
        console.log('Removing item from cart: ', pdt_id);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/removefromcart`, {
        method: 'POST',
        headers: {  'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, pdt_id })
      });
      const data = await response.json();
      console.log("Item removed from cart: ", data);
      const newCartItems = cartItems.filter(item => item.pdt_id !== pdt_id);
      setCartItems(newCartItems);
      const newTotal = newCartItems.reduce((sum, item) => sum + Number(item.pdt_rate), 0);
      setTotal(newTotal);
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

  const handleCheckout = async () => {
    console.log("Proceeding to checkout with items: ", cartItems);
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/buy-now`, {
        // const response = await axios.post(`http://localhost:5000/product/buy-now`, {
          uid: user.uid, 
          pid: cartItems.map(item => item.pdt_id), 
          price : total 
        });
        console.log('response ', response.data.order);
        initiatePayment(response.data.order);
      } catch (error) {
      console.error("Error buying product: ", error);
    }
  };

const initiatePayment = (order) => {
    console.log('Order details: ', order)
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, 
      amount: order.amount, 
      currency: order.currency,
      name: 'Acme Corp',
      description: 'Test Transaction',
      order_id: order.id, 
      handler: (response) => {
          axios.post(`${import.meta.env.VITE_API_URL}/product/update_orders`, {
          uid: user.uid, 
          pids: cartItems.map(item => item.pdt_id), 
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature
        });
        console.log('Payment successful! Payment ID: ', response.razorpay_payment_id);
        setCartItems([]);
        setTotal(0);
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      }
    };
    console.log("Initiating payment with options: ", options);
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="flex flex-col items-center gap-4 min-h-100">
      <br />
      Cart Items
      {cartItems.length > 0 ? 
      <div className="flex flex-col gap-4">
        {cartItems.map((item, index) => (
        <div className="flex flex-col gap-2">
          <Product_card key={index} product={item} />
          <button onClick={() => handleRemove(item.pdt_id)} 
                  className="border rounded-xl p-2 w-50 bg-blue-600 text-shadow-white">
            Remove from Cart
          </button>
          </div>))}
          <p>Total Items : {cartItems.length}</p>
          <p>Total Item Value : Rs. {total} /-</p>
          <button className="border rounded-xl p-2 w-50 bg-green-600 text-shadow-white cursor-pointer"
            onClick={handleCheckout}
          >
              Proceed to Checkout {cartItems.length} items
          </button> 
        </div>
        : (
            <p>Your cart is empty</p>
          )}
        <br />
    </div>
  );
};

export default Mycart;
