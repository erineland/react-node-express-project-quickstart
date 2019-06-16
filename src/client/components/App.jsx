import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

const HelloWorld = () => <h1 data-testid="app-title" className="app__title">Hello World</h1>;

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={HelloWorld} />
    </Router>
  )
}

export default App;
