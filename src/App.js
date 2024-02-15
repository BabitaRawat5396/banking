import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Page/Login";
import Register from "./Page/Register";
import Dashboard from "./Page/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/my-profile" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
