import { HashRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from './components/Navbar';
import Detail from './pages/Detail';
import Saved from './pages/Saved';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
          <Route exact path="/">
            <Search/>  
          </Route>
          <Route exact path="/saved">
            <Saved />
          </Route>
          <Route exact path="/books/:id">
            <Detail/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
