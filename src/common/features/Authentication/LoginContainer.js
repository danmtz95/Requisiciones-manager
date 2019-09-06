import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import MainContainer from '../../components/MainContainer';
import { getIsAuthenticated } from './authenticationSelectors';
import { Auth } from '../../../agent';

const LoginContainer = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const dispatch = useDispatch();
  return (
    <MainContainer title="Login">
      {isAuthenticated ? (
        <Redirect to="/"></Redirect>
      ) : (
        <Login
          onSuccess={credentials =>
            Auth.login(credentials)
              .then(r => {
                Auth.configCookies(r.data);
                Auth.configHeaders();
                dispatch({ type: 'LOGIN_SUCCESS' });
              })
              .catch(e => console.log('Error login'))
          }
        ></Login>
      )}
    </MainContainer>
  );
};

export default LoginContainer;
