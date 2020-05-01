import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import NavBar from "./components/navbar/navbar";
import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imagelinkform/imagelinkform";
import Rank from "./components/rank/rank";
import FaceRecognition from "./components/face-recognition/face-recognition";
import "./App.css";

const face = new Clarifai.App({
  apiKey: "6e5527729e7e459091dbff937c02dc7d",
});

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    size: {
      value: 4,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
    },
  },
};

class App extends Component {
  state = {
    input: "",
    box: [],
    route: "signin",
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: "",
    },
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    face.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        if (response) {
          let faces = response.outputs[0].data.regions;
          let faceCount = faces.length;
          fetch("http://localhost:3001/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
              faceCount: faceCount,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayFaceBoundary(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage");
    let boxes = [];
    data.outputs[0].data.regions.map((frame, ...otherprops) => {
      const width1 = Number(image.width);
      const height1 = Number(image.height);
      return boxes.push({
        id: frame.id,
        leftCol: frame.region_info.bounding_box.left_col * width1,
        topRow: frame.region_info.bounding_box.top_row * height1,
        rightCol: width1 - frame.region_info.bounding_box.right_col * width1,
        bottomRow:
          height1 - frame.region_info.bounding_box.bottom_row * height1,
      });
    });
    return {
      boxes,
    };
  };

  displayFaceBoundary = (box) => {
    const list = box.boxes;
    this.setState({ box: list });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
      this.setState({ route: "signin" });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
      this.setState({ route: route });
    } else {
      this.setState({ route: route });
    }

    //console.log(this.state.isSignedIn);
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  render() {
    const { isSignedIn, route, box, input } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />

        <NavBar isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        <Logo />
        {route === "home" ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition image={input} box={box} />
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
