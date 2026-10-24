
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./sheared/navbar";
import Footer from "./sheared/footer";
import Login from "./pages/login";
import Home from "./pages/Home/Home";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
