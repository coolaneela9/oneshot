import React from "react";
import Card from "react-bootstrap/Card";
import _ from "lodash";
import DonutChart from "./DonutChart";

const collegeConfig = [
  "id",
  "Name",
  "Year founded",
  "City",
  "State",
  "Country",
  "No of students",
  "Courses",
];

const seriesData = [30, 30, 40, 50, 50];

const collegeData = [
  {
    id: 1,
    name: "aneela",
    year_founded: "1999",
    city: "tirupathi",
    state: "andhra",
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
  render() {
    const uniqueStates = _.uniq(_.map(collegeData, "state"));
    const uniqueCourses = _.uniq(_.map(collegeData, "courses"));

    return (
      <div className="dashboard-listing">
        <Card>
          <Card.Header>Listing of Colleges</Card.Header>
          <Card.Body>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  {_.map(collegeConfig, (config) => (
                    <th>{config}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {_.map(collegeData, (data) => (
                  <tr>
                    <th scope="row">{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.year_founded}</td>
                    <td>{data.city}</td>
                    <td>{data.state}</td>
                    <td>{data.country}</td>
                    <td>{data.students_count}</td>
                    <td>{data.courses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
        <DonutChart
          data={collegeData}
          title={"College Chart"}
          seriesData={seriesData}
        />
      </div>
    );
  }
}

export default Listing;
