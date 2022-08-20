import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from "./features/errorAndFeedback";
import authReducer from "./features/auth";
import profileReducer from "./features/profile"
import ticketbookingReducer from "./features/ticketbooking"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback:feedbackReducer,
    profile:profileReducer,
    booking: ticketbookingReducer
  },
});
