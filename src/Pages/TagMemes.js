import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useParams, useNavigate } from "react-router-dom";
// import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getMemesByTag } from '../Redux/Features/memeSlice';
import bg1 from '../Assets/memebg5.jpeg'
import Loader from '../Components/Loader'
import Footer from '../Components/Footer'

const TagMemes = () => {
  const {tagMemes, loading} = useSelector((state)=> ({...state.meme}))
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  
  useEffect(()=>{
    dispatch(getMemesByTag(tag))
  }, [tag])


  if(loading){
    return <Loader/>
  }
  return (
    <>
    <div className="homeBg" style={{width:"100%", height:"100vh",background: `url(${bg1})`, backgroundRepeat:"no-repeat",backgroundAttachment:"fixed", backgroundSize:"cover"}}>
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "100%",
        height:"100%",
        alignContent: "center",
        backgroundColor:"rgba(12, 12, 12, 0.807)"
      }}
    >
      <h3 className="text-center" style={{color:"whitesmoke"}}>Memes with tag: {tag}</h3>
      <hr style={{ maxWidth: "570px" }} />
      {tagMemes &&
        tagMemes.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard style={{ maxWidth: "600px",margin:"auto", background:"black", padding:"6px", boxShadow:"1.5px 1.5px 4px 0.2px grey" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt={item.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                  <small style={{ float: "left", display:'block',color:"white"}}>Created By:- {item.name}</small>
                  <br/>
                    
                    <MDBCardText className="text-start">
                      Caption:- {item.desc}
                    </MDBCardText>
                    
                    <div style={{ float: "left", marginTop: "-4px" }}>
                      <MDBBtn
                        size="sm"
                        rounded
                        color="info"
                        onClick={() => navigate(`/meme/${item._id}`)}
                        style={{backgroundColor:"yellow", color:"black", fontWeight:"bolder" }}
                      >
                        Read More
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default TagMemes