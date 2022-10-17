// alert("working")
// const bookNames = []
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
    // we need to go and fetch the data about this title
    console.log(bookTitle)
    fetch(`/api/books/${bookTitle}`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            // with the response we render stuff on page
            //investigate the response to find the bits of data you definitely want
            // use a template literal to be passed as html to the root
            // We're getting error on line 34, check w/ instructor
            let bookHtml = `<h1 class="uk-heading-divider">Searched Book</h1>
            <div class="uk-card uk-card-default uk-width-1-2@m">
            <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
            <h1>Title: ${response[0].name}</h2>
            <h2>Author: ${response[0].authors[0]}</h2>
            <h2>ISBN: ${response[0].isbn}</h2>
            <h2>Pages: ${response[0].numberOfPages}</h2>
            <h2>Release Date: ${response[0].released}</h2>
            </div>
            </div>
            </div>
            </div>`
            // $('#root').text(JSON.stringify(response, null, 2))
            $('#display-book').html(bookHtml);
        })
}
bookSelectEl.on('change', (event) => {
    event.preventDefault();
    var bookTitle = event.target.value
    if (bookTitle === '') return;
    bookMatch(bookTitle);
})

// fetch('/api/houses')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         const allHouses = data.map(house => {
//             const opEl = $('<option>')
//             opEl.text(house.name);
//             opEl.val(house.name)
//             return opEl;
//         });
//         console.log(allHouses);
//         bookSelectEl.append(allHouses)
//         houseMatch(data);
//     });

// function houseMatch(houseName) {
//     // we need to go and fetch the data about this title
//     console.log(houseName)
//     fetch(`/api/houses/${houseName}`)
//         .then(response => response.json())
//         .then(response => {
//             console.log(response)
//             // with the response we render stuff on page
//             //investigate the response to find the bits of data you definitely want
//             // use a template literal to be passed as html to the root
//             // We're getting error on line 34, check w/ instructor
//             let houseHtml = `<h1 class="uk-heading-divider">Selected House</h1>
//             <div class="uk-card uk-card-default uk-width-1-2@m">
//             <div class="uk-card-header">
//             <div class="uk-grid-small uk-flex-middle" uk-grid>
//             <div class="uk-width-expand">
//             <h1>House: ${response[0].name}</h2>
//             <h2>Region: ${response[0].region}</h2>
//             <h2>Coat of arms: ${response[0].coatOfArms}</h2>
//             <h2>Words: ${response[0].words}</h2>
//             <h2>Associated titles: ${response[0].titles}</h2>
//             <h2>Seat(s): ${response[0].seats}
//             </div>
//             </div>
//             </div>
//             </div>`
//             // $('#root').text(JSON.stringify(response, null, 2))
//             $('#display-book').html(houseHtml);
//         })
// }
// houseSelectEl.on('change', (event) => {
//     event.preventDefault();
//     var houseName = event.target.value
//     if (houseName === '') return;
//     bookMatch(houseName);
// })


submitBtn.on("click", function (event) {
    event.preventDefault();
    // .val() grabs the value stored inside the textbox, then we assign the value to the var
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
                // This promise has all the previous promises passed into it, therefore we can use 'response' and 'allegiancesResponse'
                .then(allegiancesResponse => {
                    console.log(allegiancesResponse);
                    // with the response we render stuff on page
                    //investigate the response to find the bits of data you definitely want
                    // use a template literal to be passed as html to the root
                    let characterHtml = `
                    <h1 class="uk-heading-divider">Searched Character</h1>
                    <div class="uk-card uk-card-default uk-width-1-2@m">
                    <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                    <h1>Name: ${response[0].name}</h1>
                    <h2>Culture: ${response[0].culture}</h2>
                    <h2>Aliases: ${response[0].aliases}</h2>
                    <h2>Title: ${response[0].titles}</h2>
                    <h2>House: ${allegiancesResponse.name}</h2>
                    </div>
                    </div>
                    </div>
                    </div>`
                    $('#character-html').html(characterHtml);
                })
        })
}

