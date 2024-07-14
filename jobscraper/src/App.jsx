import React from 'react';
import Scraper from './components/Scraper';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Scraper />} />
        </Routes>
      </Router>


    </>
  )
}

export default App



