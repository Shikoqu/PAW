import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getUserRole, addUserRole } from "./dbProvider";

export const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const AuthContext = createContext();
let userState;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("guest");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      getUserRole(user?.uid).then((role) => {
        setRole(role);
      });

      userState = user;
      setIsAuthenticated(!!user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user: { ...userState, role: role } }}>
      {children}
    </AuthContext.Provider>
  );
};

export async function signin({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    userState = userCredential.user;
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}

export async function signup({ email, password }) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    userState = userCredential.user;
    await addUserRole(userState.uid, "user");
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}

export async function signout() {
  await signOut(auth);
}
