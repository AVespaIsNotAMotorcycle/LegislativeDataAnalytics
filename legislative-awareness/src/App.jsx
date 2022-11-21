import './App.css';
import React from 'react';

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from 'react-router-dom';
import {
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
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/data/CityData" exact element={<City />} />
        <Route path="/data/AssemblyData" exact element={<Assembly />} />
        <Route path="/data/SenateData" exact element={<Senate />} />
        <Route path="/data" exact element={<Data />} />
        <Route path="/local-info" exact element={<Local />} />
        <Route path="/information" exact element={<Information />} />
        <Route path="*" element={<Navigate to="./NotFound" />} />
      </Switch>
    </Router>
  );
}

export default App;
