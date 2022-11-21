// global variable to be used for pagination
let weather;
let currentPage = 1;
let numberOfRows = 4;
let tableBody;
let buttonList = $('#buttonList');
let maxPages;

function updateContent(items) {
    if (items.length == 0) {
        //render "empty" or "not found" on the table
        createCalloutEmpty();
        $('#buttonList').hide();
    } else if (items.length == 1) {
        //render a weather widget
        let item = items[0];
        createWidget(item);
        $('#buttonList').hide();
    } else {
        // render normal table
        createTable(items);
    }
}

function createCalloutEmpty(){
    let divCallout = $('<div>', {class: "callout-info border-left-color weather-content"});
    divCallout.append($('<p>no city was found</p>'));
    $('.weather-content').remove();
    $('#div-content').append(divCallout);
}

function createWidget(item){
    let icon = $('<i>');
    if(item.temperature < 10) icon.attr('class', "bi bi-cloud-snow");
    else if (item.temperature >= 10 && item.temperature < 20) icon.attr('class', "bi bi-cloud-sun-fill");
    else icon.attr('class', "bi bi-sun-fill");
    icon.addClass(" fs-custom-1");
    $('.weather-content').remove();    
    $('#div-content').append(
        $('<div>', {class: "media row bg-info bg-gradient rounded-5 weather-content"})
        .append($('<div>', {class: "row"})
        .append(
            $('<div>', {class: "col-sm-6 offset-sm-1"})
            .append(
                $('<div>', {class: "row fs-custom-2"})
                .text(item.temperature + "°C")
            )
            .append(
                $('<div>', {class: "row fs-custom-3 text-muted"})
                .text(item.city)
            )
        )
        .append(
            $('<div>', {class: "col-sm-4 text-warning"})
            .append(icon)
        ))
    );
}

function createTable(items) {
    weather = items;
    currentPage = 1;
    let headers = ['City', 'Temperature'];
    let table = $('<table>', {class: 'table table-striped table-hover weather-content'});
    let thead = $('<thead>', {class: 'table-dark'});
    table.append(thead);
    let headerRow = $('<tr>');
    headers.forEach(headerText => {
        headerRow.append($('<th>').text(headerText));
    });
    thead.append(headerRow);

    let tbody = $('<tbody>');
    tableBody = tbody;
    displayList(items, tbody, numberOfRows, currentPage);
    table.append(tbody);

    setupPagination(items, buttonList, numberOfRows);

    $('.weather-content').remove();
    
    $('#div-content').append(table);
}

function createTableRow(item){
    // adding city
    let row = $('<tr>');
    row.append($('<td>', {class: 'city'}).text(item['city']));

    // adding temperature
    // using the same variables: `row`, `cell`, `textNode`
    row.append($('<td>', {class: 'temperature'}).text(item['temperature']));

    // making the row clickable
    row.click(() => {
        let value = $(".city:eq(0)").text();
        sendRequest(value);
    });

    return row;
}

function sendRequest(city) {
    fetch(
        '/api/v1/weather/?city=' + city,
        {
            headers: {
                "Authorization": "Token " + document.getElementById('token').value
            }
        }
        )
        .then(res => res.json())
        .then(weather => {
            let items = weather.weather;
            updateContent(items);
        });    
}

sendRequest('');

let searchbar = $('#searchbar');
$('#searchbar').on('input', () => {
    console.log($('#searchbar').val());
    sendRequest($('#searchbar').val());
});

// pagination functions

function displayList(items, wrapper, rowsPerPage, page) {
	wrapper.empty();
	page--;

	let start = rowsPerPage * page;
	let end = start + rowsPerPage;
	let paginatedItems = items.slice(start, end);
	for(let i = 0; i < paginatedItems.length; i++) {
		let item = paginatedItems[i];
		console.log(item);
		let row = createTableRow(item);

		wrapper.append(row);
	}

}

function setupPagination(items, wrapper, rowsPerPage) {
    wrapper.show();
	// same concept of floor(), but instead of rounding down, ceil() will round up
	maxPages = Math.ceil(items.length/rowsPerPage);
	for(let buttonString of ['button-previous', 'button-next']){
		paginationButton(buttonString);
	}
}

function paginationButton(buttonString){
    let button = $('#' + buttonString).attr('class', 'page-item');
    console.log(button.html());
    if(buttonString == 'button-previous') button.addClass('disabled');
    if(maxPages == 1 && buttonString == 'button-next') button.addClass('disabled');
    button.click(pressButton);
}

function pressButton() {
    if($(this).attr('class').includes('disabled')) return;
    if($(this).attr('id') == 'button-previous'){
        currentPage--;
    }else{
        currentPage++;
    }
    displayList(weather, tableBody, numberOfRows, currentPage); 
    if(currentPage > 1 && currentPage < maxPages){
        $('li').attr('class', 'page-item');
    }
    if (currentPage == 1){
        $('#button-previous').addClass('disabled');
    }
    if (currentPage == maxPages){
        $('#button-next').addClass('disabled')
    }
}