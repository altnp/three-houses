import Nav from "./componenets/Nav";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route path="/hello" render={() => <div>hello</div>}/>
                    <Route path="/world">
                        <div>World</div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
