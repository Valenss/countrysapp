import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useParams,
} from "react";
import { Link } from "react-router-dom";
import Country from "./Country";
import Filter from "./filter";

const url = "https://restcountries.com/v2/all";

export default function Countries() {
  const [countries, setCountries] = useState([]);
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

      <section className="countries">
       
          {filteredCountries().length === 0 && <p>No hay resultados</p>}

          {filteredCountries().map((country) => (
            
            <article key={country.numericCode}>
               <Link
          to={`/country/${country.name}`}
          countries={countries}
         
          key={country.numericCode}
        >
              <div>
                <img
                  className="flag"
                  src={country.flag}
                  alt={country.name}
                ></img>
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
                </div>
              </div>
              </Link>
            </article>
          ))}
    
      </section>
    </>
  );
}
