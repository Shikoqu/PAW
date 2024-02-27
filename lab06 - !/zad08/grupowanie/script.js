const apiUrl = 'https://restcountries.com/v3.1/all';
let countriesData = [];

// Pobierz dane z API
$.get(apiUrl, function (data) {
    countriesData = data;
    generateTableHeader();
    renderTable();
});

function generateTableHeader() {
    const headerRow = $('#header-row');
    const columns = ['Name', 'Capital', 'Population', 'Area'];

    // Dodaj nagłówki kolumn
    columns.forEach(column => {
        headerRow.append(`<th data-column="${column}">${column}</th>`);
    });

    // Dodaj obsługę sortowania
    $('#countries-table th').on('click', function () {
        const column = $(this).data('column');
        sortTable(column);
    });

    // Dodaj obsługę wyszukiwania dla każdej kolumny
    columns.forEach(column => {
        $(`#search-input-${column}`).on('input', function () {
            const searchTerm = $(this).val().toLowerCase();
            filterTable(column, searchTerm);
        });
    });
}

function renderTable() {
    const tableBody = $('#table-body');
    tableBody.empty();

    const subregions = {};
    let subregionId = 0;

    // Przetwarzanie danych i grupowanie według subregionów
    countriesData.forEach(country => {
        const subregionName = country.subregion || 'Unknown';

        if (!subregions[subregionName]) {
            subregions[subregionName] = {
                totalPopulation: 0,
                totalArea: 0,
                countries: [],
                id: subregionId++,
            };
        }

        subregions[subregionName].totalPopulation += country.population || 0;
        subregions[subregionName].totalArea += country.area || 0;
        subregions[subregionName].countries.push(country);
    });

    // Iteruj przez subregiony
    Object.keys(subregions).forEach(subregionName => {
        const subregion = subregions[subregionName];

        // Dodaj wiersz dla subregionu
        const subregionRow = `<tr class="subregion" data-subregion="${subregion.id}">
                                    <td colspan="2">${subregionName}</td>
                                    <td>${subregion.totalPopulation}</td>
                                    <td>${subregion.totalArea}</td>
                                  </tr>`;

        tableBody.append(subregionRow);

        // Dodaj wiersze dla krajów w subregionie (ukryte na początku)
        subregion.countries.forEach(country => {
            const row = `<tr class="subregion-${subregion.id} hidden">
                                <td>${country.name.common}</td>
                                <td>${country.capital}</td>
                                <td>${country.population || 'N/A'}</td>
                                <td>${country.area || 'N/A'}</td>
                             </tr>`;
            tableBody.append(row);
        });
    });

    // Dodaj obsługę rozwijania/ukrywania krajów pod danym subregionem
    $('.subregion').on('click', function () {
        console.log('click' + $(this).data('subregion'));
        const subregionId = $(this).data('subregion');
        $('.subregion-' + subregionId).toggleClass('hidden');
    });
}

function sortTable(column) {
    const table = $('#countries-table');
    const rows = table.find('tbody tr').toArray();

    rows.sort((a, b) => {
        const aValue = $(a).find(`td:eq(${getColIndex(column)})`).text().toLowerCase();
        const bValue = $(b).find(`td:eq(${getColIndex(column)})`).text().toLowerCase();

        if (column === 'Population' || column === 'Area') {
            return parseInt(aValue) - parseInt(bValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });

    table.find('tbody').empty().append(rows);
}

function filterTable(column, searchTerm) {
    const table = $('#countries-table');
    const rows = table.find('tbody tr').toArray();

    rows.forEach(row => {
        const cellValue = $(row).find(`td:eq(${getColIndex(column)})`).text().toLowerCase();
        const isVisible = cellValue.includes(searchTerm);
        $(row).toggleClass('hidden', !isVisible);
    });
}

function getColIndex(column) {
    const headerRow = $('#header-row');
    return headerRow.find(`th[data-column="${column}"]`).index();
}
