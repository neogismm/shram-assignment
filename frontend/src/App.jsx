import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import WhackAMole from "./components/WhackAMole";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import NavBar from "./components/Navbar";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <Router>
      <UserProvider>
        <div className="font-press-start min-h-screen bg-gradient-to-br from-green-700 to-blue-500">
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
      </UserProvider>
    </Router>
  );
}
