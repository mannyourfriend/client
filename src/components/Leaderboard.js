import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    const response = await fetch(`/board`);
    const data = await response.json();
    setLeaderboardData(data);
  };

  return (
    <div className="Leaderboard">
      Leaderboard
      <table className="top10">
        <thead>
          <tr>
            <th>Username</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr id={`row-${index}`}>
              <td>{user.username}</td>
              <td>{user.numwins}</td>
              <td>{user.numlosses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
