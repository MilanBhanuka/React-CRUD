import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !email) {
      setError('Both name and email are required');
      return;
    }

    axios.post('http://localhost:8081/create', { name, email })
      .then(res => {
        console.log(res);
        setName('');
        setEmail('');
        setError('');
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        setError('An error occurred while creating the student');
      });
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-75 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2 className='text-center'>Add Student</h2>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
