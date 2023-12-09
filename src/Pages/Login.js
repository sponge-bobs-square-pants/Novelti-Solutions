import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../Features/User/UserSlice';
const Login = () => {
    const navigate = useNavigate();
    const {role} = useSelector((state) => state.user)
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (role) {
          navigate(`/${role.toLowerCase()}`);
        }
      }, [role, navigate]);
    
    const handleUserChange = (e) => {
        setUserId(e.target.value);
    }
    const handlePassChange = (e) => {
        setPassword(e.target.value);
    }

    const handleFormSubmit = async (userId, Password) => {
        dispatch(LoginUser({userId, password}))
    }
  return (
    <div>
      <h2>Login</h2>
     <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>UserId</label>
          <input type="text" placeholder="Enter your user id" value={userId} onChange={handleUserChange} />
        </div>
        <br />
        <div>
          <label>Password</label>
          <input type="Password" placeholder="Enter your password" value={password} onChange={handlePassChange}/>
        </div>
        <br />
        <button type="submit" onClick={() => handleFormSubmit(userId, password)}>Submit</button>
      </form>
      
    </div>
  )
}

export default Login
