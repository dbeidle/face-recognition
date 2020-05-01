import React from "react";
import "./imagelinkform.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        This brains behind this page will detect faces in your pictures. <br />{" "}
        Give it a whirl..
      </p>

      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
          />
          <button
            className="w-30 f4 link ph3 pv2 dib white bg-light-purple grow"
            onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
