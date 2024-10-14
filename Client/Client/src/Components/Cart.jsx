import React, { useContext } from 'react'
import AppContext from '../context/AppContext'

const Cart = () => {
  const {cart} = useContext(AppContext)
  return (
    <>
    {cart?.items?.map((data)=>
    <div key={data._id} className='container bg-dark my-5 p-3 text-center'>
      <div style={{
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center'
        }}>
        <div className="cart_img">
         <img src={data.imgSrc} alt="" style={{width:"100px",height:"100px", borderRadius:"10px"}}/>
        </div>
        <div className="cart_des">
          <h3>{data.title}</h3>
          <h4>{data.price}</h4>
          <h4>Qty:-{data.qty}</h4>
        </div>
        <div className="cart_action">
          <button className='btn btn-secondary mx-3'style={{fontWeight:"bold"}}>Qty--</button>
          <button className='btn btn-info mx-3'style={{fontWeight:"bold"}}>Qty++</button>
          <button className='btn btn-danger mx-3'style={{fontWeight:"bold"}}>Remove item</button>
        </div>
      </div>
    </div>
    )}
    </>
  )
}

export default Cart