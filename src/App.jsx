import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './componenets/Nav';
import routes from './routes';

function App() {
  return (
    <Router>
      <div>
        <Nav helloText="NICK" worldText="ALT" />
        <Switch>
          <Route path={routes.hello} render={() => <div>hello world</div>} />
          <Route path={routes.world}>
            <div>Hello World</div>
          </Route>
          <Route>
            <div>Hello World</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
