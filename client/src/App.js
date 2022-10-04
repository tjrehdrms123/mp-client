import Login from "./components/login";
import Memo from "./components/memo";
function App() {
  const localStorageAccessToken = localStorage.getItem('accessToken');  
  return (
    <>
    {
      localStorageAccessToken ? <Memo/> : <Login/>
    }
    </>
  );
}

export default App;
