import React from 'react'
import sale_img from '../assets/sale_img_1.jpg'

const Sale_img = () => {
  return (
    <div className="sale_image">
        <img src={sale_img} alt="Sale image" />
        <div className="sale_image__offer">
            <h3>Flash Sale! 24 hrs to save.</h3>
            <p>Get the top products for just Rs499/- just one day to save but lifetime to enjoy.</p>
        </div>
    </div>
  )
}

export default Sale_img
