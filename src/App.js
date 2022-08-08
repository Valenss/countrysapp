import { Routes, Route } from 'react-router-dom'
import React from 'react';
import Header from './components/Header';
import Countries from './components/Countries';
import Country from './components/Country';
function App() {
  return (
     <>
        <Header />
        <Routes  basename={process.env.PUBLIC_URL}>
          <Route exact path='/'element={<Countries />} />
        </Routes>
        <Routes>
          <Route exact path="/countries/:name" element={<Country />} />
        </Routes>
        
    </>
  );
}

export default App;
