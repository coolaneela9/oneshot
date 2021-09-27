import React from "react";
import Card from "react-bootstrap/Card";
import _ from "lodash";
import Styled from "styled-components";
import DonutChart from "./DonutChart";
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
      padding: 5px 10px;
      color: #444444;
      font-weight: 400;
      font-size: 13px;
    }
  }
  td {
    padding: 20px;
  }
  tr {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    min-width: 68px;
  }
`;

const collegeConfig = [
  "Id",
  "Name",
  "Year founded",
  "City",
  "State",
  "Country",
  "No of students",
  "Courses",
];

const colors = [
  "#E5E9FC",
  "#6CE3FF",
  "#B27BFF",
  "#FFDE84",
  "#7CE2A3",
  "#FF8891",
  "#D2C8E2",
  "#647CFF",
  "#74B4FF",
  "#91D9E0",
  "#FF9ADC",
];

const seriesData = [30, 30, 40, 50, 50];

const collegeData = [
  {
    id: 1,
    name: "aneela",
    year_founded: "1999",
    city: "tirupathi",
    state: "karnataka",
    country: "india",
    students_count: 50,
    courses: ["cs", "biotech", "chem"],
  },
  {
    id: 2,
    name: "aneela",
    year_founded: "1999",
    city: "tirupathi",
    state: "telangana",
    country: "india",
    students_count: 50,
    courses: ["cs", "aero"],
  },
  {
    id: 3,
    name: "aneela",
    year_founded: "1999",
    city: "tirupathi",
    state: "kerala",
    country: "india",
    students_count: 50,
    courses: ["cs", "mech", "aero"],
  },
  {
    id: 4,
    name: "aneela",
    year_founded: "1999",
    city: "tirupathi",
    state: "bhu",
    country: "india",
    students_count: 50,
    courses: ["cs", "medicine"],
  },
  {
    id: 5,
    name: "aneela",
    year_founded: "1999",
    city: "tirupathi",
    state: "patna",
    country: "india",
    students_count: 50,
    courses: ["cs", "electronics"],
  },
];

export class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colleges: [],
    };
    this.stateCount = 0;
    this.fetchCollegePromise = undefined;
  }
  componentDidMount() {
    const { colleges } = this.state;
    const uniqueStates = _.uniq(_.map(colleges, "state"));
    getColleges().then((res) => {
      this.setState({
        colleges: [...res],
      });
    });
  }

  render() {
    const { colleges } = this.state;
    const uniqueStates = _.uniq(_.map(colleges, "state"));
    const uniqueCourses = _.uniq(_.map(this.colleges, "courses"));
    let collegeChartData = [];
    let collegeSeriesData = [];
    for (let i = 0; i < uniqueStates.length; i++) {
      collegeChartData.push({
        name: uniqueStates[i],
        count: "30",
      });
    }
    for (let i = 0; i < uniqueStates.length; i++) {
      collegeSeriesData.push([uniqueStates[i], 30]);
    }
    return (
      <div className="dashboard-listing">
        <Card className="dashboard-card">
          <Card.Header>Listing of Colleges</Card.Header>
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
                  {_.map(colleges, (college) => (
                    <tr>
                      <td>{college._id}</td>
                      <td>{college.name}</td>
                      <td>{college.yearFounded}</td>
                      <td>{college.city}</td>
                      <td>{college.state}</td>
                      <td>{college.country}</td>
                      <td>{college.noOfStudents}</td>
                      <td>
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
        <DonutChart
          data={collegeChartData}
          title={"College Chart"}
          seriesData={collegeSeriesData}
          colors={colors}
          sum={90}
        />
      </div>
    );
  }
}

export default Listing;
