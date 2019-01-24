import React, { Component } from 'react';
import './App.css';
import Button from './components/button/button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button text="My Button" border="error" />
        </header>
      </div>
    );
  }
}

export default App;
