import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container{
      gap:2rem;
      height: 85vh;
      .form{
        padding: 2rem;
        background-color: #000000b0;
        gap: 1em;
        color: white;
        .err{
          color: red;
        }
        .container{
          gap: 2rem;
          input{
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button{
            padding: 0.5rem 1rem;
            background-color: #e509;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
            transition: all 0.3s ease-in-out;

            &:hover{
              background-color: #8b370999;
            }
          }
        }
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState(undefined);

  const handleLogIn = async () => {
    try {
      const {email, password} = formValues;
      await signInWithEmailAndPassword(firebaseAuth,email,password)
     /*  setStatus("Login successfully") */
    } catch (err) {
      console.log(err);
      setStatus("Please enter a valid email and password.")
    } 
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  
  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header/>
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <p className="err">{status}</p>
            <div className="container flex column">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
              <input type="password" placeholder="password" name="password" 
              value={formValues.password}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }/>
              <button onClick={handleLogIn}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
