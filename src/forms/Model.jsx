// it should have a 2 input with label first name and last name
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../axios";
import Snackbar from "@mui/material/Snackbar";

const Model = ({ formik }) => {
  const { values, setFieldValue } = useFormikContext();
  console.log("values ", values);
  const [errMessage, setErrMessage] = useState({
    open: false,
    msg: "",
  });
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  const handleNext = () => {
    if (values.model?.length != 0) {
      navigate("/date-range");
    } else {
      setErrMessage({
        open: true,
        msg: "type is required",
      });
    }
  };

  const handleClose = () => {
    setErrMessage({ open: false, msg: "" });
  };

  const handlePrev = () => {
    navigate("/type");
  };

  const handleTypeChange = (e) => {
    console.log("e",e)
    setFieldValue("model", e.target.value);
    // setFieldValue("vehicleId", e.target.value);
  };

  const fetchVehicleTypes = async () => {
    try {
      let data = await axiosInstance.get("/vehicle", { params: { type: values.type } });
      console.log("data ", data?.data ?? []);
      setModels(data?.data ?? []);
    } catch (err) {
      console.log("err ", err.message);
      setErrMessage({ open: true, msg: err?.message });
    }
  };

  useEffect(() => {
    fetchVehicleTypes();
  }, []);

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
        <Typography variant="h5">Model of Vehicle?</Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values.model}
          label="Model"
          onChange={handleTypeChange}
          sx={{ minWidth: "320px" }}
        >
          {models.map((item) => {
            return <MenuItem value={item?.id}>{item?.name}</MenuItem>;
          })}
        </Select>
        <div>
          <Button variant="contained" style={{ marginRight: "5rem" }} onClick={handlePrev}>
            Prev
          </Button>
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

export default Model;
