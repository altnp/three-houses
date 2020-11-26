import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './componenets/About';
import Nav from './componenets/Nav';
import RosterManager from './componenets/RosterManager';
import routes from './routes';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path={routes.about} component={About} />
        <Route path={[`${routes.home}:id`, routes.home]} component={RosterManager} />
      </Switch>
    </Router>
  );
}

export default App;
