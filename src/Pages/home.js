import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

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

  const mapConditionToType = (conditionCode) => {
    let icon = null;
    let conditionString = '';
  
    switch (conditionCode) {
      case '1':
        icon = <FontAwesomeIcon icon={faSun} />;
        conditionString = 'Sunny';
        break;
      case '2':
        icon = <FontAwesomeIcon icon={faCloud} />;
        conditionString = 'Cloudy';
        break;
      case '3':
        icon = <FontAwesomeIcon icon={faCloudRain} />;
        conditionString = 'Rainy';
        break;
      case '4':
        icon = <FontAwesomeIcon icon={faSnowflake} />;
        conditionString = 'Flurry';
        break;
      default:
        icon = null;
        conditionString = 'Unknown';
    }

    return (
      <>
        {icon} {conditionString}
      </>
    );
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
        const updatedRecords = fetchedRecords.map(record => {
          const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
          };
          const dataLeggibile = new Date(record.date).toLocaleString('it-IT', options);
          const conditionType = mapConditionToType(record.condition);

          return { ...record, date: dataLeggibile, condition: conditionType };
        });
        
        setRecords(updatedRecords);
      } catch (error) {
        console.error('Errore durante il recupero dei record:', error);
      }
    };
    fetchRecords();
  }, []);

  useEffect(() => {
    document.title = 'Your Secure Weather | Home';
  }, []);

  return (
    <React.Fragment>
      <Container className="py-5">
        <Table striped bordered hover>
          <thead>
            <tr>
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
