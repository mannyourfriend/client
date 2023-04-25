import React from "react";
import "./App.css";
import Checkerboard from "./components/Checkerboard";

function App() {
  const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div className="App">
      Leaderboard
      <table className="top10">
          <th> Username </th>
          <th> Wins </th>
          <th> Losses </th>
          <tr id="first"> 
              <td> User1 </td>
              <td> Wins </td>
              <td> Losses </td>
          </tr>
          <tr id="second"> 
              <td> User2 </td>
              <td> Wins </td>
              <td> Losses </td>
          </tr>
          <tr id="third"> 
              <td> User3 </td>
              <td> Wins </td>
              <td> Losses </td>
          </tr>
          <tr id="fourth"> 
              <td> User4 </td>
              <td> Wins </td>
              <td> Losses </td>
          </tr>
          <tr id="fifth">
              <td> User5 </td>
              <td> Wins </td>
              <td> Losses </td>
          </tr>
          <tr id="sixth"> 
              <td> User6 </td>
              <td> Wins </td>
              <td> Losses </td>
          </tr>
          <tr id="seventh"> 
              <td> User7 </td>
              <td> Wins </td>
              <td> Losses </td>
          </tr>
          <tr id="eighth"> 
              <td> User8 </td>
              <td> Wins </td>
              <td> Losses </td>
          </tr>
          <tr id="ninth"> 
              <td> User9 </td>
              <td> Wins </td>
              <td> Losses </td>
          </tr>
          <tr id="tenth"> 
              <td> User10 </td>
              <td> Wins </td>
              <td> Losses </td>
          </tr>
      </table>
      <div className="checkerboard-container">
        <Checkerboard/>
      </div>
    </div>
  );
}

export default App;