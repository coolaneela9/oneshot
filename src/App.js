import React from "react";
import "./App.scss";
import Listing from "./Listing";
import chanakyaImg from "./chanakya.jpeg";
import StudentListing from "./StudentListing";

class App extends React.Component {
  render() {
    return (
      <div>
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
                <div>IIT Madras</div>
              </div>
            </div>
          </div>
        </nav>
        <div className="img-container">
          <Listing />
          <StudentListing />
        </div>
      </div>
    );
  }
}

export default App;
