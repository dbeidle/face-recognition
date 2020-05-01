import React from "react";
//import "./rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">{`${name}, Total faces counted is...`}</div>
      <div className="white f1"># {entries}</div>
    </div>
  );
};

export default Rank;
