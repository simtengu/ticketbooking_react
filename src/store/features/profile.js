import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicApi, secureApi } from "../../api";
import { activateFeedback, activateLoading, deActivateLoading } from "./errorAndFeedback";


export const fetchTickets = createAsyncThunk("profile/fetchTickets", async (filterString, thunkApi) => {

    try {
        const rs = await publicApi.get(`/tickets?${filterString}`);
        const rsData = rs.data;
        let tickets = rsData.tickets
        let count = rsData.count
        return { tickets, count };
    } catch (error) {
        return thunkApi.rejectWithValue('something went wrong ....')
    }

})

export const fetchDashboardDetails = createAsyncThunk("profile/dashboardDetailsFetch", async () => {


    const rs = await secureApi.get("/admin/dashboard/details");
    const rsData = rs.data;
    const ticketsCount = rsData.tickets
    const todayTickets = rsData.todayTickets
    const usersCount = rsData.users
    const messagesCount = rsData.messages
    const busesCount = rsData.buses
    const regionsCount = rsData.regions
    const totalIncome = rsData.income

    return { dashboardCounts:{ticketsCount, usersCount, totalIncome, messagesCount, busesCount, regionsCount} , todayTickets };


})

const initialState = {
    dashboardCounts: { ticketsCount: 0, usersCount: 0, messagesCount: 0, busesCount: 0, regionsCount: 0, totalIncome: 0 },
    users: [],
    selectedUser: "",
    messages: [],
    regions: [],
    routes: [],
    buses: [],
    tickets: [],
    ticketsCount: 0
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addBus: (state, action) => {
            state.buses.push(action.payload)
        },
        addFetchedBuses: (state, action) => {
            state.buses = action.payload
        },
        addUsers: (state, action) => {
            state.users = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload.user
        },
        removeUser: (state,action)=>{
         state.users = state.users.filter(user=> user._id !== action.payload.user_id)
        },
        unSetSelectedUser: (state) => {
            state.selectedUser = ""
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

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTickets.fulfilled, (state, action) => {
            state.tickets = action.payload.tickets
            state.ticketsCount = action.payload.count
        })
        builder.addCase(fetchTickets.rejected, (state, action) => {
            state.tickets = []
            state.ticketsCount = 0
        })

        builder.addCase(fetchDashboardDetails.fulfilled, (state, action) => {
            state.dashboardCounts = action.payload.dashboardCounts
            state.tickets = action.payload.todayTickets
        })

        builder.addCase(fetchDashboardDetails.rejected, (state, action) => {
            state.dashboardCounts = {}

        })

    }
})


export const { addBus, addFetchedBuses, addUsers, setSelectedUser, unSetSelectedUser,removeUser, addRegion, updateRegion, removeRegion, setRegions, addRoute, updateRoute, removeRoute, setRoutes } = profileSlice.actions


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

export const deleteUser = (user_id) => async (dispatch) => {

        const rs = await secureApi.delete(`/admin/user/${user_id}`);
    
        if (rs.statusText === "OK") {
            dispatch(removeUser({user_id}))
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
export const fetchRegionRoutes = (from) => async (dispatch) => {
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

export const registerRoute = (routeInfo) => async (dispatch) => {
    
        const rs = await publicApi.post(`/admin/routes`, routeInfo);

        if (rs.status === 201) {
            dispatch(addRoute(rs.data.route))
        }
       
        dispatch(activateFeedback({ status: "success", message: "You have added a new route successfully" }))

}

export const editRoute = (routeInfo) => async (dispatch) => {
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

export const deleteRoute = (routeId) => async (dispatch) => {
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


//bus action creators.......................................................... 
export const registerBus = (busInfo) => async (dispatch) => {

    const rs = await secureApi.post('/admin/register_bus', busInfo)
    const rsData = rs.data
    dispatch(addBus(rsData.new_bus))

}

export const fetchBuses = () => async (dispatch) => {
    try {
        const rs = await secureApi.get('/admin/buses')
        const rsData = rs.data
        dispatch(addFetchedBuses(rsData.buses))

    } catch (error) {
        console.log(error)
    }
}

export const updateBus = (data) => async (dispatch, getState) => {
    let { profile: { buses } } = getState()
    console.log("bus_picture", data.bus_picture)

    if (data.bus_picture) {
        console.log("bus_picture provided")
        //if bus_picture...we are just updating bus pic field locally
        buses = buses.map(bus => {
            if (bus._id === data.busId) return { ...bus, busPicture: data.bus_picture }
            return bus
        })

    } else {
        console.log("bus_picture not provided")

        const rs = await secureApi.patch(`/admin/bus/update/${data.busId}`, data.busInfo)
        const rsData = rs.data
        buses = buses.map(bus => {
            if (bus._id === data.busId) return rsData.bus
            return bus
        })

    }
    dispatch(addFetchedBuses(buses))

}

export const deleteBus = (busId) => async (dispatch, getState) => {
    let { profile: { buses } } = getState()

    const rs = await secureApi.delete(`/admin/bus/delete/${busId}`)
    if (rs.statusText !== "OK") {

        dispatch(
            activateFeedback({
                status: "error",
                message: "Something went wrong ..couldn't delete a buss",
            })
        );
        return;
    }
    buses = buses.filter(bus => bus._id !== busId
    )
    dispatch(addFetchedBuses(buses))

}



export default profileSlice.reducer