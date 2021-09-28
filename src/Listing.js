import React, { useState, useEffect } from "react";
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

// export const CollegeListing = () => {
//   const [colleges, setColleges] = useState([]);
//   useEffect(() => {
//     const fetchCollegeList = () => {
//       getColleges().then((res) => {
//         setColleges(colleges.concat(res));
//       });
//     };
//     fetchCollegeList();
//   });
// };
export class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colleges: [],
    };
  }
  componentDidMount() {
    const { colleges } = this.state;

    // For showing all the colleges
    getColleges().then((res) => {
      this.setState({
        colleges: colleges.concat(res),
      });
    });
  }

  render() {
    const { colleges } = this.state;
    const uniqueStates = _.uniq(_.map(colleges, "state"));
    let collegeChartData = [];
    let collegeSeriesData = [];

    //have to use the api in the count part
    for (let i = 0; i < uniqueStates.length; i++) {
      // let collegeData = {
      //   name: uniqueStates[i],
      //   count: 30,
      // };
      // getCollegesByState(uniqueStates[i]).then((data) => {
      //   console.log(data, "data");
      //   collegeData.count = data.length;
      // });
      collegeChartData.push({
        name: uniqueStates[i],
        count: "30",
        // count: await getCollegesByState(uniqueStates[i]),
        // // .then((data) => {
        // //   console.log(`data.length`, data.length);
        // //   return data.length;
        // // }),
      });
    }

    for (let i = 0; i < uniqueStates.length; i++) {
      collegeSeriesData.push([uniqueStates[i], 30]);
    }
    console.log(collegeChartData, "collegeChartData");

    return (
      <div className="dashboard-listing">
        <div>Showing the total list of the colleges here:</div>
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
                    <tr key={college._id}>
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
          sum={colleges.length}
        />
      </div>
    );
  }
}

export default Listing;
