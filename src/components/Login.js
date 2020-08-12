import React, { useState } from 'react';
 
function Login(props) {

  return (
    <div>
      Login
      <div>
        Username<br />
        <input type="text" placeholder="Enter your username" />
      </div>
      <div>
        Password<br />
        <input type="password" placeholder="Enter your username"  />
      </div>
    </div>
  );
}
 
export default Login;