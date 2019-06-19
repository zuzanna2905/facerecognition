import React, { Component } from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo.js';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import SignIn from './component/SignIn/SignIn';
import Particles from 'react-particles-js';
import Register from './component/Register/Register';
import Modal from './component/Modal/Modal';
import Profile from './component/Profile/Profile'
import './App.css';

const particleOptions ={
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user : {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    if(data){
      const clarifaiFaces = data.outputs[0].data.regions.map(region => {
        return region.region_info.bounding_box;
      })
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      const faces = clarifaiFaces.map(face => 
        { return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }})
      return faces;
    }
    return {}
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response){
        this.countActualization();
        this.displayFaceBoxes(this.calculateFaceLocation(response))
      }
    })
    .catch(err => console.log(err));
  }

  countActualization = () => {
    fetch('http://localhost:3001/image', {
      method: 'put',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user, {entries: count}))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if( route === 'signout'){
      return this.setState(initialState)
    } else if (route === 'home') {
      return this.setState({ isSignedIn: true, route: route});
    } else if (route === 'register' || route === 'signin') {
      return this.setState({ route: route});
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  render() {
    const {isSignedIn, route, boxes, imageUrl, isProfileOpen} = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={particleOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange} toggleModal={this.toggleModal}/>  
        {isProfileOpen ? 
          <Modal >
            <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal}/>
          </Modal> : null }
        { route === 'home' ? 
        <div> 
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
        </div>
        : (
          route === 'signin' ?       
            <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
          : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            )
      }
      </div>
    );
  }
}

export default App;
