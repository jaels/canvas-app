import React from 'react';
import Header from './Header';
import Draw from './Draw';
import Statistics from './Statistics';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

const App: React.FC<{}> = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Route exact path={['/', '/draw']} component={Draw} />
        <Route path='/statistics' component={Statistics} />
      </div>
    </Router>
  );
};

export default App;
