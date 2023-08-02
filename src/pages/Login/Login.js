import React, { useContext, useState } from 'react'
import { Credentials } from './credentials';
import { AuthContext } from '@context/AuthContext/AuthContext';
import { useNavigate } from "react-router-dom";
import LoginForm from '@components/LoginForm/LoginForm';

export default function Login() {
  const [credentials, setCredentials] = useState(Credentials);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = ({name, value}) => {
    setCredentials(prev => ({prev, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    login(credentials.email, credentials.password).then(() => {
      navigate('/', { replace: true });
    });
  }
  
  return <LoginForm credentials={credentials} handleChange={handleChange} handleSubmit={handleSubmit} />
}
