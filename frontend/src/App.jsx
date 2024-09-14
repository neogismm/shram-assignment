import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import WhackAMole from "./components/WhackAMole";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import { UserProvider } from "./contexts/UserContext";
import NavBar from "./components/NavBar";

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <Router>
      <UserProvider>
        <div className="font-press-start min-h-screen bg-gradient-to-br from-green-600 to-blue-500">
          <NavBar />
          <main className="container mx-auto p-4 mt-3">
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
