import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  // current loged in usr
  const [currentUser, setCurrentUser] = useState();
  // used to check if Context is Mounted
  const [isLoading, setIsLoading] = useState(true);
  /**
   * Sign up using email and passwod
   * @param {String} email
   * @param {String} password
   * @returns {Promise}
   */
  const signup = async (email, password) => {
    const body = {
      username: email,
      password: password,
    }
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    }

    const response = await fetch("/save/user", options);
    const json = await response.json();
    console.log(json);
    return json;

  };



  /**
   * re authenticate  when  email or password changed
   * New Token will generated each time we change email or password
   * Used to avoid token expired and get new token after email or password changed
   * @param {String} currentPassword 
   * @returns {Promise}
   */
  const reauthenticate = (currentPassword) => {

  };

  /**
   * Log in using email and passwod
   * @param {String} email
   * @param {String} password
   * @returns {Promise}
   */
  const login = (email, password) => {

  };

  /**
   * log out
   * @returns {Promise}
   */
  const logout = () => {

  };
  /**
   * Sign up using email and passwod
   * @param {String} email
   * @param {String} password
   * @returns {Promise}
   */
  const resetPassword = (email) => {

  };

  /**
   * Update current User email
   * @param {String} email
   * @param {String} password
   * @returns {Promise}
   */
  const updateEmail = (email) => {

  };
  /**
   *  Update current User password
   * @param {String} email
   * @param {String} password
   * @returns {Promise}
   */
  const updatePassword = (password) => {

  };
  useEffect(() => {
    setIsLoading(false);
    setCurrentUser("user");



  });

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateEmail,
    updatePassword,
    resetPassword,
    reauthenticate,
  };

  return (
      <AuthContext.Provider value={value}>
        {/* dont load children components when Context is Loading */}
        {!isLoading && children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
