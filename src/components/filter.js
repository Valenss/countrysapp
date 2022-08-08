import React, {useState, useEffect} from "react";
import axios from "axios";

export default function Filter({ searchCountries, searchInput, setCountries }) {

  // const [countries, setCountries] = useState([]);
  const [filteredRegion, setfilteredRegion] = useState([]);

  const region = [
    {name: "Africa",},{name: "Asia",},{name: "Americas",},{name: "Europe",},{name: "Oceania",},
  ];


  const fetchCountryByRegion = async () => { 
    const url= (`https://restcountries.com/v3.1/region/${filteredRegion}`);
    
    const res = await axios.get(url);
    
   
    setCountries(res.data);
    console.log(res.data);

  }
  

  useEffect(() => {

  
    fetchCountryByRegion();
    
  },[filteredRegion]);

  console.log(filteredRegion);



  return (
    <>
      <section className="form">
        <form className="form-control">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for a country"
            value={searchInput}
            onChange={(e) => searchCountries(e.target.value)}
          ></input>
        </form>
        <div className="select">
          <select
            name="select"
            id="select"
            value={filteredRegion}
            onChange={(e) => {setfilteredRegion(e.target.value)}}
          >
 <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Oceania">Oceania</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          </select>
        </div>
      </section>
    </>
  );
}
