const refs = {
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
export const listOfCountries = countries => {
  const markup = countries.reduce((acc, country) => {
    acc += `<li class="countryItem"><img class="countryImage" src="${country.flag}">${country.name}</li>`;
    return acc;
  }, '');

  refs.countryList.innerHTML = markup;
};

export const makeInfo = country => {
  const { name, flag, languages, capital, population } = country;

  const languagesKeys = Object.keys(languages);
  const languagesMarkup = languagesKeys.map(key => languages[key]).join(', ');

  const markup = `
  <h1 class="infoTitle"><img class="infoImage" src="${flag}">${name}</h1>
  <p><span class='label'>Capital: </span><span class='capital'>${capital}</span></p>
  <p><span class='label'>Population: </span><span class='population'>${population}</span></p>
  <p><span class='label'>Languages: </span><span class='languages'>${languagesMarkup}</span></p>`;

  refs.countryInfo.innerHTML = markup;
};
