import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../Api";


export const createMeme = createAsyncThunk(
    "meme/createMeme",
    async ({ updatedMemeData, navigate, toast }, { rejectWithValue }) => {
      try {
        const response = await api.createMeme(updatedMemeData);
        toast.success("Posted Successfully");
        navigate("/");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data); //this will get the message which we specified in login controller when error occures
      }
    }
  );
  
  export const getMemes = createAsyncThunk(
    "meme/getMemes",
    async ( _, { rejectWithValue }) => {
      try {
        const response = await api.getMemes();
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data); //this will get the message which we specified in login controller when error occures
      }
    }
  );

  export const getMeme = createAsyncThunk(
    "meme/getMeme",
    async ( id, { rejectWithValue }) => {
      try {
        const response = await api.getMeme(id);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data); //this will get the message which we specified in login controller when error occures
      }
    }
  );


  export const getMemesByUser = createAsyncThunk(
    "meme/getMemesByUser",
    async ( userId, { rejectWithValue }) => {
      try {
        const response = await api.getMemesByUser(userId);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data); //this will get the message which we specified in login controller when error occures
      }
    }
  );

  export const deleteMeme = createAsyncThunk(
    "meme/deleteMeme",
    async ( {id, toast}, { rejectWithValue }) => {
      try {
        const response = await api.deleteMeme(id);
        toast.success("Meme Deleted Successfully!")
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data); //this will get the message which we specified in login controller when error occures
      }
    }
  );

  export const updateMeme = createAsyncThunk(
    "meme/updateMeme",
    async ( {id,updatedMemeData,  toast, navigate}, { rejectWithValue }) => {
      try {
        const response = await api.updateMeme(updatedMemeData,id);
        toast.success("Meme Updated Successfully!")
        navigate('/')
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data); //this will get the message which we specified in login controller when error occures
      }
    }
  );


  export const searchMemes = createAsyncThunk(
    "meme/searchMemes",
    async ( searchQuery, { rejectWithValue }) => {
      try {
        const response = await api.getMemesBySearch(searchQuery);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data); //this will get the message which we specified in login controller when error occures
      }
    }
  );

  export const getMemesByTag = createAsyncThunk(
    "meme/getMemesByTag",
    async ( tag, { rejectWithValue }) => {
      try {
        const response = await api.getTagMemes(tag);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data); //this will get the message which we specified in login controller when error occures
      }
    }
  );

  export const getRelatedMemes = createAsyncThunk(
    "meme/getRelatedMemes",
    async ( tags, { rejectWithValue }) => {
      try {
        const response = await api.getRelatedMemes(tags);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data); //this will get the message which we specified in login controller when error occures
      }
    }
  );

  export const likeMeme = createAsyncThunk(
    "meme/likeMeme",
    async ( {_id}, { rejectWithValue }) => {
      try {
        const response = await api.likeMeme(_id);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data); //this will get the message which we specified in login controller when error occures
      }
    }
  );

  const memeSlice = createSlice({
    name: "meme",
    initialState: {
      meme: {},
      memes:[],
      tagMemes:[],
      relatedMemes:[],
      userMemes:[],
      error: "",
      loading: false,
    },
    
    extraReducers: {
      [createMeme.pending]: (state, action) => {
        state.loading = true;
      },
      [createMeme.fulfilled]: (state, action) => {
        state.loading = false;
        state.memes = [action.payload];
      },
      [createMeme.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [getMemes.pending]: (state, action) => {
        state.loading = true;
      },
      [getMemes.fulfilled]: (state, action) => {
        state.loading = false;
        state.memes = action.payload;
      },
      [getMemes.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [getMeme.pending]: (state, action) => {
        state.loading = true;
      },
      [getMeme.fulfilled]: (state, action) => {
        state.loading = false;
        state.meme = action.payload;
      },
      [getMeme.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [getMemesByUser.pending]: (state, action) => {
        state.loading = true;
      },
      [getMemesByUser.fulfilled]: (state, action) => {
        state.loading = false;
        state.userMemes = action.payload;
      },
      [getMemesByUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [deleteMeme.pending]: (state, action) => {
        state.loading = true;
      },
      [deleteMeme.fulfilled]: (state, action) => {
        state.loading = false;
        // state.userMemes = action.payload;
        console.log('action', action)
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userMemes = state.userMemes.filter((item) => item._id !== id);
          state.memes = state.memes.filter((item) => item._id !== id);
        }
      },
      [deleteMeme.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [updateMeme.pending]: (state, action) => {
        state.loading = true;
      },
      [updateMeme.fulfilled]: (state, action) => {
        state.loading = false;
        // state.userMemes = action.payload;
        console.log('action', action)
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userMemes = state.userMemes.map((item) => item._id === id ? action.payload : item);
          state.memes = state.memes.map((item) => item._id === id ? action.payload : item);
        }
      },
      [updateMeme.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [searchMemes.pending]: (state, action) => {
        state.loading = true;
      },
      [searchMemes.fulfilled]: (state, action) => {
        state.loading = false;
        state.memes = action.payload;
      },
      [searchMemes.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [getMemesByTag.pending]: (state, action) => {
        state.loading = true;
      },
      [getMemesByTag.fulfilled]: (state, action) => {
        state.loading = false;
        state.tagMemes = action.payload;
      },
      [getMemesByTag.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [getRelatedMemes.pending]: (state, action) => {
        state.loading = true;
      },
      [getRelatedMemes.fulfilled]: (state, action) => {
        state.loading = false;
        state.relatedMemes = action.payload;
      },
      [getRelatedMemes.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [likeMeme.pending]: (state, action) => {},
      [updateMeme.fulfilled]: (state, action) => {
        state.loading = false;
        // state.userMemes = action.payload;
        console.log('action', action)
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.memes = state.memes.map((item) => item._id === _id ? action.payload : item);
        }
      },
      [updateMeme.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
    },
  });


  export default memeSlice.reducer;