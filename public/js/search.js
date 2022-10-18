const bookSelectEl = $('#book-select');
const houseSelectEl = $('#house-select');
const characterSearchEl = $('#character-search-el');
const submitBtn = $('#submit-btn-el');

fetch('/api/books')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const bookNames = data.map(book => {
            const opEl = $('<option>')
            opEl.text(book.name);
            opEl.val(book.name)
            return opEl;
        });
        console.log(bookNames);
        bookSelectEl.append(bookNames)
        bookMatch(data);
    });

function bookMatch(bookTitle) {
    console.log(bookTitle)
    fetch(`/api/books/${bookTitle}`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let bookHtml = `<h1 class="uk-heading-divider">Searched Book</h1>
            <div class="uk-card uk-card-default uk-width-1-2@m">
            <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
            <h4>Title: ${response[0].name}</h4>
            <h4>Author: ${response[0].authors[0]}</h4>
            <h4>ISBN: ${response[0].isbn}</h4>
            <h4>Pages: ${response[0].numberOfPages}</h4>
            <h4>Release Date: ${response[0].released}</h4>
            </div>
            </div>
            </div>
            </div>`
            $('#display-book').html(bookHtml);
        })
}
bookSelectEl.on('change', (event) => {
    event.preventDefault();
    var bookTitle = event.target.value
    if (bookTitle === '') return;
    bookMatch(bookTitle);
})



function houseMatch(houseId) {
    console.log(houseId)
    fetch(`/api/houses/${houseId}`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let houseHtml = `<h1 class="uk-heading-divider">Selected House</h1>
            <div class="uk-card uk-card-default uk-width-1-2@m">
            <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
            <h2>Name: ${response.name}</h2>
            <h2>Region: ${response.region}</h2>
            <h2>Coat of Arms: ${response.coatOfArms}</h2>
            <h2>Words: ${response.words}</h2>
            <h2>Titles: ${response.titles}</h2>
            <h2>Seats: ${response.seats}</h2>
            </div>
            </div>
            </div>
            </div>`
            $('#display-house').html(houseHtml);
        })
}

houseSelectEl.on('change', (event) => {
    event.preventDefault();
    var houseId = event.target.value
    if (houseId === '') return;
    houseMatch(houseId);
})

submitBtn.on("click", function (event) {
    event.preventDefault();
    var characterInput = characterSearchEl.val();
    searchCharacterFunction(characterInput);
})

var searchCharacterFunction = function (characterInput) {
    fetch(`/api/characters/${characterInput}`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            fetch(response[0].allegiances[0])
                .then(allegiancesResponse => allegiancesResponse.json())
                .then(allegiancesResponse => {
                    console.log(allegiancesResponse);
                    let characterHtml = `
                    <h1 class="uk-heading-divider uk-card-title">Searched Character</h1>
                    <div class="uk-card uk-card-default uk-width-1-2@m">
                    <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                    <h2 id="char-name" value="${response[0].name}">Name: ${response[0].name}</h2>
                    <h2 id="char-culture" value="${response[0].culture}">Culture: ${response[0].culture}</h2>
                    <h2 id="char-aliases" value="${response[0].aliases}">Aliases: ${response[0].aliases}</h2>
                    <h2 id="char-title" value= "${response[0].titles}">Title: ${response[0].titles}</h2>
                    <h2 id="char-house" value="${allegiancesResponse.name}">Houses: ${allegiancesResponse.name}</h2>
                    </div>
                    </div>
                    </div>
                    </div>
                    <button id="save-character" class="uk-button uk-button-default">Save Character</button>`
                    $('#character-html').html(characterHtml);
                })
        })
}

