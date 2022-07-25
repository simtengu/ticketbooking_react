import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicApi } from "../../api";
import { activateFeedback, activateLoading, deActivateLoading } from "./errorAndFeedback";


const initialState = {
    users: [],
    messages: [],
    buses: [],
    regions: []
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addBus: (state, action) => {
            state.buses = action.payload
        },
        addUsers: (state, action) => {
            state.users = action.payload
        },
        setRegions: (state,action)=>{
           state.regions = action.payload
        },
        addRegion: (state, action) => {
            state.regions.push(action.payload)
        },
        updateRegion: (state, action) => {
            let regionIndex = state.regions.findIndex(region => region === action.payload.prevRegion)
            state.regions[regionIndex] = action.payload.updatedRegion
        },
        removeRegion: (state, action) => {
            state.regions = state.regions.filter(region => region !== action.payload)
        }

    }
})


export const { addBus, addUsers,addRegion,updateRegion,removeRegion,setRegions } = profileSlice.actions

export const fetchUsers = () => async (dispatch, getState) => {

    try {
        dispatch(activateLoading())
        const rs = await publicApi.get("/admin/users");
        const rsData = rs.data;
        if (rs.status === 200) {
            dispatch(addUsers(rsData.users))
        }
        dispatch(deActivateLoading())

    } catch (error) {
        dispatch(deActivateLoading())
        const error_message = error.response ? error.response.data.message : error.message
        dispatch(activateFeedback({ status: "error", message: error_message }))
    }

}

export const searchUser = (searchKey) => async (dispatch, getState) => {

    try {

        const rs = await publicApi.get(`/admin/users/search?key=${searchKey}`);
        const rsData = rs.data;
        if (rs.status === 200) {
            dispatch(addUsers(rsData.users))
        }


    } catch (error) {
        console.log("sometn went wrong")
    }

}

export const fetchRegions  = ()=> async(dispatch,getState)=>{
    try {

        dispatch(activateLoading())
        const rs = await publicApi.get("/admin/regions");
        const rsData = rs.data;
        let regions = rsData.regions.map(region=>region.name)
        if (rs.status === 200) {
            dispatch(setRegions(regions))
        }
        dispatch(deActivateLoading())
    } catch (error) {
        dispatch(deActivateLoading())
         console.log("something went wrong")
    }
}

export const registerRegion = (region) => async (dispatch, getState) => {
    try {

        const rs = await publicApi.post(`/admin/regions`,{name:region});
    
        if (rs.status === 201) {
            dispatch(addRegion(region))
        }
       
    } catch (error) {
  
        console.log("something went wrong")
    }
}


export default profileSlice.reducer