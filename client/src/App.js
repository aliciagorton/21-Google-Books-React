import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Saved from './components/Saved';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
          <Route exact path="/">
            <Saved />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
