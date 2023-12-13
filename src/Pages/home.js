import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  const logoutURL = 'http://localhost:8000/api/v1/auth/logout/';

  const logout = async () => {
    try {
      const response = await axios.post(logoutURL);
      console.log('Logout successful:', response);
      localStorage.clear();
      navigate('/auth/login');
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem('user-token');
        const config = {
          headers: {
            Authorization: `Token ${token}`
          }
        };
  
        const response = await axios.get('http://localhost:8000/api/v1/records/', config);
        const fetchedRecords = response.data;
        setRecords(fetchedRecords);
      } catch (error) {
        console.error('Errore durante il recupero dei record:', error);
      }
    };
  
    fetchRecords();
  }, []);
  

  return (
    <React.Fragment>
      <Container className="py-5">
        <h3 className="fw-normal">Welcome Home.</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Condition</th>
              <th>Humidity</th>
              <th>Temperature</th>
              <th>Wind</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.condition}</td>
                <td>{record.humidity}</td>
                <td>{record.temperature}</td>
                <td>{record.wind}</td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
     <center><button onClick={logout}>Logout</button></center>

    </React.Fragment>
  );
};

export default Home;
