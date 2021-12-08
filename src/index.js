import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { makeInfo, listOfCountries } from './js/makeMarkup';

const refs = {
  inputRef: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
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
