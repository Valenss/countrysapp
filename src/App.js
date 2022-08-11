import { Routes, Route } from 'react-router-dom'
import React, { createContext, useState } from 'react';
import Header from './components/Header';
import Countries from './components/Countries';
import Country from './components/Country';
import './index.css';


export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
     <div id={theme}>
        <Header toggleTheme={toggleTheme} theme={theme} setTheme={setTheme} />
        <Routes  >
          <Route  path='/'element={<Countries />} />
        </Routes>
        <Routes>
          <Route  path='/country/:name' element={<Country />} />
        </Routes>
        
    </div>
    </ThemeContext.Provider>
  );
}

export default App;

