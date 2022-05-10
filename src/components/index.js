import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import { DataProvider } from "./../hooks/DataContext";
import { useLocalStorage } from "./../hooks/useLocalStorage";
import TokenContext from "./../hooks/TokenContext";

import Signin from "./Signin";
//import SignUp from "./Signup";

export default function App() {
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}
