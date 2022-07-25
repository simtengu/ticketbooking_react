import { Close } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/features/errorAndFeedback";
const Modal = ({ children, columnSize, contentAlignment }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Box
        onClick={() => dispatch(closeModal())}
        className="modalContainer"
        sx={{ width: "100vw", height: "100vh" }}
      >
        <Grid container justifyContent="center" alignItems={contentAlignment}>
          <Grid item xs={12}>
            <IconButton
              className="bg-secondary"
              sx={{
                float: "right",
                mr: 3,
                mt: 1,
                color: "black",
                p: 4,
                transform: "translate(37px,-24px)",
                boxShadow: "1px 1px 10px #344041",
              }}
              onClick={() => dispatch(closeModal())}
            >
              <Close />
            </IconButton>
          </Grid>
          <Grid item xs={11} sm={10} md={columnSize.md} lg={columnSize.lg}>
            <Box onClick={(e) => e.stopPropagation()}>{children}</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Modal;
