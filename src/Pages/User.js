import React from 'react'
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import Select from 'react-select';
import axios from 'axios';
import CountrySelect from '../Component/CountrySelect';
import StateSelect from '../Component/StateSelect';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, logout, getAllUsers, UpdateUser, DeleteUser, SubmitForm } from '../Features/User/UserSlice';
const User = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateGeneralZipCode = (zipCode) => {
    return /^\d+$/.test(zipCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return;
    }
    if (phone === '' || !phone.match(/^\+?[1-9]\d*$/)) {
      toast.error('Please enter a valid phone number');
      return;
    }
    if (!validateGeneralZipCode(zipCode)) {
      toast.error('Please enter a valid zip code');
      return;
    }
    const data = {firstName, lastName, email, phone, address1, address2, zipCode}
    try {
      await dispatch(SubmitForm(data))
      setTimeout(() => {
        navigate('/')
      }, 1000)
      
    } catch (error) {
      
    }
    
    
  };

  return (
    <div>
      <button style={{position:'absolute', left:'95vw', top:'2vh'}} onClick={() => {
                dispatch(logout())
                navigate('/')
                }}>Logout</button>
      <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <label style={{ display: 'block', marginBottom: '10px' }}>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          minLength={5}
          style={inputStyle}
        />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          minLength={5}
          style={inputStyle}
        />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Email Id:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Mobile:
        <PhoneInput
          country={'in'}
          value={phone}
          onChange={(value) => setPhone(value)}
          inputStyle={{ ...inputStyle, width: '92%', marginLeft:'8%' }}
          enableSearch
          isValid={(value, country) => true}

        />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Address 1:
        <input
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          required
          style={inputStyle}
        />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Address 2:
        <input
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Country:
      </label>
      <CountrySelect />

      <label style={{ display: 'block', marginBottom: '10px' }}>
        State:
      
      </label>
      <StateSelect />

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Zip Code:
        <input
          type="String"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          style={inputStyle}
        />
      </label>

      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
    </div>
    
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  // marginLeft:'40px', 
  marginBottom: '5px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default User
