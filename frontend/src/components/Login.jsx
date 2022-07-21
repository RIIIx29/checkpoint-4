/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@services/axios";
import UserContext from "./contexts/UserContext";
import { schemaForLogin } from "../JoiSchemas";
import "../Login.scss";

const formInitialState = {
  password: "",
  email: "",
};

const loginForm = (state, action) => {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    case "RESET_FORM":
      return { ...formInitialState };
    default:
      return state;
  }
};

function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(loginForm, formInitialState);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const validData = await schemaForLogin.validateAsync(formData);
    if (!validData) {
      // eslint-disable-next-line no-alert
      return alert("Please enter a valid email and password");
    }
    const userCredit = {
      password: formData.password,
      email: formData.email,
    };

    try {
      const userData = await axios
        .post("users/login", userCredit, {
          withCredentials: true,
        })
        .then((response) => response.data);
      // eslint-disable-next-line no-restricted-syntax
      setUser(userData);
      // alert("Successfully logged in");
      dispatch({ type: "RESET_FORM" });
      return navigate("/");
    } catch (err) {
      // eslint-disable-next-line no-alert
      return alert(err.response.data);
    }
  };

  return (
    <div className="loginPage">
      <div className="container">
        <section className="loginDisplay">
          <h1>Connect here</h1>
          <span className="stylingBar" />
          <form onSubmit={loginSubmit}>
            <input
              className="input"
              type="email"
              placeholder="Entrez votre email"
              required
              autoComplete="on"
              value={formData.email}
              onChange={(e) =>
                dispatch({ type: "UPDATE_EMAIL", payload: e.target.value })
              }
            />
            <input
              className="input"
              type="password"
              placeholder="Enter password"
              required
              autoComplete="on"
              value={formData.password}
              onChange={(e) =>
                dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value })
              }
            />
            <button className="submitButton" type="submit">
              Connexion
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
