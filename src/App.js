import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Home from './Pages/Home';
import ListUsers from './Pages/ListUsers';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/edit/:id">
            <Home />
          </Route>
          <Route path="/list-users">
            <ListUsers />
          </Route>
        </Switch>
      </BrowserRouter>
   </>
  );
}

// return foi pego da documentaçao
// https://reactrouter.com/web/guides/quick-start

export default App;
