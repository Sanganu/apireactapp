import React, { Component } from 'react';
import "./App.css"
import Header from "./components/Header"


class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
        
        <h6>Staff and Student Management System</h6>
    <h4>A Simple app, with GraphQL background and REACT front end</h4>
</header>
<Header />
        </div>     
    )
  }
}

export default App;
