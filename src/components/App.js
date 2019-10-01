import React from 'react';
import { Route, Switch } from "react-router-dom";
import FetchShows from './FetchShows';
import Show from './Show';
import Versions from './Versions';


function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/Show/:identifier' component={Show}/>
        <Route path='/Versions/:date' component={Versions}/>
      </Switch>
    </main>
  );
}

function Home() {
  return (
    <div>
      <FetchShows />
    </div>
  );
}


export default Main;
