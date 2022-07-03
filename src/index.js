import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries';
import { buildMarkup } from './js/buildMarkup';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

// console.log(refs.countryList);
// console.log(refs.countryInfo);

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInputTarget, DEBOUNCE_DELAY));

// функція інпута
function onInputTarget(evt) {
  evt.preventDefault();
  // значення з інпуту. метод trim() видаляє останні і попередні пробіли
  const nameCountryInInput = evt.target.value.trim();

  // передаємо значення з інпуту в функцію пошуку країни
  // при успішному запиті виконуємо в then функцію створення розмітки
  fetchCountries(nameCountryInInput).then(country => {
    refs.countryList.innerHTML = buildMarkup(country);
  });

  // якщо пустий рядок, не виконувати пошук
  if (nameCountryInInput === '') {
    return;
  }
}
