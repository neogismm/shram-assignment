import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "../contexts/UserContext";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setcount] = useState(null)
  const { user } = useUser();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/leaderboard`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data = await response.json();
        setLeaderboard(data.leaderboard);
        setcount(data.totalCount);
      } catch (err) {
        setError("Error fetching leaderboard. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="flex flex-col space-y-5 text-center overflow-hidden">
      <h2 className="text-2xl font-bold text-center py-4 bg-primary text-primary-foreground">
        Leaderboard
      </h2>
      <h3>Showing top 10 players out of {count}</h3>
      <div className="flex justify-center overflow-x-auto text-center">
        <table className="max-w-2xl w-full border-collapse">
          <thead className="font-bold">
            <tr>
              <th className="px-6 py-3 text-base text-muted-foreground uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-base text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-base text-muted-foreground uppercase tracking-wider">
                High Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {leaderboard.map((entry, index) => (
              <tr key={entry._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {entry.name} {entry._id === user.id ? "(You)" : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {entry.highscore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
