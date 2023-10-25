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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useMemo } from "react";
import { SnackBarMessageAction } from "../../store/commonSlice/commonSlice";

import Alerts from "../common/Alerts";
import voucherCodeServices from "../../services/voucherCode.services/voucherCode.services";
import { useRef } from "react";

export default function UpdateVoucherCode({ voucherCode }) {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const [defaultValue, setDefault] = useState(voucherCode);
  const buttonRef = useRef(null);

  //validation  using yup
  const schema = yup
    .object({
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
    formState: { errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValue,
  });


 // Function to handle form submission
  const onSubmit = async (value) => {
    buttonRef.current.disabled = true;
    const updateData = {
      id: voucherCode?.id,
      voucherCodeName: voucherCode?.voucherCodeName,
      percentage: value.percentage,
      expiryDate: value.expiryDate,
    };
    console.log(updateData);
    try {
      await mutation.mutateAsync(updateData);
      setDefault(updateData);
    } catch (error) {
      console.error(error);
    }
  };


// Function to control the dialog's open and close state
  const onModalState = (state) => {
    setIsModal(state);
    setErrorMessage(null);
    !state && reset(defaultValue);
  };

 // Updating data using React Query
  const mutation = useMutation(voucherCodeServices.updateVoucherCodeService, {
    onSuccess: () => {
      setIsModal(false);
      dispatch(SnackBarMessageAction("Voucher code updated Successfully"));
      queryClient.invalidateQueries("voucherCode");
    },
    onError: (error) => {
      const responce = error;
      console.error(responce.message);
      setErrorMessage("network Error");
    },
  });

  return (
    <>
      <EditOutlinedIcon
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => onModalState(true)}
      />
      <Dialog className="dialog" open={isModal}>
        <div className="dialog-top">
          <DialogTitle className="dialog-title">
            Update voucher code
          </DialogTitle>
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
                disabled
              />

              <TextField
                // value={defaultDate}
                label="Percentage"
                fullWidth
                type="number"
                {...register("percentage")}
              />
              {errors.percentage && (
                <p className="error-message">{errors.percentage.message}</p>
              )}
              <TextField
                // onChange={(date) => setDefaultDate(date.target.value)}
                type="datetime-local"
                fullWidth
                {...register("expiryDate")}
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
                  Update
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
