import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student() {
  const [student, setStudent] = React.useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => setStudent(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8081/student/' + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
      <div className='w-75 bg-white rounded shadow p-4'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h2>Student List</h2>
          <Link to="/create" className='btn btn-success'>ADD +</Link>
        </div>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='table-striped'>
            {
              student.map((data, i) => (
                <tr key={i}>
                  <td>{data.Name}</td>
                  <td>{data.Email}</td>
                  <td>
                    <Link to={`update/${data.ID}`} className='btn btn-primary btn-sm me-2'>Edit</Link>
                    <button className='btn btn-danger btn-sm' onClick={() => handleDelete(data.ID)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
