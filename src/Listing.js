import React from "react";
import Card from "react-bootstrap/Card";
import _ from "lodash";
import Styled from "styled-components";
import DonutChart from "./DonutChart";
import { getColleges, getStudents } from "./api";

export const StyledCollegeTable = Styled.table`
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

export const collegeConfig = [
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

export class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colleges: [],
      students: [],
    };
  }
  componentDidMount() {
    const { colleges, students } = this.state;

    // For showing all the colleges
    getColleges().then((res) => {
      this.setState({
        colleges: colleges.concat(res),
      });
    });

    getStudents().then((res) => {
      this.setState({
        students: students.concat(res),
      });
    });
  }

  render() {
    const { colleges, students } = this.state;
    const uniqueStates = _.uniq(_.map(colleges, "state"));
    let collegeChartData = [];
    let collegeSeriesData = [];

    for (let i = 0; i < uniqueStates.length; i++) {
      collegeChartData.push({
        name: uniqueStates[i],
        count: _.filter(
          colleges,
          (college) => college.state === uniqueStates[i]
        ).length,
      });
    }

    for (let i = 0; i < uniqueStates.length; i++) {
      collegeSeriesData.push([
        uniqueStates[i],
        _.filter(colleges, (college) => college.state === uniqueStates[i])
          .length,
      ]);
    }

    return (
      <div className="dashboard-listing">
        <div className="heading">List of Colleges:</div>
        <Card className="dashboard-card">
          <Card.Header>Colleges</Card.Header>
          <Card.Body>
            <div className="dashboard-events-table">
              <StyledCollegeTable className="w-100">
                <thead className="thead-dark">
                  <tr>
                    {_.map(collegeConfig, (config, i) => (
                      <th key={i}>{config}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {_.map(colleges, (college) => (
                    <tr key={college._id}>
                      <td>{college.name}</td>
                      <td>{college.yearFounded}</td>
                      <td>{college.city}</td>
                      <td>{college.state}</td>
                      <td>{college.country}</td>
                      <td>{college.noOfStudents}</td>
                      <td>
                        {_.map(college.courses, (course, i) => (
                          <li key={i}>{course}</li>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledCollegeTable>
            </div>
          </Card.Body>
        </Card>
        <div className="heading college-chart-heading">College Chart:</div>
        <div className="sub-heading">
          Click on any state to view the list of colleges
        </div>
        <DonutChart
          data={collegeChartData}
          title={"College Chart"}
          seriesData={collegeSeriesData}
          colors={colors}
          sum={colleges.length}
          colleges={colleges}
          students={students}
          chartName={"college_chart"}
        />
      </div>
    );
  }
}

export default Listing;
