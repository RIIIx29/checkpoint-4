import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
// import Admin from "./components/Admin/Admin";
import Resume from "./components/Resume/ResumeNew";
// import Login from "./components/Login";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);
  // const [user, setUser] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          {/*           <Route path="/Login" element={<Login />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
          {/*           {!user && <Route path="/login" element={<Login />} />}
          {(user && user?.role === "ADMIN")(
            <Route path="/admin" element={<Admin />} />
          )} */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
