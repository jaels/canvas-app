import React from 'react';
import Header from './Header';
import Draw from './Draw';

import './App.scss';

const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <Header />
      <Draw />
    </div>
  );
}

export default App;
