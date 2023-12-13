import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Home = () => {
    const navigate = useNavigate();
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

    return (
        <React.Fragment>
            <Container className='py-5'>
                <h3 className='fw-normal'>Welcome Home.</h3>
                <button onClick={logout}>sloggate</button>
            </Container>
        </React.Fragment>
    )
}
export default Home;