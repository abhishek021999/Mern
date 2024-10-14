import React, { useContext } from 'react'
import AppContext from './context/AppContext'
import ShowProduct from './Components/product/ShowProduct'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductDetails from './Components/product/ProductDetails'
import Navbar from './Components/Navbar'
import SearchProduct from './Components/product/SearchProduct'
import Register from './Components/user/Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/user/Login'
import Profile from './Components/user/Profile'
import Cart from './Components/Cart'



const App = () => {
  // const {data} = useContext(AppContext)
  return (
    <>
    <Router>
      <Navbar/>
      <ToastContainer />
      <Routes>
          <Route path='/' element={<ShowProduct/>}/>
          <Route path='/product/search/:term' element={<SearchProduct/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/cart' element={<Cart/>}/>

      </Routes>
    </Router>
    </>
  )
}

export default App