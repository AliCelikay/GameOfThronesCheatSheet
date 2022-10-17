const codEl = $('#codEl');


var charOfDay = function () {
    fetch(`api/cod`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
           
                    let characterHtml = `
                    <h1 class="uk-heading-divider">Character of the Day</h1>
                    <div class="uk-card uk-card-default uk-width-1-2@m">
                    <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                    <img src="${response.imageUrl}" width="900" height="600" alt="">
                    <h1>fullName: ${response[0].fullName}</h1>
                    <h2>title: ${response[0].title}</h2>
                    <h2>family: ${response[0].family}</h2>
                    
                    </div>
                    </div>
                    </div>
                    </div>`
                    $('#character-html').html(characterHtml);
                })
        }