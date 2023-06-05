import React from "react";
import {
  MDBCard,

  MDBCardImage,
  MDBCardGroup,
  MDBIcon,
  MDBTooltip,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { AiOutlineLike,AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeMeme } from "../Redux/Features/memeSlice";



const CardMeme = ({imageFile, desc, title, tags,_id, name,likes}) => {
const dispatch = useDispatch();
const {user} = useSelector((state)=>({...state.auth}))
const userId = user?.result?._id;

  const shortCaption = (desc)=>{
    let str= desc;
    if(desc.length > 15){
      str = str.substr(0,15)+ " ...";
    }

    return str;
  }

  const handleLike = ()=>{
    dispatch(likeMeme({_id}))
  }


  const Likes =()=>{
    if(likes.length>0)
    return likes.find((like) => like === userId) ? (
    <>
    <AiFillLike style={{color:"yellow", fontSize:"18px"}}/> &nbsp;
    {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other people likes`}
            >
              <span style={{color:"white"}}>{likes.length} Likes</span>
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )}
    </>
    ) : (
    <>
      <AiOutlineLike />&nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
    </>
    );
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  }


  const LinkStyle={
    color:"white",
    textDecoration:"none"
  }



  return (
    <MDBCardGroup>
      <MDBCard style={{border:"2px", borderStyle:'solid', backgroundColor:"black", borderColor:"grey", boxShadow:"1px 1px 2.8px 1.5px grey"}}>
        <div className="userInfo">
        <MDBCardHeader style={{display:'flex', alignItems:'center', gap:'3px', padding:'4px',color:'whitesmoke', fontWeight:'500', letterSpacing:'1p',border:"none"}}>
      <MDBIcon fas icon="user-circle" className="fa-2x m-2"  style={{color:'yellow'}}/>
        {name}
        </MDBCardHeader>
        </div>
        <div style={{border:'1px', borderStyle:'solid', marginBottom:'5px',borderColor:"grey"}}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "400px" }}
        />
        </div>
        
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 10px'}} >
          
          <span style={{display:'inline-block', color:"white"}}>
            <span style={{fontSize:"15px",cursor:"pointer"}} onClick={!user?.result ? null : handleLike}>{!user?.result ? (
              <MDBTooltip title="Please login to like tour" tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}</span>
          </span>
          <span style={{display:'inline-block', color:"white"}}>
            {tags.map((tag)=>(
               <Link to={`/memes/tag/${tag}`} style={LinkStyle}> #{tag}</Link>
            ))}
          </span>
        </div>

        <p style={{ padding:'8px 10px',color:"#b5b5b5"}}>Caption:- {shortCaption(desc)}  <Link to={`/meme/${_id}`} style={{fontSize:"15px", color:"white"}} > ..Read More</Link></p>

      </MDBCard>
    </MDBCardGroup>


  )
}

export default CardMeme