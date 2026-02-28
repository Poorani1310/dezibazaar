import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { DesiContext } from "../context/DesiContext.jsx";

const Footer = () => {
  
  const navigate = useNavigate();
  const { user } = useContext(DesiContext);

  return (
    <div className="footer">
        <div className="footer-one">
            <div className="footer-one__s1">
                <p className='cursor-pointer' onClick={()=>navigate("/about")}>About us</p>
                <p className='cursor-pointer' onClick={()=>navigate(`/contact`)}>Contact Us</p>
            </div>
            <div className="footer-two">
                <h2>desibazaar</h2>
                <p>&copy; desibazaar Inc</p>
            </div>
        </div>
        
    </div>
  )
}

export default Footer
