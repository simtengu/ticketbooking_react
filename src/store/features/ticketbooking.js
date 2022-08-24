import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicApi } from "../../api";


export const fetchRouteAndTakenTickets = createAsyncThunk("ticketbooking/fetchRoute", async (routeInfo, thunkApi) => {

    const { fromRegion, toRegion } = routeInfo
    let route = {}
    let tickets = []
    const { booking: { departingDate: dptDate}} = thunkApi.getState()
    let date = new Date(dptDate)

    try {
        const result = Promise.all([publicApi.get(
            `/tickets/route?fromRegion=${fromRegion}&toRegion=${toRegion}`
        ), publicApi.get(
            `/tickets?fromRegion=${fromRegion}&toRegion=${toRegion}&departingDate=${date.getTime()}`
        )])

        await result.then(rsData => {
            route = rsData[0].data.route;
            tickets = rsData[1].data.tickets;

        })

        return { route, tickets }
    } catch (error) {
        const error_message = error.response ? error.response.data.message : error.message;
        return thunkApi.rejectWithValue(error_message)
    }
})

const initialState = {
    routeInfo: { from: "", to: "", routeMap: "", perDayRounds: [] },
    price: 0,
    busType: "",
    distance: "",
    departingDate: new Date().toISOString(),
    round: "",
    takenTicketsByRound: {
        roundOneTickets: [],
        roundTwoTickets: []
    },
    takenTickets: [],
    selectedTickets: [],
    passengerBookedTickets: []
}
const ticketBookingSlice = createSlice({
    name: "ticketbooking",
    initialState,
    reducers: {
        setFrom: (state, action) => {
            state.routeInfo = { ...state.routeInfo, from: action.payload }
        },
        setTo: (state, action) => {
            state.routeInfo = { ...state.routeInfo, to: action.payload }
        },
        updateDepartingDate: (state, action) => {
            state.departingDate = action.payload
        },
        setBusType: (state, action) => {
            state.busType = action.payload
        },
        setRound: (state, action) => {
            state.round = action.payload
        },
        setTakenTickets: (state, action) => {
            state.takenTickets = action.payload
        },
        updateSelectedTickets: (state, action) => {
            state.selectedTickets = action.payload
        },
        setBookedTickets: (state, action) => {
            state.passengerBookedTickets = action.payload.bookedTickets
            state.takenTickets = action.payload.takenTickets
            state.selectedTickets = []
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchRouteAndTakenTickets.fulfilled, (state, action) => {
            let { route, tickets } = action.payload
            //formating perday rounds..................... 
            let rounds = route.perDayRounds.map(round => {
                return { round: `${round.title} (${round.time})`, busType: round.busType }
            })

            rounds.sort((a, b) => {
                let x = a.round.toLowerCase()
                let y = b.round.toLowerCase()
                if (x < y) return -1;
                if (x > y) return 1;
                return 0;

            })

            state.routeInfo = { from: route.from, to: route.to, routeMap: route.routeMap, perDayRounds: rounds }
            state.round = rounds[0].round
            //arranging taken tickets by round-category............
            //chacking if there wasn't any taken tickets.......
            if (tickets.length < 1) {
                state.takenTicketsByRound = {
                    roundOneTickets: [],
                    roundTwoTickets: []
                }
                state.takenTickets = []
            } else {
                
                let roundOneTakenTickets = tickets.filter(ticket => ticket.round === "1st round (06:00am)")
                let roundTwoTakenTickets = tickets.filter(ticket => ticket.round !== "1st round (06:00am)")
                
                //assigning taken tickets depending on initial round set.
                const tknTickets = rounds[0].round === "1st round (06:00am)" ? roundOneTakenTickets : roundTwoTakenTickets
                
                state.takenTicketsByRound = {
                    roundOneTickets: roundOneTakenTickets,
                    roundTwoTickets: roundTwoTakenTickets
                }
                state.takenTickets = tknTickets

            }

            state.passengerBookedTickets = []
            state.selectedTickets = []
            state.distance = route.distance
            state.price = route.price
            state.busType = rounds[0].busType
        })
        builder.addCase(fetchRouteAndTakenTickets.rejected, (state) => {
            state.routeInfo = undefined
        })
    }

})

export const { setFrom, setTo, setBusType, setRound, updateDepartingDate, setTakenTickets, updateSelectedTickets, setBookedTickets } = ticketBookingSlice.actions


export const bookingTicket = () => async (dispatch, getState) => {

    const { booking } = getState();
    let {
        routeInfo: { from, to },
        price,
        busType,
        departingDate,
        round, selectedTickets
    } = booking


    selectedTickets = selectedTickets.map(ticket => {
        let owner = { name: `${ticket.firstName} ${ticket.lastName}`, gender: ticket.gender, phone: ticket.phone }
        return { owner, from, to, price, busType, departingDate, round, ticketNumber: ticket.ticketNumber }
    })

    const data = { tickets: selectedTickets }
    const rs = await publicApi.post("/tickets", data);
    const rsData = rs.data;
    if (rs.status === 201) {
        const bookedTickets = rsData.tickets;
        const takenTickets = selectedTickets.map(ticket => ticket.ticketNumber)
        dispatch(setBookedTickets({ bookedTickets, takenTickets }))
    }

}


export default ticketBookingSlice.reducer