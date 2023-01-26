import {React,useState} from 'react'
import { BsPerson,BsSearch } from "react-icons/bs";
import { GiExitDoor } from "react-icons/gi";
import {Link} from "react-router-dom"
import "../Styles/Header.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../Redux/Features/authSlice";
import { searchMemes } from "../Redux/Features/memeSlice";
import { useNavigate } from "react-router-dom";
import decode from 'jwt-decode';
const ResNav = ({removeMenu, showMenu}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const token = user?.token;
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const handleLogout = ()=>{
      dispatch(setLogout())
  }

  if(token){
    const decodedToken = decode(token);
    if(decodedToken.exp*1000 < new Date().getTime()){
      dispatch(setLogout());
    }
  }

  const handleSearch = (e)=>{
    e.preventDefault()

    if(search){
      dispatch(searchMemes(search))
      navigate(`/memes/search?searchQuery=${search}`)
    }else{
      navigate('/')
    }
    setSearch('')
  }
  return (
    

    <div className={`${showMenu ? "resNav show": "resNav"}`}>
        <ul className='resLinks'>
            <li className='resLink'><form className='resSearchBox' onSubmit={handleSearch}><input type="search" placeholder='Search...' value={search} onChange={(e)=> setSearch(e.target.value)} /></form></li>
            <li className='resLink'><a href='/' style={{color:"white", cursor:"pointer"}}>Home</a></li>
            {
              user?.result?._id && (
                <>
                <li className='resLink'><a href="/addMeme" style={{color:"white", cursor:"pointer"}}>Post</a></li>
            <li className='resLink'><a href="/dashboard" style={{color:"white", cursor:"pointer"}}>Dashboard</a></li>
            <hr/>
            </>
              )
            }

            {
              user?.result?._id ? (
                <>
                <li className='resLink'><span style={{fontSize:"22px",fontWeight:"600",marginRight:"4px", cursor:"pointer"}}><BsPerson/></span>Shreyash Chaple</li>
            <li className='resLink'><span style={{fontSize:"18px",fontWeight:"500",marginRight:"4px", cursor:"pointer"}} onClick={handleLogout}><GiExitDoor/></span>Log Out</li>
            </>) : (
             <li className="resLink"> <a href="/login" style={{textDecoration:"none" , color:"whitesmoke", cursor:"pointer"}} >LogIn</a> </li>
            )
              
            }
            
        </ul>
    </div>
  )
}

export default ResNav