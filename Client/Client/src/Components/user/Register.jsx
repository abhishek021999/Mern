import React, { useContext } from 'react'
import { useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const {registerUser} = useContext(AppContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:"Customer"
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

   const {name,email,password,role} = formData
  const submitHandler = async (e) => {
    e.preventDefault()
    const result =  await registerUser(name,email,password,role)
    console.log(result);
    
    if(result.success){
    navigate("/login")
    }

  }


  return (
    <>
      <div className="container my-5 p-3"
        style={{
          width: '600px',
          border: '2px solid yellow',
          borderRadius: '10px',
        }}>

        <h1 className='text-center'>User Register</h1>

        <form className='my-3' onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              id="INPname"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input
              name='email'
              value={formData.email}
              onChange={onChangeHandler}
              type="email"
              className="form-control"
              id="INPgmail"
              aria-describedby="emailHelp" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              name='password'
              value={formData.password}
              onChange={onChangeHandler}
              type="password"
              className="form-control"
              id="INPpassword" />
          </div>

          <div className="mb-3">
            <label htmlFor="roleSelect" className="form-label">Role</label>
            <select
              name='role'
              value={formData.role}
              onChange={onChangeHandler}
              className="form-control"
              id="roleSelect"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
              <option value="Member">Member</option>
            </select>
          </div>


          <div className='d-grid col-6 mx-auto my-3'>
            <button type="submit" className="btn btn-primary">Register</button>
          </div>

        </form>
      </div>
    </>
  )
}

export default Register