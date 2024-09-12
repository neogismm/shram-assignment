import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import WhackAMole from "./components/WhackAMole";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import NavBar from "./components/Navbar";

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
        <NavBar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={<WhackAMole score={score} setScore={setScore} />}
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
