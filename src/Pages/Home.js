import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getMemes} from "../Redux/Features/memeSlice";
import CardMeme from "../Components/CardMeme";
import Loader from '../Components/Loader'
import Footer from '../Components/Footer'
import '../Styles/home.css'

const Home = () => {
  const {memes, loading} = useSelector((state)=> ({...state.meme}))
  const dispatch = useDispatch();

  
 
  useEffect(()=>{
    dispatch(getMemes())
  },[])
  

  if(loading){
    return <Loader/>
  }
  return (
    <>
    <div className="homeBg">
    <div style={{
      margin: "auto",
      padding: "15px",
      maxWidth: "1000px",
      alignContent: "center",
      paddingBottom:"2rem"
    }}  >
      <MDBRow className="mt-5">
        {memes.length === 0 &&  (
          <MDBTypography className="text-center mb-0 mt-3" tag="h2">NO Memes Available</MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-2 g-5  mt-1"> 
              {memes &&  memes.map((item, index)=>(<CardMeme key={index} {...item}/>))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home