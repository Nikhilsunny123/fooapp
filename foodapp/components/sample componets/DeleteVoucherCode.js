import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { SnackBarMessageAction } from "../../store/commonSlice/commonSlice";

import { useState } from "react";
import voucherCodeServices from "../../services/voucherCode.services/voucherCode.services";
import { useRef } from "react";


// Transition component for the dialog animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteVoucherCode({ voucherCode}) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const buttonRef = useRef(null);

   // Define a mutation for deleting using react-query
  const deleteMutation = useMutation(voucherCodeServices.deleteVoucherCodeService, {
    onSuccess: () => {
      queryClient.invalidateQueries("voucherCode");
      dispatch(SnackBarMessageAction("voucherCode Deleted Successfully"));
    },
    onError: (error) => {
      const responce = error;
      dispatch(SnackBarMessageAction("Delete Failed"));
      console.error(responce.message);
    },
  });

  // Handle the delete action
  const handleDelete = (data) => {
    buttonRef.current.disabled = true;
    deleteMutation.mutate(data);
  };
  const [open, setOpen] = useState(false);

  // Function to handle opening and closing the dialog
  const handleClick = (value) => {
    setOpen(value);
  };

  return (
    <div>
      <DeleteIcon style={{ cursor: "pointer" }} onClick={()=>handleClick(true)} />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClick={()=>handleClick(false)}
        className="deletebox"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="headName">Are you sure?</DialogTitle>
        <DialogContent className="deleteContent">
          <DialogContentText className="headName">
            You are about to delete {voucherCode.voucherCodeName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="delete-buttons"   onClick={()=>handleClick(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              handleDelete(voucherCode.id);
            }}
            className="delete-buttons"
            ref={buttonRef}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
