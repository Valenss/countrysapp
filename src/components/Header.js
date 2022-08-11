import React from 'react';
import App from '../App';
export default function Header({toggleTheme, theme}) {
  return (
    <>
        <header className='header'>
            <div>
                <h1>Where in the world?</h1>
            </div>

            <div>
            <i onClick={toggleTheme} checked={theme === "dark"} className="bx bx-moon change-theme" id='theme-button'></i>
            </div>
        </header>
    </>
  )
};