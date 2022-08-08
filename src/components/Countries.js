import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import Filter from "./filter";


const url = "https://restcountries.com/v2/all";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [regionInput, setRegionInput] = useState("All");


  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(url);
      const countries = await response.json();
      setCountries(countries);
    };
    fetchCountryData();
  }, []);


  const removeCountry = (numericCode) => {
    const newCountry = countries.filter(
      (country) => country.numericCode !== numericCode
    );
    setCountries(newCountry);
  };

  const regions = useMemo(
    () =>
      countries
        .map((country) => country.region)
        .reduce(
          (prev, curr) => {
            if (!prev.includes(curr)) {
              return [curr, ...prev];
            }
            return prev;
          },
          ["All"]
        ),
    [countries]
  );

  const filteredCountries = useCallback(() => {
    const filtered = countries.filter(
      (country) =>
        (country.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          country.capital?.toLowerCase().includes(searchInput.toLowerCase())) &&
        country.region.includes(regionInput === "All" ? "" : regionInput)
    );

    return filtered;
  }, [countries, searchInput, regionInput]);

  
  return (
    <>
      <Filter
        searchInput={searchInput}
        setCountries={setCountries}
        regions={regions}
        setSearchInput={setSearchInput}
        regionInput={regionInput}
        setRegionInput={setRegionInput}      
        />
   
      {filteredCountries().length === 0 && <p>No hay resultados</p>}

      {filteredCountries().map((country) => (
        
        <section className="countries">
              <article key={country.numericCode}>
                <div>
                  <img src={country.flag} alt={country.name}></img>
                  <div className="details">
                    <h3 className="country-name">{country.name}</h3>
                    <h4>
                      Population: <span>{country.population}</span>
                    </h4>
                    <h4>
                      Region: <span>{country.region}</span>
                    </h4>
                    <h4>
                      Capital: <span>{country.capital}</span>
                    </h4>
                    <div className="buttons">
                      <Link
                        to={`/countries/${country.name}`}
                        className="btn"
                        key={country.numericCode}
                      >
                        Learn more
                      </Link>
                      <button
                        className="btn"
                        onClick={() => removeCountry(country.numericCode)}
                      >
                        Remove Country
                      </button>
                    </div>
                  </div>
                </div>
              </article>
        </section>
      ))}
    </>
  );
}
