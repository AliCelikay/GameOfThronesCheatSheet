//const codEl = $('#codEl');

var charOfDay = function () {
    fetch(`api/cod`)
        .then(response => response.json())
        .then(response => {
            console.log(response[0])
                    let codHtml = `
                    <h3 class="uk-heading-divider uk-card-title
                    ">Character of the Day</h1>
                    <div class="uk-card uk-card-default uk-width-1-.5@m">
                    <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                    <img src="${response.imageUrl}" width="300" height="300" alt="">
                    <h5>Name: ${response.fullName}</h5>
                    <h5>Titles: ${response.title}</h5>
                    <h5>House: ${response.family}</h5>
                    
                    </div>
                    </div>
                    </div>
                    </div>`
                    $('#cod-html').html(codHtml);
                })
        }

charOfDay();