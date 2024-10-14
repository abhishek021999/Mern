import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AppContext from '../context/AppContext'


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { setFilteredData, products, Logout, isAuthenticated,cart } = useContext(AppContext)
  // console.log("user cart ",cart);
  

  const filterbyCategory = (cat) => {
    setFilteredData(products.filter((data) => data.category.toLowerCase() == cat.toLowerCase()))
  }

  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price))
  }


  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`)
    setSearchTerm(" ")
  }

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar bg-dark">
          <Link to={'/'} className="left" style={{ textDecoration: "none", color: "white" }}>
            <h3>MERN E - Commerce</h3>
          </Link>

          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>{" "}
            <input type='text'
              placeholder='search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <div className="right">

            {isAuthenticated && (
              <>

                <Link to={'/cart'} type="button" className="btn btn-primary position-relative mx-3">
                  <span class="material-symbols-outlined">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M292-120q-38 0-65-27.5T200-213v-371l-73-176H40v-80h141l66 160h591q23 0 35 19t1 39L760-399q51 8 85.5 47t34.5 92q0 58-40.5 99T741-120q-59 0-99.5-41T601-260q0-20 5-37t14-33l-131-12-120 180q-13 20-33.5 31T292-120Zm382-285 99-195H280l50 120q8 20 25.5 33.5T396-431l278 26ZM293-201q2 0 9-5l97-144q-49-5-77-23.5T280-412v200q0 5 4 8t9 3Zm447 1q26 0 43-17.5t17-42.5q0-26-17-43t-43-17q-25 0-42.5 17T680-260q0 25 17.5 42.5T740-200Zm-66-205-278-26 278 26Z"/></svg>
                  </span>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart?.items?.length || 0}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>

                <Link to={'/profile'} className="btn btn-info mx-3">Profile</Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    Logout();
                    navigate('/');
                  }}>
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">login</Link>
                <Link to={"/register"} className="btn btn-info mx-3">register</Link>
              </>
            )}

          </div>
        </div>

        {location.pathname == '/' && (
          <div className="sub_bar">

            <div className="items" onClick={() => setFilteredData(products)}>No Filters</div>
            <div className="items" onClick={() => filterbyCategory("Kurti")}>Kurti</div>
            <div className="items" onClick={() => filterbyCategory("Kid Clothes")}>Kid Clothes</div>
            <div className="items" onClick={() => filterbyCategory("Top")}>Top</div>
            <div className="items" onClick={() => filterbyCategory("Saree")}>Sarees</div>
            <div className="items" onClick={() => filterbyCategory("Shirt")}>shirts</div>
            <div className="items" onClick={() => filterbyCategory("Men Clothes")}>Men Clothes</div>
            <div className="items" onClick={() => filterbyPrice(500)}>500</div>
            <div className="items" onClick={() => filterbyPrice(2000)}>2000</div>
            <div className="items" onClick={() => filterbyPrice(1000)}>1000</div>


          </div>

        )}

      </div>
    </>
  )
}

export default Navbar