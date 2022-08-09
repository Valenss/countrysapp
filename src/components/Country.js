import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../country.css";

const Country = () => {
  const [country, setCountry] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(`https://restcountries.com/v2/name/${name}
      `);
      const country = await response.json();
      setCountry(country);
    };
    fetchCountryData();
  }, [name]);
  return (
    <>
      <section className="country">
        <Link to="/" className="btn btn-light">
          <i className="fas fa-arrow-left"></i> Back Home
        </Link>
        {country.map((c) => {
          const {
            numericCode,
            flag,
            name,
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            currencies,
            languages,
            borders,
          } = c;
          return (
            <article key={numericCode}>
              <div className="country-inner">
                <div className="country-flag">
                  <img src={flag}></img>
                </div>
                <div>
                  <div className="country-details">
                    <div>
                      <h2>{name}</h2>
                      <h5>
                        Native Name: <span>{nativeName}</span>
                      </h5>
                      <h5>
                        Population: <span>{population}</span>
                      </h5>
                      <h5>
                        Region: <span>{region}</span>
                      </h5>
                      <h5>
                        Subregion: <span>{subregion}</span>
                      </h5>
                      <h5>
                        Capital: <span>{capital}</span>
                      </h5>
                    </div>
                    <div>
                      <h5>
                        Top level domain: <span>{topLevelDomain}</span>
                      </h5>
                      <h5>
                        Currencies: <span>{currencies[0].name}</span>
                      </h5>
                      <h5>
                        Lenguages: <span>{languages[0].name}</span>
                      </h5>
                    </div>
                 
                  </div>

                  <div>
                      <h3>Border Countries:</h3>

                      <div className="borders">
                        {borders?.length > 0 ? (
                          borders?.map((border) => {
                            return (
                              <ul key={border}>
                                <Link to={`/country/${border.toLowerCase()}`}>
                                  <li className="borders-li">{border}</li>{" "}
                                </Link>
                              </ul>
                            );
                          })
                        ) : (
                          <p className="no-borders">
                            There is no border countries
                          </p>
                        )}
                      </div>
                    </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Country;
