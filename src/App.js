import React, { Component } from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo.js';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import SignIn from './component/SignIn/SignIn';
import Particles from 'react-particles-js';
import Register from './component/Register/Register';
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
  box: {},
  route: 'signin',
  isSignedIn: false,
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
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }
    return {}
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://obscure-woodland-21761.herokuapp.com/imageurl', {
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
        this.displayFaceBox(this.calculateFaceLocation(response))
      }
    })
    .catch(err => console.log(err));
  }

  countActualization = () => {
    fetch('https://obscure-woodland-21761.herokuapp.com/image', {
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
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true, route: route});
    } else if (route === 'register' || route === 'signin') {
      this.setState({ route: route});
    }
  }

  render() {
    const {isSignedIn, route, box, imageUrl} = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={particleOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>  
        { route === 'home' ? 
        <div> 
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
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
