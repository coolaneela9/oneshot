import React from "react";
import "./App.css";
import Listing from "./Listing";
import chanakyaImg from "./chanakya.jpeg";
import SideBar from "./SideBar";
import { Row, Col } from "react-bootstrap";

class App extends React.Component {
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <nav className="navBar">
          <div className="h4" style={{ padding: "20px" }}>
            Oneshot
          </div>
          <div className="sideBar">
            <div className="candidate-details">
              <div>
                <img
                  className={`avatar candidate-img`}
                  src={chanakyaImg}
                  style={{ width: "36px", height: "36px" }}
                  alt={`Chanakya Chandra`}
                />
              </div>
              <div className="candidate-intro">
                <div>Chanakya Chandra</div>
                <div>Mechanical Engineer, IIT Madras</div>
              </div>
            </div>
          </div>
        </nav>
        {/* <div className="img-container">
          <div className="row no-gutters">
            <div className="sidebar-col col d-none d-xl-block">
              <SideBar />
            </div>
            <div className="main-col col px-3">
              <Listing />
            </div>
          </div>
        </div> */}
        <div className="img-container">
          <Listing />
        </div>
      </div>
    );
  }
}

export default App;
