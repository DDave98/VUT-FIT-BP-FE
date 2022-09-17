/* 
    description: Tato stranka slouzi jako uvodni
    autor: David Michalica
*/

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import appRoutesList from "./Constants/pagesRoute";

class App extends Component
{

   GetListOfRouteComponent(routesList, topKey)
  { 
    return routesList.map(
      ({path, component, children}, key) =>
      children.lenght < 0 ?
      <Route exact path={path} component={component} key={topKey+"."+key} /> :
      (
        <Route exact path={path} component={component} key={topKey+"."+key}>
          {this.GetListOfRouteComponent(children, topKey)}
        </Route>
      )
    );
  }

  render()
  {
    const routeComponents = this.GetListOfRouteComponent(appRoutesList);

    return (
    <div className="App">
      <Router>
        <Switch>
          {routeComponents}
          <Redirect from='/*' to="/404"/>
        </Switch>
      </Router>
    </div>
  );
  }  
}

export default App;
