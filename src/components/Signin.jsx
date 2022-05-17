import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Typewriter from 'typewriter-effect';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import dotenv from 'dotenv';

import validateEmail from './../utils/validateEmail.js';
import getRandomInt from './../utils/getRandomInt.js';
import TokenContext from './../hooks/TokenContext';

import logo from './../assets/git--store-logo.png';

dotenv.config();

function Signin() {
  const [homeBtn, setHomeBtn] = useState(false);
  const [signinData, setSigninData] = useState({
    email: '',
    password: '',
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  function buildSigninPage() {
    return (
      <>
        <figure>
          <img src={logo} alt="logo" />
          <Typewriter
            options={{
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('git --store')
                .pauseFor(3000)
                .deleteAll()
                .typeString('auth user')
                .pauseFor(2000)
                .deleteAll()
                .start();
            }}
          />
        </figure>
        <form
          className="form-group"
          onSubmit={(e) => {
            e.preventDefault();
            setHasSubmitted(true);
            setTimeout(() => {
              handleSignin();
            }, getRandomInt(750, 2000));
          }}
        >
          <div className="input-group">
            <input
              className={hasSubmitted ? 'disabled' : ''}
              type="text"
              value={signinData.email}
              name="email"
              onChange={handleInputChange}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>git auth user.email</label>
          </div>
          <div className="input-group">
            <input
              className={hasSubmitted ? 'disabled' : ''}
              type="password"
              value={signinData.password}
              name="password"
              onChange={handleInputChange}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>git auth user.password</label>
          </div>
          <button className={validateSignin()} type="submit">
            <p className={hasSubmitted ? 'hidden' : ''}>git init</p>
            <div
              id="loading-dots"
              className={hasSubmitted ? 'dot-pulse' : 'dot-pulse hidden'}
            ></div>
          </button>
          <Link to="/signup">config new user</Link>
          <Link className="home-btn" to="/">
            &gt;&gt;HOME
          </Link>
        </form>
      </>
    );

    function validateSignin() {
      return signinData.email?.length > 0 &&
        signinData.password?.length > 0 &&
        !hasSubmitted
        ? validateEmail(signinData.email)
        : 'disabled';
    }

    function handleInputChange(e) {
      setSigninData({ ...signinData, [e.target.name]: e.target.value });
    }

    function handleSignin() {
      const URL = 'https://git--store.herokuapp.com/api';
      const body = {
        email: signinData.email,
        password: signinData.password,
      };
      const request = axios.post(`${URL}/auth/sign-in`, body);

      request.then((response) => {
        setToken(response.data);
        navigate('/');
      });
      request.catch((error) => {
        confirmAlert({
          message: `${error.response.data.message}. Please try again.`,
          buttons: [
            {
              label: 'OK',
              onClick: () => null,
            },
          ],
        });
        resetAll();
      });
    }

    function resetAll() {
      setHasSubmitted(false);
      setSigninData({
        email: '',
        password: '',
      });
    }
  }

  const signinPage = buildSigninPage();

  return (
    <>
      <main id="sign-in-page" className="auth-pages">
        {signinPage}
      </main>
    </>
  );
}

export default Signin;
