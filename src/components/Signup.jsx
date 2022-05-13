import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import Typewriter from "typewriter-effect";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import dotenv from "dotenv";

import validateEmail from "./../utils/validateEmail.js";
import getRandomInt from "./../utils/getRandomInt.js";

//import { DataContext } from "./../hooks/DataContext";

import logo from "./../assets/git--store-logo.png";

dotenv.config();

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  function buildSignupPage() {
    function validateSignin() {
      return signupData.name?.length > 0 &&
        signupData.email?.length > 0 &&
        signupData.password?.length > 0 &&
        signupData.passwordConfirm?.length > 0 &&
        signupData.password === signupData.passwordConfirm
        ? validateEmail(signupData.email)
        : "disabled";
    }

    function handleInputChange(e) {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }

    function handleSignup() {
      const request = axios.post(`${URL}/auth/sign-up`, {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });

      request.then((_res) => {
        navigate("/");
      });
      request.catch((error) => {
        console.log(error);
        confirmAlert({
          message: `${error.response.data.message}. Please try again.`,
          buttons: [
            {
              label: "OK",
              onClick: () => null,
            },
          ],
        });
        resetAll();
      });
    }

    function resetAll() {
      setHasSubmitted(false);
      setSignupData({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
    }

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
                .typeString("git --store")
                .pauseFor(3000)
                .deleteAll()
                .typeString("create user")
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
              handleSignup();
            }, getRandomInt(750, 2000));
          }}
        >
          <div className="input-group">
            <input
              className={hasSubmitted ? "disabled" : ""}
              type="text"
              value={signupData.name}
              name="name"
              onChange={handleInputChange}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>git config --global user.name</label>
          </div>
          <div className="input-group">
            <input
              className={hasSubmitted ? "disabled" : ""}
              type="text"
              value={signupData.email}
              name="email"
              onChange={handleInputChange}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>git config --global user.email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              value={signupData.password}
              name="password"
              onChange={handleInputChange}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>git config --global user.password</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              value={signupData.passwordConfirm}
              name="passwordConfirm"
              onChange={handleInputChange}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>git auth --global user.password</label>
          </div>
          <button className={validateSignin()} type="submit">
            <p className={hasSubmitted ? "hidden" : ""}>git push</p>
            <div
              id="loading-dots"
              className={hasSubmitted ? "dot-pulse" : "dot-pulse hidden"}
            ></div>
          </button>
          <Link to="/">sign-in user</Link>
        </form>
      </>
    );
  }

  const signupPage = buildSignupPage();

  return (
    <>
      <main id="sign-up-page" className="auth-pages">
        {signupPage}
      </main>
    </>
  );
}

export default Signup;
