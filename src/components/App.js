import React from 'react';
import { Route, Switch } from "react-router-dom";
import FetchShows from './FetchShows';
import Show from './Show';


function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/Show/:identifier' component={Show}/>
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
