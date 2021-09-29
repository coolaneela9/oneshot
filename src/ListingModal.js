import React from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import _ from "lodash";
import Styled from "styled-components";
import StudentModal from "./StudentModal";
import SimilarCollegesModal from "./SimilarCollegesModal";

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

class ChartListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStudentPopup: false,
      showSimilarCollegesPopup: false,
      similarCollegesList: [],
    };
  }

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

  handleSimilarCollegesPopup = (ourRequiredcollege) => {
    const { colleges } = this.props;
    const { similarCollegesList } = this.state;
    let similiarColleges = [];
    for (let i = 0; i < ourRequiredcollege.courses.length; i++) {
      similiarColleges = similiarColleges.concat(
        _.filter(colleges, (college) =>
          _.includes(college.courses, ourRequiredcollege.courses[i])
        )
      );
    }

    this.setState({
      showSimilarCollegesPopup: true,
      similarCollegesList: similarCollegesList.concat(similiarColleges),
    });
  };

  closeSimilarCollegePopupClose = () => {
    this.setState({
      showSimilarCollegesPopup: false,
    });
  };

  render() {
    const { name, collegesByState } = this.props;
    const {
      showStudentPopup,
      collegeSelected,
      similarCollegesList,
      showSimilarCollegesPopup,
    } = this.state;
    return (
      <div className="dashboard-listing">
        <Card className="dashboard-card">
          <Card.Header>{` by State ${name}`}</Card.Header>
          <Card.Body>
            <div className="dashboard-events-table">
              <StyledTable className="w-100">
                <thead className="thead-dark">
                  <tr>
                    {_.map(collegeConfig, (config, i) => (
                      <th key={i}>{config}</th>
                    ))}
                    <th>Similar Colleges</th>
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
                        <span className="students-counts">
                          {college.noOfStudents}
                        </span>
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
                      <td>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            this.handleSimilarCollegesPopup(college);
                          }}
                        >
                          colleges
                        </Button>
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
        <SimilarCollegesModal
          show={showSimilarCollegesPopup}
          list={similarCollegesList}
          close={this.closeSimilarCollegePopupClose}
        />
      </div>
    );
  }
}

export const ListingModal = ({
  show,
  handleClose,
  name,
  collegesByState,
  colleges,
}) => {
  if (!show) return null;
  return (
    <Modal show={show} className="listing-modal">
      <Modal.Body>
        <div className="pull-right">
          <CloseButton
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          />
        </div>
        {name && (
          <ChartListing
            name={name}
            collegesByState={collegesByState}
            colleges={colleges}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};
export default ListingModal;
