import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/registerUser"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Hero />
          <Register />
        </Route>
        <Route exact path="/channels">
          <Home />
        </Route>
        <Route exact path="/channels/:id">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
