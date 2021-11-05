import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Login from './Login';
import Home from './Home';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/menu" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// NOTE: everything below is just for debugging.
function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
function getCookie(cookie) {
  return document.cookie
  .split('; ')
  .find(row => row.startsWith(cookie + '='))
  .split('=')[1];
}
//deleteAllCookies();
//document.cookie = 'account_email=admin@gmail.com;'; document.cookie='account_pwd=password123;'
//console.log(getCookie('account_email'));
