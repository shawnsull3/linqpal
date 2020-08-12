import React from 'react';
import '../styles/App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
 
import Login from './Login';
import Admin from './Admin';
import Client from './Client';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/home" component={Client} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}
 
export default App;