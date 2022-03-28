function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
function dataHandler(array) {
  console.log('inside data h');
  const target = document.querySelector('.resto');
  target.innerHTML = '';
  const range = [...Array(15).keys()];
  const callFuncKey = range.map((elm) => {
    const index = getRandomIntInclusive(0, array.length);
    return array[index];
  })

  callFuncKey.forEach((item) => {
    const str = `<li>${item.name}</li>`
    target.innerHTML += str
  })
}
async function mainEvent() { // the async keyword means we can make API requests
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson);
  const form = document.querySelector('.main_form');
  if (arrayFromJson.data.length > 0) {
    console.log('automatically fires after loading');
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      dataHandler(arrayFromJson.data);
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
