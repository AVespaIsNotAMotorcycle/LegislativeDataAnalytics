import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  Footer,
  Home,
  Local,
  Data,
  Information,
  NotFound,
  City,
  Assembly,
  Senate,
} from './components';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/NotFound" component={NotFound} />
          <Route path="/data/CityData" exact component={City} />
          <Route path="/data/AssemblyData" exact component={Assembly} />
          <Route path="/data/SenateData" exact component={Senate} />
          <Route path="/data" exact component={Data} />
          <Route path="/local-info" exact component={Local} />
          <Route path="/information" exact component={Information} />
          <Route path="*" component={<Navigate to="./NotFound" />} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
