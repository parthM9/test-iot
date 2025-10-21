import MainLayout from "./components/MainLayout/MainLayout";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <div className="App d-flex flex-column flex-grow-1 h-100">
      <Router>
        <Switch>
          <Route exact path="/" children={<MainLayout />} />
          <Route path="/:connote" children={<MainLayout />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
