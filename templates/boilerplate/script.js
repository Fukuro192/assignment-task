// global variable to be used for pagination
let weather;
let currentPage = 1;
let numberOfRows = 4;
let tableBody;
let buttonList = document.getElementById('buttonList');

function updateContent(items) {
    if (items.length == 0) {
        //render "empty" or "not found" on the table
        createCalloutEmpty();
        buttonList.innerHTML = "";
    } else if (items.length == 1) {
        //render a weather widget
        let item = items[0];
        createWidget(item);
        buttonList.innerHTML = "";
    } else {
        // render normal table
        createTable(items);
    }
}

function createCalloutEmpty(){
    let divCallout = document.createElement('div');
    divCallout.className = "callout-info border-left-color weather-content";
    let pText = document.createElement('p');
    pText.textContent = "no city was found";
    divCallout.appendChild(pText);
    
    let div = document.getElementById('div-content');
    let weatherContents = div.getElementsByClassName('weather-content');
    for (weatherContent of weatherContents) {
        weatherContent.remove();
    }
    
    div.appendChild(divCallout);
}

function createWidget(item){
    let icon = document.createElement('i');
    if(item.temperature < 10) icon.className = "bi bi-cloud-snow";
    else if (item.temperature >= 10 && item.temperature < 20) icon.className = "bi bi-cloud-sun-fill";
    else icon.className = "bi bi-sun-fill";
    icon.className = icon.className + " fs-custom-1";
    let iconDiv = document.createElement('div');
    iconDiv.className = "col-sm-4 text-warning";
    iconDiv.appendChild(icon);
    let temperatureDiv = document.createElement('div');
    temperatureDiv.className = "row fs-custom-2";
    temperatureDiv.textContent = item.temperature + "°C";
    let cityDiv = document.createElement('div');
    cityDiv.className = "row fs-custom-3 text-muted";
    cityDiv.textContent = item.city;
    let dataDiv = document.createElement('div');
    dataDiv.className = "col-sm-6 offset-sm-1";
    dataDiv.appendChild(temperatureDiv);
    dataDiv.appendChild(cityDiv);
    let rowDiv = document.createElement('div');
    rowDiv.className = "row";
    rowDiv.appendChild(dataDiv);
    rowDiv.appendChild(iconDiv);
    let widgetDiv = document.createElement('div');
    widgetDiv.className = "media row bg-info bg-gradient rounded-5 weather-content";
    widgetDiv.appendChild(rowDiv);

    let div = document.getElementById('div-content');
    let weatherContents = div.getElementsByClassName('weather-content');
    for (weatherContent of weatherContents) {
        weatherContent.remove();
    }
    
    div.appendChild(widgetDiv);
}

function createTable(items) {
    weather = items;
    let headers = ['City', 'Temperature'];
    let table = document.createElement('table');
    table.className = 'table table-striped table-hover weather-content';
    let thead = document.createElement('thead');
    thead.className = 'table-dark';
    table.appendChild(thead);
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);

    let tbody = document.createElement('tbody');
    tableBody = tbody;
    displayList(items, tbody, numberOfRows, currentPage);
    table.appendChild(tbody);

    setupPagination(items, buttonList, numberOfRows);

    let div = document.getElementById('div-content');
    let weatherContents = div.getElementsByClassName('weather-content');
    for (weatherContent of weatherContents) {
        weatherContent.remove();
    }
    
    div.appendChild(table);
}

function createTableRow(item){
    // adding city
    let row = document.createElement('tr');
    let cell = document.createElement('td');
    let textNode = document.createTextNode(item['city']);
    cell.appendChild(textNode);
    cell.className = "city";
    row.appendChild(cell);

    // adding temperature
    // using the same variables: `row`, `cell`, `textNode`
    cell = document.createElement('td');
    textNode = document.createTextNode(item['temperature']);
    cell.appendChild(textNode);
    cell.className = "temperature";
    row.appendChild(cell);

    // making the row clickable
    row.addEventListener('click', () => {
        let value = row.getElementsByClassName("city")[0].innerText;
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

let searchbar = document.getElementById('searchbar');
searchbar.addEventListener('keypress', () => {
    console.log(searchbar.value);
    sendRequest(searchbar.value);
});

// pagination functions

function displayList(items, wrapper, rowsPerPage, page) {
	wrapper.innerHTML = "";
	page--;

	let start = rowsPerPage * page;
	let end = start + rowsPerPage;
	let paginatedItems = items.slice(start, end);
	for(let i = 0; i < paginatedItems.length; i++) {
		let item = paginatedItems[i];
		console.log(item);
		let row = createTableRow(item);

		wrapper.appendChild(row);
	}

}

function setupPagination(items, wrapper, rowsPerPage) {
	wrapper.innerHTML = "";
	// same concept of floor(), but instead of rounding down, ceil() will round up
	let pageCount = Math.ceil(items.length/rowsPerPage);
	for(let i = 1; i<=pageCount; i++){
		let button = paginationButton(i);
		wrapper.appendChild(button);
	}
}

function paginationButton(pageNumber){
    let button = document.createElement('li');
    button.className = "page-item button-" + pageNumber;
    if(pageNumber == currentPage) button.classList.add('active');
    let anchor = document.createElement('a');
    anchor.className = "page-link";
    anchor.innerText = pageNumber;
    button.appendChild(anchor);
    button.addEventListener('click', () => {
        let previousButton = document.getElementsByClassName('button-' + currentPage)[0];
        previousButton.className = "page-item button-"+currentPage;
        currentPage = pageNumber;
        displayList(weather, tableBody, numberOfRows, pageNumber);
        let currentButton = document.getElementsByClassName('button-' + currentPage)[0].classList.add('active');
    });
    return button;
}
