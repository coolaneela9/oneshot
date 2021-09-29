import React, { useState, useEffect } from "react";
import { Modal, CloseButton } from "react-bootstrap";
import { getStudentsByCollege } from "./api";
import { StudentListTable } from "./StudentListing";

export const StudentModal = ({ show, collegeId, close }) => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchStudentList = () => {
      if (collegeId) {
        getStudentsByCollege(collegeId).then((res) => {
          setStudents(students.concat(res));
        });
      }
    };
    fetchStudentList();
  }, [collegeId]);

  if (!show) return null;
  return (
    <div>
      <Modal show={show} className="student-modal">
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
            <StudentListTable students={students} showCollegeName={false} />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentModal;
