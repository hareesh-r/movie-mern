import { useState, createContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Movie from './Movie';

export const UserContext = createContext();
function App() {
  const [CurrentUser, setCurrentUser] = useState([]);
  const [CurrentMovie, setCurrentMovie] = useState([]);
  return (
    <UserContext.Provider
      value={{
        CurrentUser,
        setCurrentUser,
        CurrentMovie,
        setCurrentMovie
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/RegisterUser" element={<Login />} />
          <Route path="/LoginUser" element={<Login />} />
          <Route path="/MovieDashboard" element={<Dashboard />} />
          <Route path="/MovieReview" element={<Movie />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider >
  );
}

export default App;
