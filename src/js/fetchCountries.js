export const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(res =>
      res.map(item => ({
        name: item.name.official,
        flag: item.flags.svg,
        capital: item.capital,
        languages: item.languages,
        population: item.population,
      })),
    );
};
