import React, { useState, useEffect } from "react";
import { Modal, CloseButton } from "react-bootstrap";
import { getStudentsByCollege } from "./api";
import { StudentListTable } from "./StudentListing";

export const StudentModal = ({ show, collegeId, close }) => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchStudentList = () => {
      getStudentsByCollege(collegeId).then((res) => {
        setStudents([...students, ...res]);
      });
    };
    fetchStudentList();
  }, [collegeId]);

  if (!show) return null;
  return (
    <div>
      <Modal show={show} className="listing-modal">
        <Modal.Body>
          <CloseButton
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          />

          <StudentListTable students={students} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentModal;
