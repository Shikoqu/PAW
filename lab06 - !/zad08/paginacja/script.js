let countriesData = [];

async function fetchData() {
    const URL = 'https://restcountries.com/v3.1/all';
    const response = await fetch(URL);
    const data = await response.json();
    countriesData = data;

    generateTableHeaders();
    generateTableRows(1); // Initially display the first page
    generatePaginationControls();
}


function generateTableHeaders() {
    const tableHead = document.querySelector('#country-table thead');
    const headers = ['Name', 'Capital', 'Population', 'Area'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHead.appendChild(th);
    });
}

function generateTableRows(pageNumber) {
    const tableBody = document.querySelector('#country-table tbody');
    tableBody.innerHTML = '';

    const itemsPerPage = 10;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < countriesData.length; i++) {
        const country = countriesData[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${country.name.common}</td>
            <td>${country.capital}</td>
            <td>${country.population || 'N/A'}</td>
            <td>${country.area || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    }
}

function generatePaginationControls() {
    const paginationContainer = document.querySelector('#pagination-container');
    const totalPages = Math.ceil(countriesData.length / 10);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button');
        button.addEventListener('click', () => generateTableRows(i));
        paginationContainer.appendChild(button);
    }
}


function handleSort(column) {
    const columnIndex = ['Name', 'Capital', 'Population', 'Area'].indexOf(column);
    countriesData.sort((a, b) => {
        const valueA = a[columnIndex];
        const valueB = b[columnIndex];

        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
    });

    generateTableRows(1);
}

// Initial data fetch
fetchData();
