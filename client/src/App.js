import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NewProperty from './views/NewProperty';
import PropertiesList from './views/PropertiesList';
import DetailProperty from './views/DetailProperty';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/nueva-propiedad">
            <NewProperty />
          </Route>
          <Route exact path="/propiedades">
            <PropertiesList/>
          </Route>
          <Route exact path="/ver-propiedad/:id">
            <DetailProperty/>
          </Route>
          <Route exact path="/modificar-propiedad/:id">
            <NewProperty/>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
