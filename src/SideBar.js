import React from "react";

import chanakyaImg from "./chanakya.jpeg";

export const SideBar = () => {
  return (
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

      <hr width="60%" />
      <div className="list-group">
        <div>Dashboard</div>
        <div>Task Management</div>
      </div>
    </div>
  );
};
export default SideBar;
