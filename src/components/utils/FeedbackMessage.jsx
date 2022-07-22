import React from 'react';
import { Snackbar, Alert as MuiAlert, Slide } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { deActivateFeedback } from '../../store/features/errorAndFeedback';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}
const FeedbackMessage = () => {
  
 const dispatch = useDispatch()
   const {feedback} = useSelector(state => state.feedback)
    return (
      <>
        <Snackbar
          open={feedback.isActive}
          autoHideDuration={6000}
          onClose={()=>dispatch(deActivateFeedback())}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          TransitionComponent={TransitionUp}
        >
          <Alert
            onClose={()=>dispatch(deActivateFeedback())}
            severity={feedback.status}
            sx={{ width: "100%" }}
          >
            {feedback.message}
          </Alert>
        </Snackbar>
      </>
    );
}
 
export default FeedbackMessage;