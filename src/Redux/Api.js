import axios from 'axios';
import config from '../Utils/config';

const API = axios.create({baseURL:`${config?.backendUrl}`});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

  
export const signIn = (formData)=> API.post("/users/signin",formData)

export const signUp = (formData)=> API.post("/users/signup",formData)

export const googleSignIn = (result)=>API.post("/users/googleSignIn", result);



export const createMeme =  (memeData)=> API.post("/meme", memeData)
export const getMemes = () => API.get("/meme");
export const getMeme = (id) => API.get(`/meme/${id}`);
export const deleteMeme = (id) => API.delete(`/meme/${id}`);
export const updateMeme = (updatedMemeData,id) => API.patch(`/meme/${id}`, updatedMemeData);
export const getMemesByUser = (userId) => API.get(`/meme/userMemes/${userId}`);    ///user id not meme id

export const getMemesBySearch = (searchQuery)=> API.get(`/meme/search?searchQuery=${searchQuery}`)
export const getTagMemes = (tag) => API.get(`/meme/tag/${tag}`);
export const getRelatedMemes = (tags) => API.post('/meme/relatedMemes', tags);
export const likeMeme = (id)=>API.patch(`/meme/like/${id}`)
