import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/registerUser"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Hero /><Register /></>} />
        <Route path="/channels" element={<Home />} />
        <Route path="/channels/:id" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
