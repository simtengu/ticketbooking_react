import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from "./features/errorAndFeedback";
import authReducer from "./features/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback:feedbackReducer
  },
});
