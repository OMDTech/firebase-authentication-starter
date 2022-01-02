import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";


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
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  /**
   * re authenticate  when  email or password changed
   * New Token will generated each time we change email or password
   * Used to avoid token expired and get new token after email or password changed
   * @param {String} currentPassword 
   * @returns {Promise}
   */
  const reauthenticate = (currentPassword) => {
    let cred = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    return currentUser.reauthenticateWithCredential(cred);
  };

  /**
   * Log in using email and passwod
   * @param {String} email
   * @param {String} password
   * @returns {Promise}
   */
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  /**
   * log out
   * @returns {Promise}
   */
  const logout = () => {
    return auth.signOut();
  };
  /**
   * Sign up using email and passwod
   * @param {String} email
   * @param {String} password
   * @returns {Promise}
   */
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  /**
   * Update current User email
   * @param {String} email
   * @param {String} password
   * @returns {Promise}
   */
  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };
  /**
   *  Update current User password
   * @param {String} email
   * @param {String} password
   * @returns {Promise}
   */
  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };
  useEffect(() => {
    //set current user once the user signup or login
    const unsubsecribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubsecribe;
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
