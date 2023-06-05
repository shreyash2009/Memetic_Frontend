import React, {useEffect} from 'react'
import { Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import {ToastContainer} from 'react-toastify'
import { useDispatch } from 'react-redux'
import "react-toastify/dist/ReactToastify.css";
import { setUser } from './Redux/Features/authSlice'
import Header2 from './Components/Header2'
import AddEditMeme from './Pages/AddEditMeme'
import SingleMeme from './Pages/SingleMeme'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Pages/Dashboard'
import PageNotFound from './Pages/PageNotFound'
import TagMemes from './Pages/TagMemes'
const App = () => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(()=>{
    dispatch(setUser(user))
  },[dispatch, user]);
  return (
    <div>
      <Header2/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/memes/search' element={<Home/>}/>
        <Route path='/memes/tag/:tag' element={<TagMemes/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/addMeme' element={ <PrivateRoute><AddEditMeme/></PrivateRoute>}/>
        <Route path='/editMeme/:id' element={<PrivateRoute><AddEditMeme/></PrivateRoute>}/>
        <Route path='/meme/:id' element={<SingleMeme/>}/>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </div>
  )
}

export default App