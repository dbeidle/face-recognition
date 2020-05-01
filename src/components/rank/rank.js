import React from "react";
//import "./rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div>
        <h1 className="white f3">{name}, You're rank is ...</h1>
      </div>
      <div>
        <h2 className="white f1"> # {entries} </h2>
      </div>
    </div>
  );
};

export default Rank;
