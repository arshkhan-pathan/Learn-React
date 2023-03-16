import React, { useState } from "react";

const AuthContext = React.createContext({
  // basic structure of our context
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token"); //if this is undefined then usestate will be null else useState will get initial valie of localStorage token
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token; //this "!!" will set to boolen value
  const loginHandler = (token) => {
    setToken(token); // setting token to any value will set login handler to true
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null); // setting token to any null will set login handler to false
    localStorage.removeItem("token");
  };

  //below object will be provided as value
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
