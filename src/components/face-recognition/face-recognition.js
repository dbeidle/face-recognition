import React from "react";
import "./face-recognition.css";

const FaceRecognition = ({ image, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          alt=""
          src={`${image}`}
          width="500px"
          height="auto"
          id="inputimage"
        />
        {box.map((face) => (
          <div
            key={face.id}
            className="bounding-box"
            style={{
              top: face.topRow,
              right: face.rightCol,
              bottom: face.bottomRow,
              left: face.leftCol,
            }}></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
