async function saveCharacterHandler(event) {
    event.preventDefault();
  
    const name = $('#name').innerhtml;
    const culture = $('#culture').innerhtml;
    const aliases = $('#aliases').innerhtml;
    const title = $('#title').innerhtml;
    const house = $('#houses').innerhtml;

    const response = await fetch(`/api/character`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        culture,
        aliases,
        title,
        house,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add character');
    }
  }
  
  document
  .querySelector('#save-character')
  .addEventListener('click', saveCharacterHandler);
