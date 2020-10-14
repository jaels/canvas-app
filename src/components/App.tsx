import React from 'react';
import Header from './Header';
import Draw from './Draw';
import Statistics from './Statistics';

import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import '../canvas.scss';

const App: React.FC<{}> = () => {
  return (
    <Router>
      <div className='App'>
        <Route path='/'>
          <Redirect to='/draw' />{' '}
        </Route>
        <Header />
        <Route path='/draw' component={Draw} />
        <Route path='/statistics' component={Statistics} />
      </div>
    </Router>
  );
};

export default App;
