import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

//cors not enabled on the server ??
//not finished

const Search = ({ search, setSearch }) => {
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getRidOfCors = "https://cors-anywhere.herokuapp.com/";
    axios
      .get(
        `${getRidOfCors}https://studies.cs.helsinki.fi/restcountries/api/all`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  loading && <div>Loading...</div>;
  error && <div>Error...</div>;

  return (
    <div>
      <Search setSearch={setSearch} search={search} />
      {data &&
        data.map((country) => {
          return (
            <div key={country.name.official}>
              <h1>{country.name.official}</h1>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
              <img src={country.flags.png} alt="flag" width="100px" />
            </div>
          );
        })}
    </div>
  );
};
export default App;
