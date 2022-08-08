import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "./filter";

const url = "https://restcountries.com/v2/all";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(url);
      const countries = await response.json();
      setCountries(countries);
    };
    fetchCountryData();
  }, []);

  const searchCountries = (searchValue) => {
    setSearchInput(searchValue);

    if (searchInput) {
      const filteredCoutries = countries.filter((country) =>
        Object.values(country)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFiltered(filteredCoutries);
    } else {
      setFiltered(countries);
    }
  };

  const removeCountry = (numericCode) => {
    const newCountry = countries.filter(
      (country) => country.numericCode !== numericCode
    );
    setCountries(newCountry);
  };

  return (
    <>
      <Filter
        searchCountries={searchCountries}
        searchInput={searchInput}
        setCountries={setCountries}
      />
      {searchInput.length > 0 ? (
        <section className="countries">
          {filtered.map(
            ({ numericCode, name, population, region, capital, flag }) => (
              <article key={numericCode}>
                <div>
                  <img src={flag} alt={name}></img>
                  <div className="details">
                    <h3 className="country-name">{name}</h3>
                    <h4>
                      Population: <span>{population}</span>
                    </h4>
                    <h4>
                      Region: <span>{region}</span>
                    </h4>
                    <h4>
                      Capital: <span>{capital}</span>
                    </h4>
                    <div className="buttons">
                      <Link
                        to={`/countries/${name}`}
                        className="btn"
                        key={numericCode}
                      >
                        Learn more
                      </Link>
                      <button
                        className="btn"
                        onClick={() => removeCountry(numericCode)}
                      >
                        Remove Country
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          )}
        </section>
      ) : (
        <section className="countries">
          {countries.map(
                ({ numericCode, name, population, region, capital, flag }) => (
                  <article key={numericCode}>
                    <div>
                      <img src={flag} alt={name}></img>
                      <div className="details">
                        <h3 className="country-name">{name}</h3>
                        <h4>
                          Population: <span>{population}</span>
                        </h4>
                        <h4>
                          Region: <span>{region}</span>
                        </h4>
                        <h4>
                          Capital: <span>{capital}</span>
                        </h4>
                        <div className="buttons">
                          <Link
                            to={`/countries/${name}`}
                            className="btn"
                            key={numericCode}
                          >
                            Learn more
                          </Link>
                          <button
                            className="btn"
                            onClick={() => removeCountry(numericCode)}
                          >
                            Remove Country
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              )
            }
          
        </section>
      )}
    </>
  );
}
