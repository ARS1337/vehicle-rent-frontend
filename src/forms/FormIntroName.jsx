// it should have a 2 input with label first name and last name
import { Button, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";

const FormIntroName = ({ formik }) => {
  const { values, setFieldValue } = useFormikContext();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState({
    open: false,
    msg: "",
  });
  console.log("values ", values);

  const handleNext = () => {
    if (values.firstName?.length != 0 && values.lastName?.length != 0) {
      navigate("/wheels");
    } else {
      setErrMessage({
        open: true,
        msg: "firstName and lastName is required",
      });
    }
  };

  const handleClose = () => {
    setErrMessage({ open: false, msg: "" });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h5">First, what's your name?</Typography>
        <TextField
          value={values.firstName}
          onChange={(e) => {
            setFieldValue("firstName", e.target.value);
          }}
          placeholder="First Name"
          label="First Name"
        />
        <TextField
          value={values.lastName}
          onChange={(e) => {
            setFieldValue("lastName", e.target.value);
          }}
          placeholder="Last Name"
          label="Last Name"
        />
        <div>
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={errMessage.open}
        onClose={handleClose}
        message={errMessage.msg}
      />
    </div>
  );
};

export default FormIntroName;
