import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Admin from './Pages/Admin'
import User from './Pages/User'
import { Slide, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
   <Router>
    <Routes>
      <Route exact path='/' element={<Login />}/>
      <Route exact path='/admin' element={<Admin />} />
      <Route exact path='/user' element={<User />} />
      {/* <Route path='*' element={<Error />} /> */}
      </Routes>
      <ToastContainer  position="top-center" theme="dark" autoClose={2000} transition={Slide} newestOnTop={true} pauseOnFocusLoss={true} pauseOnHover={false}/>
   </Router>
   
  )
}

export default App
