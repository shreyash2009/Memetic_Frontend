import React from 'react'
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
  } from "mdb-react-ui-kit";
  import { Link } from "react-router-dom";
const RelatedMemes = ({ relatedMemes, memeId }) => {
  return (
    <div style={{padding:'8px 10px'}}>
      {relatedMemes && relatedMemes.length > 0 && (
        <>
          {relatedMemes.length > 1 && <h4 style={{textAlign:"center", fontSize:"xx-large", fontWeight:'bold', letterSpacing:'1px', color:"whitesmoke"}}>Related Memes</h4>}
          <hr style={{color:"white", height:"2px", }}/>
          <MDBRow className="row-cols-1 row-cols-md-3 g-4" style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
            {relatedMemes
              .filter((item) => item._id !== memeId)
              .splice(0, 3)
              .map((item) => (
                <MDBCol>
                  <MDBCard style={{height:"auto", backgroundColor:"black", boxShadow:"1px 1px 2.8px 1.5px grey"}}>
                    <Link to={`/meme/${item._id}`}>
                      <MDBCardImage
                        src={item.imageFile}
                        alt={item.title}
                        position="top"
                        style={{height:"60%", borderBottom:"1px", borderBottomStyle:"solid", borderBottomColor:"grey", marginBottom:"8px"}}
                      />
                    </Link>
                    <span className="text-start tag-card" style={{paddingLeft:"6px"}}>
                      {item.tags.map((tag) => (
                        <Link to={`/memes/tag${tag}`}> #{tag}</Link>
                      ))}
                    </span>
                    <MDBCardBody>
                      <MDBCardTitle className="text-start" style={{color:"whitesmoke", fontWeight:"400", fontSize:"16px"}}>
                        {item.name}
                      </MDBCardTitle>
                      <MDBCardText className="text-start" style={{color:"grey"}}>
                        Caption:- {item.desc}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </div>
  )
}

export default RelatedMemes