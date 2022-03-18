import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/employee/Home";
import About from "./components/organization/About";
import Alert from "./components/Alert";
import { Login } from "./components/Login";
import { Signup } from "./components/organization/Signup";
import { useState } from "react";
import SignupHome from "./components/SignupHome";
import { SignupEmployee } from "./components/employee/SignupEmployee";
import { Notfound } from "./components/Notfound";
import HomeEmployer from "./components/organization/HomeEmployer";
import ViewProfile from "./components/organization/ViewProfile";
import Exercise from './components/employee/exercise/Exercise'
import Diet from './components/employee/diet/Diet'
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
      <Router>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <div>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/homeemployer" element={<HomeEmployer showAlert={showAlert} />} />
            <Route exact path="/about" element={<About showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signuphome" element={<SignupHome showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route exact path="/signupemployee" element={<SignupEmployee showAlert={showAlert} />} />
            <Route exact path="/viewProfile/:id" element={<ViewProfile showAlert={showAlert} />} />
            <Route exact path="/exercise" element={<Exercise showAlert={showAlert} />} />
            <Route exact path="/diet" element={<Diet showAlert={showAlert}/>} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
