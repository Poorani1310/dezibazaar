import { useEffect } from 'react'
import { useContext } from 'react'
import { DesiContext } from '../context/DesiContext.jsx'
import { useState } from 'react'
import Product_card from './Product_card.jsx'

const Myorders = () => {
    
    const { user } = useContext(DesiContext);
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        console.log("My orders page loaded");
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/myorders?uid=${user.uid}`);
                const data = await response.json();
                console.log("Fetched orders: ", data);
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders: ", error);
            }
        };
        fetchOrders();
    }, []);

    return (
    <div className='flex flex-col items-center gap-4 min-h-100'>
        <br/>
        Ordered Items
        {orders.length > 0 ? orders.map((order, index) => (
            <div key={index}>
                <Product_card product={order} />
            </div>
        )) : <p>You haven't ordered anything yet</p>}
        <br/>
    </div>
  )
}

export default Myorders
