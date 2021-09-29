import axios from "axios";

export const getColleges = () => {
  return fetch("http://localhost:8000/colleges")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err, "err"));
};

export const getStudents = () => {
  return fetch("http://localhost:8000/students")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err, "err"));
};

export const getCollegesByState = (location) => {
  return fetch(`http://localhost:8000/colleges/getByLocation/${location}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err, "err"));
};

export const getCollegeById = (schoolId) => {
  return fetch(`http://localhost:8000/college/${schoolId}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err, "err"));
};

export const getCollegesByCourseName = (courseName) => {
  return fetch(`http://localhost:8000/colleges/getByCourse/${courseName}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err, "err"));
};

// export async function getCollegesByCourseName(courseName) {
//   const response = await fetch(
//     `http://localhost:8000/colleges/getByCourse/${courseName}`
//   );
//   const collegesByState = await response.json();
//   console.log(`collegesByState`, collegesByState);

//   return collegesByState;
// }

// export async function getCollegesByCourseName(courseName) {
//   const data = await axios
//     .get(`http://localhost:8000/colleges/getByCourse/${courseName}`)
//     .then((promise) => {
//       return promise.data;
//     })
//     .catch((e) => {
//       console.error(e);
//     });
//   return data;
// }

export const getStudentsByCollege = (collegeId) => {
  return fetch(`http://localhost:8000/students/${collegeId}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err, "err"));
};
