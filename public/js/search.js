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

function bookMatch(data){
if("A Game of Thrones" === data[0].name){
    console.log(data[0]);
}
}