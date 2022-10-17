const submitBtn = $('#submit-btn-el');
const codEl = $('#codEl');

submitBtn.on("click", function (event) {
    event.preventDefault();
    // .val() grabs the value stored inside the textbox, then we assign the value to the var
    charofDay();
})

var charOfDay = function (getCoD) {
    fetch(`api/cod`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
           
                    let characterHtml = `
                    <h1 class="uk-heading-divider">Searched Character</h1>
                    <div class="uk-card uk-card-default uk-width-1-2@m">
                    <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                    <h1>fullName: ${response[0].fullName}</h1>
                    <h2>title: ${response[0].title}</h2>
                    <h2>family: ${response[0].family}</h2>
                    <h2>${response[0].image}</h2>
                    <h2>${response.imageUrl}</h2>
                    </div>
                    </div>
                    </div>
                    </div>`
                    $('#character-html').html(characterHtml);
                })
        }