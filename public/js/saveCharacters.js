async function saveCharacterHandler(event) {
    event.preventDefault();
    const name = $('#char-name').text().split(': ')[1];
    const culture = $('#char-culture').text().split(': ')[1];
    const aliases = $('#char-aliases').text().split(': ')[1];
    const title = $('#char-title').text().split(': ')[1];
    const house = $('#char-house').text().split(': ')[1];
    const newChar = {
      name, culture, aliases, title, house
    }
    console.log(newChar)

    const response = await fetch(`/api/characters`, {
      method: 'POST',
      body: JSON.stringify(newChar),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      console.log(response)
      // document.location.replace('/saved');
    } else {
      alert('Failed to add character');
    }
  }

  $(document).on('click', "#save-character", saveCharacterHandler)  //using delegation

  fetch('/api/characters')
  .then(res=>res.json())
  .then(data => {
    console.log(data);
  })
