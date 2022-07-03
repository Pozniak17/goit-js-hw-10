import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';

import { buildMarkup } from './js/buildMarkup';
import { createCard } from './js/buildMarkup';
import { fetchCountries } from './js/fetchCountries';

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

  cleanResult();
  // значення з інпуту. метод trim() видаляє останні і попередні пробіли
  const nameCountryInInput = evt.target.value.trim();

  // якщо пустий рядок, не виконувати пошук
  if (nameCountryInInput === '') {
    return;
  }

  // передаємо значення з інпуту в функцію пошуку країни
  // при успішному запиті виконуємо в then функцію створення розмітки
  fetchCountries(nameCountryInInput)
    .then(country => {
      if (country.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (country.length >= 2 && country.length <= 10) {
        refs.countryList.innerHTML = buildMarkup(country);
      } else if (country.length === 1) {
        refs.countryInfo.insertAdjacentHTML('beforeend', createCard(country));
      }
    })
    .catch(onError);

  // якщо пустий рядок, не виконувати пошук
  if (nameCountryInInput === '') {
    return;
  }
}

// функція очистки списків
function cleanResult() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

// функція для обробки помилки
function onError() {
  cleanResult();
  Notify.failure('Oops, there is no country with that name');
}
