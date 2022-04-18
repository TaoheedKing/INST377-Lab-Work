function getRandomIntInclusive(min, max) {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min);
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max);
  // eslint-disable-next-line max-len
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function inject(array) {
  console.log('after array is passed in');
  const target = document.querySelector('.resto');
  target.innerHTML = '';
  array.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  });
}

function dataHandler(array) {
  console.log('inside data h');
  const target = document.querySelector('.resto');
  target.innerHTML = '';
  const range = [...Array(15).keys()];
  return range.map((elm) => {
    const index = getRandomIntInclusive(0, array.length);
    return array[index];
  });
//   inject(callFuncKey);
//   return callFuncKey;
}

async function mainEvent() { // the async keyword means we can make API requests
  const restName = document.querySelector('#name');
  const zipName = document.querySelector('#food');
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson);
  const form = document.querySelector('.main_form');
  let currentArray = [];
  if (arrayFromJson.data.length > 0) {
    console.log('automatically fires after loading');
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      currentArray = dataHandler(arrayFromJson.data);
      console.log(currentArray);
      inject(currentArray);
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
    });
  }
  restName.addEventListener('input', (event) => {
    if (!currentArray.length) {
      return;
    }
    // eslint-disable-next-line max-len
    const restaurants = currentArray.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log(restaurants, 'filtering');
    inject(restaurants);
  });

  zipName.addEventListener('input', (event) => {
    if (!currentArray.length) {
      return;
    }
    // eslint-disable-next-line max-len
    const restaurants = currentArray.filter((item) => item.zip.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log(restaurants, 'filtering');
    inject(restaurants);
  });
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests