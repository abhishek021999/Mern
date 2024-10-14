import React, { useContext, useState,useEffect } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'

const RelatedProduct = ({category}) => {
    const {products} = useContext(AppContext)
    const [relatedProduct, setRelatedProduct] = useState([])
    
    useEffect(() => {
       setRelatedProduct(products.filter((data)=>data?.category?.toLowerCase() == category?.toLowerCase()))
    }, [category,products])
    



  return (
   <>
   <div className='container text-center'>
    <h1>RelatedProduct</h1>


    <div className="row conatainer d-flex justify-content-center align-items-center">

        {relatedProduct?.map((data) =>
          <div key={data._id}
            className='my-3 mx-3 col-md-3'
          >
            <div className="card bg-dark text-light text-center"
              style={{ width: '18rem' }}>
            
            <Link to={`/product/${data._id}`}
                className='d-flex justify-content-center align-items-center p-3'>
                <img src={data.imgSrc}
                  className="card-img-top" alt="..."
                  style={{
                    width: "250px", height: "300px",
                    borderRaddius: "10px", border: "2px solid yellow"
                  }} />
              </Link>

              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
              </div>

              <div className='my-3'>
                <button className="btn btn-primary mx-3">{data.price}{" "}{"₹"}</button>
                <button className="btn btn-warning">Add to cart</button>
              </div>

            </div>
          </div>
        )}
      </div>

   </div>
   </>
  )
}

export default RelatedProduct