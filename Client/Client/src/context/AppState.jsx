import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AppState = (props) => {
  const url = 'http://localhost:8484/api'
  
  const [products, setProducts] = useState([])
  const [token, setToken] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [user, setUser] = useState()
  const [cart, setCart] = useState([])
  const [reload, setReload] = useState(false)



  // when ever my browser reload I want to fetch all the data--> for that useEffect help
  useEffect(() => {
    const fetchedProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/all`, {
          headers: {
            "Content-Type": "Application/json"
          },
          withCredentials: true
        });
        setProducts(api.data.getDataProduct);
        console.log(api.data.getDataProduct);
        setFilteredData(api.data.getDataProduct)
        userProfile()
        
      } catch (error) {
        console.error('Error fetching products:', error); // Better error logging
      }
    }
    fetchedProduct();
    userCart()
  }, [token,reload])



  useEffect(() => {
    let lstoken = localStorage.getItem('token')
    if(lstoken){
      setToken(lstoken)
      setIsAuthenticated(true)
    }
    // console.log("lstoken",lstoken);
    
  }, [])
  


  // Register user
  const registerUser = async (name, email, password, role) => {
    try {
      const api = await axios.post(`${url}/user/register`,
        { name, email, password, role },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      //  alert(api.data.message);
      return api.data
      // console.log("User registered:", api);
    } catch (error) {
      console.log(error);
    }
  };



  // Login user
  const loginUser = async (email, password) => {
    try {
      const api = await axios.post(`${url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setToken(api.data.token)
      setIsAuthenticated(true)
      localStorage.setItem('token',token)
      //  console.log("User logged in:", api.data);
      return api.data

    } catch (error) {
      console.log(error);
    }
  };


  // logout user
  const Logout = ()=>{
    setIsAuthenticated(false)
    // setToken(" ")
    localStorage.removeItem('token')

    toast.success("logout successfully..!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  } 


  //  User Profile 
  const userProfile = async () => {
    try {
      const api = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "Application/json",
          "Auth":token
        },
        withCredentials: true
      });
      console.log("user profile",api.data);
      setUser(api.data.user)
     
    } catch (error) {
      console.error('Error fetching profile:', error); // Better error logging
    }
  }



  //  Add to cart 
  const addToCart = async (productID,title,price,qty,imgSrc) => {
    try {
      const api = await  axios.post(`${url}/card/add`,{
        productID,title,price,qty,imgSrc
      }, {
        headers: {
          "Content-Type": "Application/json",
           Auth:token
        },
        withCredentials: true
      });

      setReload(!reload)
      // console.log("my cart",api.data);
      // alert('✅ Product added to cart successfully!');

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      alert(error.response?.data?.message || '❌ Failed to add product to cart');
    }
  }


// Get User cart
const userCart = async () => {
  try {
    const api = await axios.get(`${url}/card/user`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth":token
      },
      withCredentials: true
    });
  //  console.log("user cart",api.data.Cart);
   setCart(api.data.Cart)
  } catch (error) {
    console.error('Error fetching cart:', error); // Better error logging
  }
}




  return (
    <AppContext.Provider value={{
       products, registerUser, 
       loginUser, token, 
       setIsAuthenticated, isAuthenticated,
       filteredData, setFilteredData,
       Logout,user,addToCart,cart
       }}>{props.children}</AppContext.Provider>
  )
}

export default AppState