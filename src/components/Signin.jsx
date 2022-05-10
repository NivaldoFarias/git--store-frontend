import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import Typewriter from "typewriter-effect";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

import validateEmail from "./../utils/validateEmail.js";
import getRandomInt from "./../utils/getRandomInt.js";

//import { DataContext } from "./../hooks/DataContext";
import TokenContext from "./../hooks/TokenContext";

import logo from "./../assets/git--store-logo.png";

function Signin() {
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { token, setToken } = useContext(TokenContext);
  //const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      //navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                .typeString("git --store")
                .pauseFor(3000)
                .deleteAll()
                .typeString("auth user")
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
              className={hasSubmitted ? "disabled" : ""}
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
              className={hasSubmitted ? "disabled" : ""}
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
            <p className={hasSubmitted ? "hidden" : ""}>git init</p>
            <div
              id="loading-dots"
              className={hasSubmitted ? "dot-pulse" : "dot-pulse hidden"}
            ></div>
          </button>
          <Link to="/signup">config new user</Link>
        </form>
      </>
    );

    function validateSignin() {
      return signinData.email?.length > 0 &&
        signinData.password?.length > 0 &&
        !hasSubmitted
        ? validateEmail(signinData.email)
        : "disabled";
    }

    function handleInputChange(e) {
      setSigninData({ ...signinData, [e.target.name]: e.target.value });
    }

    function handleSignin() {
      const request = axios.post("https://localhost:5000/api/auth/sign-in", {
        email: signinData.email,
        password: signinData.password,
      });

      request.then((response) => {
        setToken(response.data.token);
        //setData({ ...data, user: { ...response.data.user } });
        navigate("/home");
      });
      request.catch((error) => {
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
      setSigninData({
        email: "",
        password: "",
      });
    }
  }

  const signinPage = buildSigninPage();

  return (
    <>
      <main id="signin-page" className="auth-pages">
        {signinPage}
      </main>
    </>
  );
}

export default Signin;
