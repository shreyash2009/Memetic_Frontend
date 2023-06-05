import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import bg2 from '../Assets/memebg2.jpg'
import { createMeme, updateMeme } from "../Redux/Features/memeSlice";
import Footer from "../Components/Footer";


const initialState = ({
    title:"",
    desc:"",
    tags:[]
})
const AddEditMeme = () => {
    const [memeData, setMemeData] = useState(initialState)
    const { error, userMemes } = useSelector((state) => ({
        ...state.meme,
      }));
      const { user } = useSelector((state) => ({ ...state.auth }));
      const dispatch = useDispatch();
      const navigate = useNavigate();
    const {title, desc, tags} = memeData;
    // we are getting the id of the meme in url 
    const {id} = useParams()

    useEffect(()=>{
      if(id){
        const singleMeme = userMemes.find((meme)=> meme._id === id)
        setMemeData({...singleMeme})
      }
    },[id, userMemes])

    useEffect(()=>{
        error && toast.error(error);
    },[error])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(title && desc && tags){
            const updatedMemeData = {...memeData, name: user?.result?.name};

            //check user updating or adding a new tour
            if(!id){
              dispatch(createMeme({updatedMemeData, navigate, toast}));
            }else{
              dispatch(updateMeme({id, updatedMemeData, navigate, toast}))
            }
            handleClear();
        }
    }

    const onInputChange = (e)=>{
        const {name, value} = e.target;

        setMemeData({...memeData, [name]: value});
    }

    const handleClear = () =>{
        setMemeData({...memeData, title:"", desc:"", tags:[]})
    }

    const handleAddTag = (tag)=>{
        setMemeData({...memeData, tags:[...memeData.tags, tag]})
    }
    const handleDeleteTag = (dtag)=>{
        setMemeData({
            ...memeData,
            tags:memeData.tags.filter((tag) => tag !== dtag),
          });
    }
  return (
    <>
    <div className="homeBg addeditBg" style={{width:"100%", height:"100vh",background: `url(${bg2})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
    <div style={{margin: "auto",
    padding: "15px",
    maxWidth: "100%",
    height:"100vh",
    alignContent: "center",
    paddingTop: "120px",
    }} className="container addEditBack"> 

        <MDBCard alignment="center" style={{width:"450px", margin:"auto", background:"black", padding:"6px", boxShadow:"2px 2px 6px 0.7px grey"}}>
            <h5 style={
              {
                fontWeight:'bold', letterSpacing:'1px',
                color:"whitesmoke",
               
              }
            }>{id ? "Update Meme" : "Post Meme"}</h5>
            <MDBCardBody>
            <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                <div className="col-md-12">

                    <input
                    placeholder="Enter Title"
                    type="text"
                    // label="First Name"
                    value={title || ""}
                    name="title"
                    onChange={onInputChange}
                    className="form-control"
                    required
                    invalid
                    validation="Please provide title"
                    style={{backgroundColor:"black"}}
                    />
                </div>

                <div className="col-md-12">
              <input
                placeholder="Enter Caption"
                type="text"
                value={desc || ""}
                name="desc"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
                style={{backgroundColor:"black", color:"grey"}}
              />
            </div>

            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
                style={{backgroundColor:"black", color:"grey",border:"1px", borderStyle:"solid", borderColor:"grey", borderRadius:"4px", outline:"none",}}
              />
              {/* {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>} */}
            </div>

            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setMemeData({ ...memeData, imageFile: base64 })
                }
              />
            </div>


            <div className="col-12">
              <MDBBtn style={{ width: "100%",backgroundColor:"yellow", color:"#1e1e1e", fontWeight:"bolder", fontSize:"14px", letterSpacing:"1.5px" }}>
                {id ? "Update" :"Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" , backgroundColor:"white", color:"#1e1e1e", fontWeight:"bolder", fontSize:"14px", letterSpacing:"1.5px"}}
                className="mt-2"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
            </MDBValidation>
            </MDBCardBody>
        </MDBCard>

    </div>
    </div>
    <Footer/>
    </>
  )
}

export default AddEditMeme