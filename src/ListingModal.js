import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import _ from "lodash";
import Styled from "styled-components";
import { getColleges, getStudents, getCollegesByState } from "./api";
import { StudentListTable } from "./StudentListing";
import StudentModal from "./StudentModal";

const StyledTable = Styled.table`
  overflow-y: auto;
  max-height: 300px;
  border-spacing: 0 16px;
  border-collapse: separate;
  padding: 1px;
  thead {
    background-color: #FAFAFA;
    tr, th {
      box-shadow: none !important;
      padding: 5px 20px;
      color: #fdf5f5;
      font-weight: 400;
      font-size: 17px;
      background-color: #89458b;
      font-family: emoji;
    }
  }
  td {
    padding: 20px;
    font-family: emoji;
  }
  tr {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    min-width: 68px;
  }
`;

const collegeConfig = [
  "Name",
  "Year founded",
  "City",
  "State",
  "Country",
  "No of students",
  "Courses",
];

const colStyles = {
  name: {
    textAlign: "left",
    width: "30%",
  },
  yearFounded: {
    width: "15%",
    textAlign: "left",
  },
  city: {
    textAlign: "left",
  },
  state: {
    textAlign: "left",
  },
  country: {
    textAlign: "left",
  },
  courses: {
    width: "30%",
    textAlign: "left",
  },
  studentsCount: {
    textAlign: "left",
    width: "12%",
  },
};

class ChartListing1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStudentPopup: false,
    };
  }
  // const [showStudentPopup, setShowStudentPopup] = useState(false);
  // const [collegeSelected, setCollegeSelected] = useState(null);

  handleStudentPopup = (college) => {
    this.setState({
      showStudentPopup: true,
      collegeSelected: college,
    });
  };

  closeStudentPopup = () => {
    this.setState({
      showStudentPopup: false,
    });
  };

  render() {
    const { name, collegesByState } = this.props;
    const { showStudentPopup, collegeSelected } = this.state;
    return (
      <div className="dashboard-listing">
        <Card className="dashboard-card">
          <Card.Header>{`Listing of Colleges by State ${name}`}</Card.Header>
          <Card.Body>
            <div className="dashboard-events-table">
              <StyledTable className="w-100">
                <thead className="thead-dark">
                  <tr>
                    {_.map(collegeConfig, (config, i) => (
                      <th key={i}>{config}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {_.map(collegesByState, (college) => (
                    <tr key={college._id}>
                      <td style={colStyles.name}>{college.name}</td>
                      <td style={colStyles.yearFounded}>
                        {college.yearFounded}
                      </td>
                      <td style={colStyles.city}>{college.city}</td>
                      <td style={colStyles.state}>{college.state}</td>
                      <td style={colStyles.country}>{college.country}</td>
                      <td style={colStyles.studentsCount}>
                        {college.noOfStudents}
                        <Button
                          className="view-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            this.handleStudentPopup(college);
                          }}
                        >
                          view
                        </Button>
                      </td>
                      <td style={colStyles.courses}>
                        {_.map(college.courses, (course, i) => (
                          <li key={i}>{course}</li>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </div>
          </Card.Body>
        </Card>
        <StudentModal
          show={showStudentPopup}
          collegeId={collegeSelected && collegeSelected._id}
          close={this.closeStudentPopup}
        />
      </div>
    );
  }
}

export const ListingModal = ({ show, handleClose, name, collegesByState }) => {
  if (!show) return null;
  return (
    <Modal show={show} className="listing-modal">
      <Modal.Body>
        <div className="pull-right">
          <button
            className="close-btn pull-right"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
            role="button"
          >
            <span className="icon-cross" />
          </button>
        </div>
        {name && (
          <ChartListing1 name={name} collegesByState={collegesByState} />
        )}
      </Modal.Body>
    </Modal>
  );
};
export default ListingModal;
