// функція запиту країн
export const fetchCountries = name => {
  // властивості для фільтру
  const params = 'name,capital,population,flags,languages';
  // посилання для пошуку
  const url = `https://restcountries.com/v3.1/name/${name}?fields=${params}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
