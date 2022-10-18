async function saveHousesHandler(event) {
    event.preventDefault();
    const name = $('#house-name').text().split(': ')[1];
    const region = $('#house-region').text().split(': ')[1];
    const coatOfArms = $('#house-coatOfArms').text().split(': ')[1];
    const words = $('#house-words').text().split(': ')[1];
    const titles = $('#house-titles').text().split(': ')[1];
    const seats = $('#house-seats').text().split(': ')[1];
    const newHouse = {
      name, region, coatOfArms, words, titles, seats
    }
    console.log(newHouse)

    const response = await fetch(`/api/houses`, {
      method: 'POST',
      body: JSON.stringify(newHouse),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      console.log(response)
      // document.location.replace('/saved');
    } else {
      alert('Failed to add house');
    }
  }

  $(document).on('click', "#save-house", saveHousesHandler)  //using delegation

  fetch('/api/houses')
  .then(res=>res.json())
  .then(data => {
    console.log(data);
  })
