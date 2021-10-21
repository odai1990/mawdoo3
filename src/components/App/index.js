import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PagesAndEventListner from './PagesAndEventListner';

const App = () => {
  return (<Router>
    <PagesAndEventListner />
  </Router>);
}

export default App;