// it should have a 2 input with label first name and last name
import { Button, Snackbar, Typography } from "@mui/material";
import { useFormikContext } from "formik";

import { useNavigate } from "react-router";
import MyCalendar from "../components/MyDateRangePicker";
import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import convertToFixedDate from "../utils";
import parseDate from "../utils";
import { format } from "date-fns";

const DateRangeComponent = ({ formik }) => {
  const { values, setFieldValue } = useFormikContext();
  const [date, setDate] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState([]);
  const [errMessage, setErrMessage] = useState({
    open: false,
    msg: "",
  });
  console.log("values ", values);
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate("/model");
  };

  const handleDateChange = (e) => {
    console.log("sdfds e", e);
    setDate(e);
  };

  const fetchVehicleTypes = async () => {
    try {
      let data = await axiosInstance.get("/booking" + `/${values.model}`);
      console.log("data ", data?.data ?? []);
      setBlockedDates(
        (data?.data ?? []).map((item) => ({
          start: parseDate(item?.from),
          end: parseDate(item?.to),
        })) ?? []
      );
    } catch (err) {
      console.log("err ", err.message);
      setErrMessage({ open: true, msg: err?.message });
    }
  };

  const handleClose = () => {
    setErrMessage({ open: false, msg: "" });
  };

  const handleSubmit = async () => {
    if (date?.length == 0) {
    setErrMessage({ open: true, msg: "date range is required" });
    return;
    }
    try {
      let dataToSend = {
        firstName: values.firstName,
        lastName: values.lastName,
        vehicleID: values.model,
        from: format(date?.[0], "yyyy-MM-dd"),
        to: format(date?.[1], "yyyy-MM-dd"),
      };
      let data = await axiosInstance.post("/booking", dataToSend);
    setErrMessage({ open: true, msg: "Booking Successfull" });
      console.log("data ", data?.data ?? []);
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
        <Typography variant="h5">Vehicle rent days</Typography>
        <MyCalendar blockedRanges={blockedDates} date={date} setDate={handleDateChange} key={blockedDates?.length} />
        <div>
          <Button variant="contained" style={{ marginRight: "5.5rem" }} onClick={handlePrev}>
            Prev
          </Button>
          <Button variant="contained" style={{}} onClick={handleSubmit}>
            Submit
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

export default DateRangeComponent;
