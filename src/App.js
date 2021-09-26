import React from "react";
import "./App.css";
import Listing from "./Listing";
import chanakyaImg from "./chanakya.jpeg";

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navBar">
          <div className="h4" style={{ padding: "20px" }}>
            Oneshot
          </div>
          <div className="candidate-details">
            <div className="candidate-img">
              <img
                className={`avatar`}
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
        </nav>
        <Listing />
      </div>
    );
  }
}

export default App;
