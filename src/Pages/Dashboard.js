
import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  getMemesByUser,deleteMeme } from "../Redux/Features/memeSlice";
import { toast } from "react-toastify";
import bg1 from '../Assets/memebg1.jpg'
import Loader from '../Components/Loader'
import Footer from '../Components/Footer'

const Dashboard = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>({...state.auth}))
    const {userMemes, loading} = useSelector((state)=>({...state.meme}))
    const userId = user?.result?._id;
    useEffect(() => {
        if (userId) {
          dispatch(getMemesByUser(userId));
        }
      }, [userId]);
      
      const excerpt = (str) => {
        if (str.length > 40) {
          str = str.substring(0, 40) + " ...";
        }
        return str;
      };


      const handleDelete=(id)=>{
        if(window.confirm("Are you sure you want to delete this meme?")){
          dispatch(deleteMeme({id, toast}))
        }
      }

      if(loading){
        return <Loader/>
      }
      
  return (<>
    <div className="homeBg" style={{width:"100%", height:"100vh",background: `url(${bg1})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "100%",
        height:"100vh",
        alignContent: "center",
        backgroundColor:"rgba(12, 12, 12, 0.807)"
      }}
    >
      {userMemes.length === 0 && (
        <h3>No Memes available with the user: {user?.result?.name}</h3>
      )}

      {userMemes.length > 0 && (
        <>
          <h5 className="text-center" style={{color:"whitesmoke"}}>Dashboard: {user?.result?.name}</h5>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}

      {userMemes &&
        userMemes.map((item) => (
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
                    <MDBCardTitle className="text-start" style={{color:"whitesmoke"}}>
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start" style={{color:"whitesmoke"}}>
                      <small className="text-muted" >
                        Caption:- {excerpt(item.desc)}
                      </small>
                    </MDBCardText>
                    
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={() => handleDelete(item._id)}
                        />
                      </MDBBtn>
                      <Link to={`/editMeme/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#ffe854f0", marginLeft: "10px" }}
                          size="lg"
                          
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
          // <h4>{item.title}</h4>
        ))}
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Dashboard