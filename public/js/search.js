// alert("working")
// const bookNames = []
const bookSelectEl = $('#book-select');
fetch('/api/books')
.then(res => res.json())
.then(data =>{
    console.log(data);
    const bookNames = data.map(book => 
        {
           const opEl = $('<option>')
           opEl.text(book.name);
           opEl.val(book.name)
           return opEl;
        });
    console.log(bookNames);
    bookSelectEl.append(bookNames)
    bookMatch(data);
});

function bookMatch(bookTitle){
    // we need to go and fetch the data about this title
    console.log(bookTitle)
    fetch(`/api/books/${bookTitle}`)
    .then(response => response.json())
    .then(response =>{
        console.log(response)
        // with the response we render stuff on page
        //investigate the response to find the bits of data you definitely want
        // use a template literal to be passed as html to the root
        let bookHtml = `<div class="card"><h1>${response[0].name}</h1><h2>${response[0].authors[0]}</h2></div>`
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