import Login from "./components/login";
import Mainmap from "./components/mainmap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import "./css/index.css";
function App() {
  const localStorageAccessToken = localStorage.getItem("accessToken");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/map" element={<Mainmap />}></Route>
          <Route path="/map/:objectId" element={<Mainmap />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
