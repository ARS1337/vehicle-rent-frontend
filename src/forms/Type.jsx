import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../axios";
import Snackbar from "@mui/material/Snackbar";

const Type = ({ formik }) => {
  const { values, setFieldValue } = useFormikContext();
  const [types, setTypes] = useState([]);
  const [errMessage, setErrMessage] = useState({
    open: false,
    msg: "",
  });
  console.log("values ", values);

  const navigate = useNavigate();

  const handleNext = () => {
    if (values.type?.length != 0) {
      navigate("/model");
    } else {
      setErrMessage({
        open: true,
        msg: "type is required",
      });
    }
  };

  const handlePrev = () => {
    navigate("/wheels");
  };

  const handleTypeChange = (e) => {
    setFieldValue("type", e.target.value);
  };

  const handleClose = () => {
    setErrMessage({ open: false, msg: "" });
  };

  const fetchVehicleTypes = async () => {
    try {
      let data = await axiosInstance.get("/vehicle-type", { params: { wheels: values.wheels } });
      console.log("data ", data?.data ?? []);
      setTypes(data?.data ?? []);
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
        <Typography variant="h5">Type of Vehicle?</Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values?.type}
          label="Age"
          onChange={handleTypeChange}
          sx={{minWidth:"320px"}}
        >
          {types.map((item) => {
            return <MenuItem value={item?.name}>{item?.name}</MenuItem>;
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

export default Type;
