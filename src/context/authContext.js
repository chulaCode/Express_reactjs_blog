import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
 
  let isLogedIn;
  if (currentUser===null){
     isLogedIn=false;
  }else{
    isLogedIn=true;
  }
  
  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
    isLogedIn=true;
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
    isLogedIn=false;
  };
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    
  }, [currentUser]);
  console.log("token",isLogedIn)

  return (
    <AuthContext.Provider value={{ 
      isLogedIn,
      currentUser, 
      login, 
      logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};