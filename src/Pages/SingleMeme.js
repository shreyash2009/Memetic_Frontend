import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {   useParams } from "react-router-dom";
import RelatedMemes from "../Components/RelatedMemes";
import moment from "moment";
import { getMeme, getRelatedMemes } from "../Redux/Features/memeSlice";
import Loader from '../Components/Loader'
import Footer from '../Components/Footer'
const SingleMeme = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { meme, relatedMemes,loading } = useSelector((state) => ({ ...state.meme }));
  const tags = meme?.tags;

  useEffect(() => {
    tags && dispatch(getRelatedMemes(tags));
  }, [tags, dispatch]);
  useEffect(() => {
    if (id) {
      dispatch(getMeme(id));
    }
    // console.log(meme)
  }, [id, dispatch]);

    if(loading){
      <Loader/>
    }
  // const navigate = useNavigate()
  return (
    <>
    <div className="homeBg">
      <MDBContainer style={{marginTop:"70px", paddingTop:"10px"}}>
        <MDBCard className="mb-3 mt-2" style={{backgroundColor:"black"}}>
          <MDBCardImage
            position="top"
            style={{ width: "50%", maxHeight: "600px", margin:"auto" }}
            src={meme.imageFile}
            alt={meme.name}
          />
          <MDBCardBody>
            <h3 style={{color:"whitesmoke"}}>{meme.title}</h3>
            <span>
              <p className="text-start memeName" style={{color:"whitesmoke"}}>Created By: {meme.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start" style={{color:"whitesmoke"}}>
                {meme && meme.tags && meme.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2" style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(meme.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start" style={{color:"grey"}}>
             Caption:- {meme.desc}
            </MDBCardText>
          </MDBCardBody>
          <RelatedMemes relatedMemes={relatedMemes} memeId={id} />
        </MDBCard>
      </MDBContainer>
    </div>
    <Footer/>
    </>
  );
};

export default SingleMeme;
