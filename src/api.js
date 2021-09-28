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
