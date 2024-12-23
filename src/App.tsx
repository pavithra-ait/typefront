import React from 'react';
import Routerpage from './Component/Routerpage';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routerpage />
      </BrowserRouter>
    </div>
  );
}

export default App;

