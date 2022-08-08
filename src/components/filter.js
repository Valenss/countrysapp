import React, {useState, } from "react";

export default function Filter({countries, regions, setSearchInput, searchInput, setRegionInput }) {

  // const [countries, setCountries] = useState([]);

  return (
    <>
      <section className="form">
       
          <input
            type="search"
            name="search"
            id="search"
            value={searchInput}
            placeholder="Search for a country"
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
        
        <div className="select">
        <select onChange={(e) => setRegionInput(e.target.value)}>
        {regions.map((reg) => (
          <option key={reg}>{reg}</option>
        ))}
      </select>
        </div>
      </section>
    </>
  );
}
