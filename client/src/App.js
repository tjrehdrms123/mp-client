import Login from "./components/login";
import Mainmap from "./components/mainmap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import "./css/index.css";
import Writer from "./components/write";
function App() {
  const localStorageAccessToken = localStorage.getItem("accessToken");
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 로그인 */}
          <Route path="/login" element={<Login />}></Route>
          {/* 회원가입 */}
          <Route path="/register" element={<Register />}></Route>
          {/* 지도에 전체 게시물 노출 */}
          <Route path="/map" element={<Mainmap />}></Route>
          {/* 지도에 특정 회원 게시물 노출 */}
          <Route path="/map/:objectId" element={<Mainmap />}></Route>
          {/* 지도에 글 작성 */}
          <Route path="/writer/:objectId" element={<Writer />}></Route>
          {/* 루트로 접속시 로그인으로 튕기게 막기 */}
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
