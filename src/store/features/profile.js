import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicApi } from "../../api";
import { activateFeedback, activateLoading, deActivateLoading } from "./errorAndFeedback";


const initialState = {
    users: [],
    messages: [],
    buses: [],
    regions: [],
    routes: []
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
        setRegions: (state, action) => {
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
        , setRoutes: (state, action) => {
            state.routes = action.payload
        },
        addRoute: (state, action) => {
            state.routes.push(action.payload)
        },
        updateRoute: (state, action) => {
            let routeIndex = state.routes.findIndex(route => route._id === action.payload.route_id)
            state.routes[routeIndex] = action.payload.updatedRoute
        },
        removeRoute: (state, action) => {
            state.routes = state.routes.filter(route => route._id !== action.payload)
        }

    }
})


export const { addBus, addUsers, addRegion, updateRegion, removeRegion, setRegions, addRoute, updateRoute, removeRoute, setRoutes } = profileSlice.actions


//users action creators...................................................
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

// end of users action creators...................................................

// regions action creators...................................................

export const fetchRegions = () => async (dispatch, getState) => {
    try {

        dispatch(activateLoading())
        const rs = await publicApi.get("/regions");
        const rsData = rs.data;
        let regions = rsData.regions.map(region => region.name)
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

        const rs = await publicApi.post(`/admin/regions`, { name: region });

        if (rs.status === 201) {
            dispatch(addRegion(region))
        }

    } catch (error) {

        const error_message = error.response ? error.response.data.message : error.message
        dispatch(activateFeedback({ status: "error", message: error_message }))
        console.log(error_message)
    }
}

export const editRegion = (regionInfo) => async (dispatch, getState) => {
    try {

        const rs = await publicApi.patch(`/admin/region/${regionInfo.prevRegion}`, { name: regionInfo.updatedRegion });

        if (rs.status === 200) {
            dispatch(updateRegion(regionInfo))
        }

    } catch (error) {
        const error_message = error.response ? error.response.data.message : error.message
        dispatch(activateFeedback({ status: "error", message: error_message }))
        console.log(error_message)
    }
}

export const deleteRegion = (region) => async (dispatch, getState) => {
    try {

        const rs = await publicApi.delete(`/admin/region/${region}`);

        if (rs.status === 200) {
            dispatch(removeRegion(region))
        }

    } catch (error) {
        const error_message = error.response ? error.response.data.message : error.message
        dispatch(activateFeedback({ status: "error", message: error_message }))
        console.log(error_message)
    }
}

//end of region action creators...................................................


// regions action creators...................................................
//fetch all routes...
export const fetchRoutes = () => async (dispatch, getState) => {
    try {

     
        const rs = await publicApi.get("/admin/routes");
        const rsData = rs.data;
      
        if (rs.status === 200) {
            dispatch(setRoutes(rsData.routes))
        }

    } catch (error) {
       
        console.log("something went wrong")
    }
}

//fetch region routes.....
export const fetchRegionRoutes = (from) => async (dispatch, getState) => {
    try {
 

        const rs = await publicApi.get(`/admin/routes?from=${from}`);
        const rsData = rs.data;

        if (rs.status === 200) {
            dispatch(setRoutes(rsData.routes))
        }

    } catch (error) {

        console.log("something went wrong")
    }
}

export const registerRoute = (routeInfo) => async (dispatch, getState) => {
    try {

        dispatch(activateLoading())
        const rs = await publicApi.post(`/admin/routes`, routeInfo);
        
        if (rs.status === 201) {
            dispatch(addRoute(rs.data.route))
        }
        dispatch(deActivateLoading())
        dispatch(activateFeedback({ status: "success", message: "You have added a new route successfully" }))
        
    } catch (error) {
        
        const error_message = error.response ? error.response.data.message : error.message
        dispatch(activateFeedback({ status: "error", message: error_message }))
        dispatch(deActivateLoading())
        console.log(error_message)
    }
}

export const editRoute = (routeInfo) => async (dispatch, getState) => {
    try {
        
      
        const rs = await publicApi.patch(`/admin/route/${routeInfo.route_id}`, routeInfo.updatedRoute);
        
        if (rs.status === 200) {
            dispatch(updateRoute(routeInfo))
        }
        
        
    } catch (error) {
        const error_message = error.response ? error.response.data.message : error.message
        dispatch(activateFeedback({ status: "error", message: error_message }))
       

        console.log(error_message)
    }
}

export const deleteRoute = (routeId) => async (dispatch, getState) => {
    try {
        
       
        const rs = await publicApi.delete(`/admin/route/${routeId}`);
        
        if (rs.status === 200) {
            dispatch(removeRoute(routeId))
        }
      
        
    } catch (error) {
        const error_message = error.response ? error.response.data.message : error.message
        dispatch(activateFeedback({ status: "error", message: error_message }))
        
        console.log(error_message)
    }
}

//end of region action creators...................................................


export default profileSlice.reducer