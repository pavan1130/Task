import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./sidebar";
import Welcome from "./welcome";
import Tasktable from "./tasktable";
function Home() {
  return (
    <Router>
      <div className="App">
        <div className="">
          <div className="row">
            <div className="col-1">
              <Sidebar />
            </div>

            <div className="container col-10 mt-5">
              <Routes>
                <Route path="/tasktable" element={<Tasktable />} />
                <Route path="/" element={<Welcome />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Home;
