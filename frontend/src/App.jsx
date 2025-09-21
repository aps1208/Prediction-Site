import {Routes, Route, Navigate} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Prediction from "./Prediction";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/prediction" element={<Prediction/>}/>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
