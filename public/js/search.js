// alert("working")
// const bookNames = []
const bookSelectEl = $('#book-select');
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
            let bookHtml = `<div class="card"><h1>${response[0].name}</h1><h2>${response[0].authors[0]}</h2><h3>${response[0].isbn}</h3><h3>${response[0].authors}</h3><h3>${response[0].numberOfPages}</h3><h3>${response[0].released}</h3></div>`
            // $('#root').text(JSON.stringify(response, null, 2))
            $('#root').html(bookHtml);
        })
}
bookSelectEl.on('change', (event) => {
    event.preventDefault();
    var bookTitle = event.target.value
    if (bookTitle === '') return;
    bookMatch(bookTitle);
})


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
            fetch(response[0].allegiances)
                .then(allegiancesResponse => allegiancesResponse.json())
                // This promise has all the previous promises passed into it, therefore we can use 'response' and 'allegiancesResponse'
                .then(allegiancesResponse => {
                    console.log(allegiancesResponse);
                    // with the response we render stuff on page
                    //investigate the response to find the bits of data you definitely want
                    // use a template literal to be passed as html to the root
                    let characterHtml = `<div class="card"><h1>Name: ${response[0].name}</h1>
                    <h2>Culture: ${response[0].culture}</h2>
                    <h3>Aliases: ${response[0].aliases}</h3>
                    <h3>Title: ${response[0].titles}</h3>
                    <h3>House: ${allegiancesResponse.name}</h3></div>`
                    $('#character-html').html(characterHtml);
                })
        })
}
