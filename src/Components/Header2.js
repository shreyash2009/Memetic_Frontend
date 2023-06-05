import React, { useState } from "react";
import { BsPerson, BsSearch } from "react-icons/bs";
import { GiHamburgerMenu , GiExitDoor,GiTireIronCross} from "react-icons/gi";
import Dropdown from "react-bootstrap/Dropdown";
import ResNav from "./ResNav";
import "../Styles/Header.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../Redux/Features/authSlice";
import { searchMemes } from "../Redux/Features/memeSlice";
import { useNavigate } from "react-router-dom";
import decode from 'jwt-decode';
const Header2 = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const token = user?.token;

  if(token){
    const decodedToken = decode(token);
    if(decodedToken.exp*1000 < new Date().getTime()){
      dispatch(setLogout());
    }
  }
  const removeMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = ()=>{
    dispatch(setLogout())
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
    <>
      <section id="Header">
        <div className="logo">
          
          <span> <span className="LogoBlack">MEME</span><span className="LogoWhite">TIC</span></span>
        </div>
        <ul className="Nav_links">
          <li className="NavLink" > <a href="/">Home</a> </li>
          {user?.result?._id && (
            <>
              <li className="NavLink"> <a href="/addMeme">Post</a>  </li>
              <li className="NavLink"> <a href="/dashboard">Dashboard</a> </li>
            </>
          )}

          <li className="searchBoxContainer NavLink">
            <form class="searchBox " onSubmit={handleSearch}>
              <span style={{ marginRight: "8px", color:"black" }}>
                <BsSearch />
              </span>
              <input
                type="text"
                className=" search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </li>
          {
            user?.result?._id ? (<li className="NavLink">
            <Dropdown
              onMouseLeave={() => setShowDropdown(false)}
              onMouseOver={() => setShowDropdown(true)}
            >
              <Dropdown.Toggle
                variant="dark"
                id="dropdown-basic"
                style={{
                  padding: "3px 6px",
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                }}
              >
                <span style={{ fontSize: "22px", fontWeight: "500", color:"whitesmoke" }}>
                  <BsPerson />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu show={showDropdown} style={{backgroundColor:"black", borderRadius:"20px", overflow:"hidden"}}>
                <Dropdown.Item href="#" style={{color:"white"}} className="DropdownItem"> <span style={{fontSize:"22px",fontWeight:"600",marginRight:"4px",color:"white"}}><BsPerson/></span>{user?.result?.name} </Dropdown.Item>
                {/* <Dropdown.Divider /> */}
                <Dropdown.Item eventKey="4" href="#" onClick={handleLogout} className="DropdownItem">
                <span style={{fontSize:"18px",fontWeight:"500",marginRight:"4px",color:"black"}}><GiExitDoor/></span>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>) :
          (
            <li className="NavLink"> <a href="/login" style={{textDecoration:"none" , color:"whitesmoke"}}>LogIn</a> </li>
          )
          }
          
        </ul>
        {showMenu ? (
          <GiTireIronCross
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="Burger"
          />
        ) : (
          <GiHamburgerMenu
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="Burger"
          />
        )}{" "}
      </section>
      {showMenu && <ResNav showMenu={showMenu} removeMenu={removeMenu} />}{" "}
    </>
  );
};

export default Header2;
