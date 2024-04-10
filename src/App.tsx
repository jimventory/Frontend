import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import BusinessRegistration from "./pages/BusinessRegistration";
import Landing from "./pages/Landing";
import Inventory from "./pages/Inventory";
import LoginRedirect from "./pages/LoginRedirect";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="pageContainer">
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/register" Component={BusinessRegistration} />
          <Route path="/about" Component={About} />
          <Route path="/inventory" Component={Inventory} />
          <Route path="/loginredirect" Component={LoginRedirect} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
