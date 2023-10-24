import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SnackBarMessageAction } from "../../store/commonSlice/commonSlice";

import Alerts from "../common/Alerts";
import voucherCodeServices from "../../services/voucherCode.services/voucherCode.services";
import { useRef } from "react";

export default function AddVoucherCode() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const buttonRef = useRef(null);

  //validation using yup
  const schema = yup
    .object({
      voucherCodeName: yup.string().required("Voucher code name is required"),
      percentage: yup
        .number()
        .min(1)
        .max(100)
        .required("Percentage  is required")
        .typeError("Percentage must be a valid number"),
      expiryDate: yup.string().required("Expiry date is required"),
    })
    .required();

 // Set up the form using react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (value) => {
    buttonRef.current.disabled = true;
    mutation.mutate(value);
    console.log(value);
  };
// Handle the modal's open/close state
  const onModalState = (state) => {
    setIsModal(state);
    reset();
    setErrorMessage(null);
  };

  //adding voucherCode using react query
  const mutation = useMutation(voucherCodeServices.createVoucherCodeService, {
    onSuccess: (data) => {
      console.log("Item changed successfully:", data);
      onModalState(false);
      dispatch(SnackBarMessageAction("Voucher code added Successfully"));
      queryClient.invalidateQueries("voucherCode");
    },
    onError: (error) => {
      const responce = error;
      console.error(responce.message);
      if (responce?.response?.status === 500) {
        setErrorMessage(responce?.response?.data.message);
      } else {
        console.log(error);
        setErrorMessage("network Error");
      }
    },
  });

  return (
    <>
      <Button
        className="common-button-style"
        onClick={() => onModalState(true)}
      >
        Add Voucher code
      </Button>
      <Dialog className="dialog" open={isModal}>
        <div className="dialog-top">
          <DialogTitle className="dialog-title">New voucher code</DialogTitle>
          <CloseIcon
            className="close-icon"
            onClick={() => onModalState(false)}
          />
        </div>
        <Divider light />
        <DialogContent>
          <div className="form-container">
            {mutation.isError && errorMessage ? (
              <Alerts name={errorMessage} />
            ) : (
              ""
            )}
            <form className="main-form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Voucher code name"
                fullWidth
                {...register("voucherCodeName")}
              />
              {errors.voucherCodeName && (
                <p className="error-message">
                  {errors.voucherCodeName.message}
                </p>
              )}
              <TextField
                label="Percentage"
                fullWidth
                {...register("percentage")}
              />
              {errors.percentage && (
                <p className="error-message">{errors.percentage.message}</p>
              )}
              <TextField
                // label="Expiry Date"
                type="datetime-local"
                fullWidth
                {...register("expiryDate", {
                  required: "Expiry date is required",
                })}
              />
              {errors.expiryDate && (
                <p className="error-message">{errors.expiryDate.message}</p>
              )}

              <div className="form-buttons">
                <Button
                  className="button-main"
                  variant="contained"
                  onClick={() => {
                    onModalState(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="medium"
                  variant="contained"
                  className="button-main"
                  ref={buttonRef}
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
