// it should have a 2 input with label first name and last name
import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import { useNavigate } from "react-router";
const Wheels = ({ formik }) => {
  const { values, setFieldValue } = useFormikContext();
  console.log("values ", values);

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/type");
  };

  const handlePrev = () => {
    navigate("/");
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
        <Typography variant="h5">ok, number of wheels?</Typography>
        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue={values.wheels} name="radio-buttons-group" 
        onChange={(e)=>setFieldValue("wheels",e.target.value)}>
          <FormControlLabel value={2} control={<Radio />} label={2} checked={values.wheels==2}/>
          <FormControlLabel value={4} control={<Radio />} label={4} checked={values.wheels==4} />
        </RadioGroup>
        <div>
          <Button variant="contained" style={{ marginRight: "5rem" }} onClick={handlePrev}>
            Prev
          </Button>
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wheels;
