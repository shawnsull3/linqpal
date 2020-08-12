import React, { useState } from 'react';
import '../styles/App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
 
import Login from './Login';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/login" component={Login} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}
 
export default App;