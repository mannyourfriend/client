import React from "react";


function Matchmaker(props){
// const Matchmaker = ({ onClick }) => {
  return (
    <div className="Matchmaker">
      <button onClick={props.onClick}>Find Match</button>
    </div>
  );
};

export default Matchmaker;