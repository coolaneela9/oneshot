import React from "react";
import Card from "react-bootstrap/Card";
import _ from "lodash";
import Styled from "styled-components";
import DonutChart from "./DonutChart";
import { getColleges, getStudents } from "./api";

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

const studentConfig = (showCollegeName) =>
  showCollegeName
    ? ["Name", "Year of batch", "College Name", "Skills"]
    : ["Name", "Year of batch", "Skills"];

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

export class StudentListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      colleges: [],
      isFetchingStudents: false,
      isFetchingColleges: false,
      uniqueCourses: [],
    };
  }
  componentDidMount() {
    const { students, colleges } = this.state;

    // For showing all the students
    this.setState({
      isFetchingStudents: true,
    });

    getStudents().then((res) => {
      this.setState({
        students: students.concat(res),
        isFetchingStudents: false,
      });
    });

    this.setState({
      isFetchingColleges: true,
    });

    getColleges().then((res) => {
      this.setState({
        colleges: colleges.concat(res),
        isFetchingColleges: false,
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const { students, colleges } = this.state;
    if (prevState.students !== students && students) {
      let uniqueCourses = [];

      for (let i = 0; i < colleges.length; i++) {
        uniqueCourses = uniqueCourses.concat(colleges[i].courses);
      }

      this.setState({
        uniqueCourses: _.uniq(uniqueCourses),
      });
    }
  }
  render() {
    const { students, uniqueCourses, colleges } = this.state;

    let courseChartData = [];
    let courseSeriesData = [];

    for (let i = 0; i < uniqueCourses.length; i++) {
      courseChartData.push({
        name: uniqueCourses[i],
        count: _.filter(colleges, (college) =>
          _.includes(college.courses, uniqueCourses[i])
        ).length,
      });
    }

    for (let i = 0; i < uniqueCourses.length; i++) {
      courseSeriesData.push([
        uniqueCourses[i],
        _.filter(colleges, (college) =>
          _.includes(college.courses, uniqueCourses[i])
        ).length,
      ]);
    }

    return (
      <div className="dashboard-listing">
        <div className="heading">List of Students:</div>
        <StudentListTable students={students} showCollegeName={true} />
        <div className="heading">Courses Chart:</div>
        <DonutChart
          data={courseChartData}
          title={"Courses Chart"}
          seriesData={courseSeriesData}
          colors={colors}
          sum={colleges.length}
          chartName={"courses_chart"}
        />
      </div>
    );
  }
}

export const StudentListTable = ({ students, showCollegeName }) => {
  return (
    <Card className="dashboard-card">
      <Card.Header>
        {students.length > 0 ? "Students" : "Student Details"}
      </Card.Header>
      <Card.Body>
        <div className="dashboard-events-table">
          <StyledTable className="w-100">
            <thead className="thead-dark">
              <tr>
                {_.map(studentConfig(showCollegeName), (config, i) => (
                  <th key={i}>{config}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {_.map(students, (student, i) => (
                <tr key={i}>
                  <td>{student.name}</td>
                  <td>{student.yearOfBatch}</td>
                  {showCollegeName && (
                    <td>{student.collegeId && student.collegeId.name}</td>
                  )}
                  <td>
                    {_.map(student.skills, (skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentListing;
