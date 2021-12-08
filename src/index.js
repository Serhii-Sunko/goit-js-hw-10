import './css/styles.css';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputRef: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const listOfCountries = countries => {
  const markup = countries.reduce((acc, country) => {
    acc += `<li class="countryItem"><img class="countryImage" src="${country.flag}">${country.name}</li>`;
    return acc;
  }, '');

  refs.countryList.innerHTML = markup;
};

const makeInfo = country => {
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

const fetchCountries = name => {
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

const DEBOUNCE_DELAY = 300;

const clearAll = () => {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
};

const moreThenTenCountries = () => {
  clearAll();
  Notify.info('Too many matches found. Please enter a more specific name.');
};

const ErrorFunction = () => {
  clearAll();
  Notify.failure('Oops, there is no country with that name');
};

const lessThenTenCountries = countries => {
  clearAll();
  listOfCountries(countries);
};

const onlyOneCountry = country => {
  clearAll();
  makeInfo(country[0]);
};

const afterFetchFunction = result => {
  if (result.length > 10) {
    moreThenTenCountries();
  } else if (result.length > 1 && result.length <= 11) {
    lessThenTenCountries(res);
  } else if (result.length === 1) {
    onlyOneCountry(result);
  }
};

const inputFunction = e => {
  const query = e.target.value.trim();
  if (!query) clearAll();
  else fetchCountries(query).then(afterFetchFunction).catch(ErrorFunction);
};

refs.inputRef.addEventListener('input', debounce(inputFunction, DEBOUNCE_DELAY));
