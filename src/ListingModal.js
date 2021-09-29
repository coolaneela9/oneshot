import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Button,
  Overlay,
  Tooltip,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import _ from "lodash";
import Styled from "styled-components";
import ChartListing from "./ChartListing";
import { getColleges, getStudents, getCollegesByState } from "./api";
import { StudentListTable } from "./StudentListing";

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

const ChartListing1 = ({ name, students, collegesByState }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [studentDetail, setStudentDetail] = useState([]);
  const [isShowStudentDetail, setShowStudentDetail] = useState(false);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleStudentDetail = (student) => {
    setStudentDetail(studentDetail.concat(student));
    setShowStudentDetail(true);
  };

  const renderViewBtnTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to View Students List
    </Tooltip>
  );

  // const usePrevious = (value) => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   }, [value]);
  //   return ref.current;
  // };

  // const prevCollegesByState = usePrevious(collegesByState);
  // useEffect(() => {
  //   const fetchCollegesByState = async () => {
  //     const data = await getCollegesByState(name);
  //     // .then((res) => {
  //     //   setCollegesByState(
  //     //     res && res.length > 0 ? [...collegesByState, ...res] : []
  //     //   );
  //     // });
  //     // setCollegesByState(
  //     //   data && data.length > 0 ? [...collegesByState, ...data] : []
  //     // );
  //   };
  //   fetchCollegesByState();
  // }, []);
  console.log(collegesByState, "collegesByState");

  return (
    <div className="dashboard-listing" ref={ref}>
      <Card className="dashboard-card">
        <Card.Header>{`Listing of Colleges by State ${name}`}</Card.Header>
        <Card.Body>
          <div className="dashboard-events-table">
            <StyledTable className="w-100">
              <thead className="thead-dark">
                <tr>
                  {_.map(collegeConfig, (config) => (
                    <th>{config}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {_.map(collegesByState, (college) => (
                  <tr>
                    <td style={colStyles.name}>{college.name}</td>
                    <td style={colStyles.yearFounded}>{college.yearFounded}</td>
                    <td style={colStyles.city}>{college.city}</td>
                    <td style={colStyles.state}>{college.state}</td>
                    <td style={colStyles.country}>{college.country}</td>
                    <td style={colStyles.studentsCount}>
                      {college.noOfStudents}
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderViewBtnTooltip}
                      >
                        <Button variant="primary" onClick={handleClick}>
                          View
                        </Button>
                      </OverlayTrigger>
                      <Overlay
                        show={show}
                        target={target}
                        placement="bottom"
                        container={ref}
                        containerPadding={20}
                      >
                        <Popover id="popover-contained">
                          <Popover.Header as="h3">Students</Popover.Header>
                          <Popover.Body>
                            {_.map(students, (student) => {
                              return (
                                <div onClick={handleStudentDetail(student)}>
                                  {student.name}
                                </div>
                              );
                            })}
                          </Popover.Body>
                        </Popover>
                      </Overlay>
                    </td>
                    <td style={colStyles.courses}>
                      {_.map(college.courses, (course) => (
                        <li>{course}</li>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </div>
        </Card.Body>
      </Card>
      <StudentDetailModal
        show={isShowStudentDetail}
        studentDetail={studentDetail}
        // close={setShowStudentDetail(!isShowStudentDetail)}
      />
    </div>
  );
};

export const StudentDetailModal = (show, studentDetail) => {
  return (
    <Modal show={show} className="listing-modal">
      <Modal.Body>
        <div className="pull-right">
          <button
            className="close-btn pull-right"
            onClick={(e) => {
              e.preventDefault();
              // close();
            }}
            role="button"
          >
            <span className="icon-cross" />
          </button>
        </div>
        <StudentListTable students={studentDetail} />
      </Modal.Body>
    </Modal>
  );
};

export const ListingModal = ({
  show,
  handleClose,
  name,
  students,
  collegesByState,
}) => {
  console.log(collegesByState, "listing modal cls");
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
        <ChartListing1
          name={name}
          students={students}
          collegesByState={collegesByState}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ListingModal;
