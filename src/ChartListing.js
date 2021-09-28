import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import _ from "lodash";
import Styled from "styled-components";
import { getColleges, getStudents, getCollegesByState } from "./api";

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

export const ChartListing = ({ name }) => {
  const [collegesByState, setCollegesByState] = useState([]);
  useEffect(() => {
    const fetchList = () => {
      getCollegesByState(name).then((res) => {
        console.log(`res`, res);
        setCollegesByState(
          res && res.length > 0 ? collegesByState.concat(res) : []
        );
      });
    };
    fetchList();
  }, name);
  return (
    <div className="dashboard-listing">
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
    </div>
  );
};

export default ChartListing;
