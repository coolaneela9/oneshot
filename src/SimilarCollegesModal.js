import React from "react";
import { Modal, CloseButton, Card } from "react-bootstrap";
import { StyledCollegeTable, collegeConfig } from "./Listing";
import _ from "lodash";

export const SimilarCollegesModal = ({ show, list, close }) => {
  return (
    <Modal show={show} className="listing-modal">
      <Modal.Body>
        <div className="pull-right">
          <CloseButton
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          />
        </div>
        <div className="dashboard-listing">
          <Card className="dashboard-card">
            <Card.Header>{`Similar Colleges`}</Card.Header>
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
                    {_.map(list, (college) => (
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
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SimilarCollegesModal;
