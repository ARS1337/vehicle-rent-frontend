import { Outlet } from "react-router";
import "./App.css";
import { Formik } from "formik";

function App() {
  return (
    <>
      <Formik
        initialValues={{ firstName: "", lastName: "", wheels: 2, type: "", model: "", vehiceId: "", dateRange: "" }}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
        }}
      >
        <Outlet />
      </Formik>
    </>
  );
}

export default App;
