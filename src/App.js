import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
      textInput: 'water'
    };
  }

  componentDidMount(){
    this.ReloadImages();
  }
  ReloadImages = () =>{

    alert(process.env.REACT_APP_API_KEY);
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&tags=nyc&per_page=10&page=1&format=json&nojsoncallback=1')
    .then(function(response){
      return response.json();
    })
    .then(function(j){
      alert(JSON.stringify(j));
      let picArray = j.photos.photo.map((pic) => {
        
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return(
          <img alt="water" src={srcPath}></img>
        )
      })
      this.setState({pictures: picArray});
    }.bind(this))
  }
  

  HandleChange = (e) =>{
    this.setState({textInput: e.target.value});

  }
  Delay = (function(){
    var timer = 0;
    return function(callback , ms){
      clearTimeout(timer);
      timer = setTimeout(callback , ms);
    };
  })();

  // infinite scroll
  const 

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <div
        
        class = "myDiv">
          <i class="fas fa-search"></i>
          <p>
          <input type="text" placeholder="Search.." className="textInput"
          onChange = {this.HandleChange}
          onKeyUp = {() => this.Delay(function(){
            this.ReloadImages();
          }.bind(this) , 1000)}
        
        ></input>
          </p>
          
        </div>
        <p className="App-intro">
          {this.state.pictures}
        </p>
        

      </div>
    );
  }
}

export default App;
