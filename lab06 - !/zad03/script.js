fetch('city.json')
    .then(response => response.json())
    .then(data => {
        displayMałopolskieCities(data);
        displayCitiesContainingA(data);
        displayFifthDensityCity(data);
        addCitySuffixAbove100000(data);
        populationComparison(data);
        averageAreaOfP(data);
        pomorskieCitiesCheck(data);
    })
    .catch(error => console.error('Error fetching data:', error));


function displayCity(city, index, div) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'col-sm-12 col-md-6 col-lg-4 mb-3';

    const card = document.createElement('div');
    card.className = 'card';


    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.style.display = 'flex';
    cardBody.style.alignItems = 'center';
    cardBody.style.justifyContent = 'space-between';

    const infoContainer = document.createElement('div');
    infoContainer.id = `info${index + 1}`;

    const titleDiv = document.createElement('div');
    const titleElement = document.createElement('h5');
    titleElement.className = 'card-title';
    titleElement.textContent = city.name;
    const provinceElement = document.createElement('p');
    provinceElement.className = 'card-text';
    provinceElement.textContent = city.province;

    titleDiv.appendChild(titleElement);
    titleDiv.appendChild(provinceElement);

    const moreButton = document.createElement('button');
    moreButton.className = 'btn btn-outline-dark';
    moreButton.type = 'button';
    moreButton.dataset.bsToggle = 'collapse';
    moreButton.dataset.bsTarget = `#info${index + 1}`;
    moreButton.ariaExpanded = 'false';
    moreButton.ariaControls = `info${index + 1}`;
    moreButton.textContent = 'More';

    cardBody.appendChild(titleDiv);
    cardBody.appendChild(moreButton);

    const infoBody = document.createElement('div');
    infoBody.className = 'collapse';
    infoBody.id = `info${index + 1}`;

    const table = document.createElement('table');
    table.className = 'card-body table';

    const tbody = document.createElement('tbody');
    const rows = [
        { label: 'Powiat', value: city.township },
        { label: 'Powierzchnia', value: city.area },
        { label: 'Populacja', value: city.people },
        { label: 'Gęstość', value: city.density }
    ];

    rows.forEach(row => {
        const tr = document.createElement('tr');
        const tdLabel = document.createElement('td');
        const tdValue = document.createElement('td');
        tdLabel.textContent = row.label;
        tdValue.textContent = row.value;
        tr.appendChild(tdLabel);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    infoBody.appendChild(table);

    card.appendChild(cardBody);
    card.appendChild(infoBody);

    cardContainer.appendChild(card);

    div.appendChild(cardContainer);
}

function prepareSection(sectionId, title = '') {
    const section = document.getElementById(sectionId);
    section.innerHTML = `<h2>${title}</h2>`;

    const div = document.createElement('div');
    div.className = 'row';

    section.appendChild(div);
    return div;
}

// a). Display all cities from Małopolskie
function displayMałopolskieCities(data) {
    const małopolskieCities = data.filter(city => city.province === 'małopolskie');

    const div = prepareSection('małopolskie', 'Małopolskie Cities');

    małopolskieCities.forEach((city, index) => displayCity(city, index, div));
}

// b). Display cities containing two 'a' characters in their name
function displayCitiesContainingA(data) {
    const citiesWithA = data.filter(city => (city.name.match(/a/gi) || []).length >= 2);

    const div = prepareSection('containsA', 'Cities Containing Two "a" Characters');

    citiesWithA.forEach((city, index) => displayCity(city, index, div));
}

// c). Display the fifth city in terms of population density in Poland
function displayFifthDensityCity(data) {
    const sortedCitiesByDensity = data.sort((a, b) => b.density - a.density);
    const fifthDensityCity = sortedCitiesByDensity[4];

    const div = prepareSection('fifthDensityCity', 'Fifth City in Terms of Population Density');

    displayCity(fifthDensityCity, 0, div);
}

// d). Add "City" suffix to city names above 100,000 people
function addCitySuffixAbove100000(data) {
    const citiesAbove100000 = data.filter(city => city.people > 100000);
    citiesAbove100000.forEach(city => city.name += ' City');

    const div = prepareSection('addCitySuffix', 'Cities Above 100,000 with "City" Suffix');
    
    citiesAbove100000.forEach((city, index) => displayCity(city, index, div));
}

// e). Compare the number of cities above and below 80,000 people
function populationComparison(data) {
    const citiesAbove80000 = data.filter(city => city.people > 80000);
    const citiesBelow80000 = data.filter(city => city.people <= 80000);

    document.getElementById('populationComparison').innerHTML = '<h2>Population Comparison:</h2>' +
        `<p>Cities above 80,000: ${citiesAbove80000.length}</p>` +
        `<p>Cities below or equal to 80,000: ${citiesBelow80000.length}</p>`;
}

// f). Calculate the average area of cities from counties starting with the letter 'P'
function averageAreaOfP(data) {
    const pCountiesCities = data.filter(city => city.township.startsWith('P'));
    const averageArea = pCountiesCities.reduce((sum, city) => sum + city.area, 0) / pCountiesCities.length;

    document.getElementById('averageArea').innerHTML = '<h2>Average Area of Cities from "P" Counties:</h2>' +
        `<p>${averageArea.toFixed(2)} square kilometers</p>`;
}

// g). Check if all cities from Pomorskie are larger than 5000 people
function pomorskieCitiesCheck(data) {
    const pomorskieCities = data.filter(city => city.province === 'pomorskie');
    const allCitiesAbove5000 = pomorskieCities.every(city => city.people > 5000);

    document.getElementById('pomorskieCities').innerHTML = '<h2>Pomorskie Cities Check:</h2>' +
        `<p>All cities larger than 5000 people: ${allCitiesAbove5000 ? 'Yes' : 'No'}</p>` +
        `<p>Number of cities in Pomorskie: ${pomorskieCities.length}</p>`;
}
