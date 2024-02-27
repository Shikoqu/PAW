const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];

const countries = [
    { name: 'Nigeria', continent: 'Africa' },
    { name: 'Nepal', continent: 'Asia' },
    { name: 'Angola', continent: 'Africa' },
    { name: 'Poland', continent: 'Europe' },
    { name: 'Kenya', continent: 'Africa' },
    { name: 'Greece', continent: 'Europe' },
    { name: 'France', continent: 'Europe' },
    { name: 'China', continent: 'Asia' }
];

let people = [
    { "id": 123, "name": "Rick Deckard", "email": "rick@bladerunner.org" },
    { "id": 456, "name": "Roy Batty", "email": "roy@replicant.io" },
    { "id": 789, "name": "J.F. Sebastian", "email": "j.f@tyler.com" },
    { "id": 258, "name": "Pris", "email": "pris@replicant.io" }
];

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];

// Funkcja pomocnicza do wypisywania wyników na stronie
function displayResult(result, section) {
    const ul = document.getElementById(section);
    const li = document.createElement('li');
    li.textContent = result;
    ul.appendChild(li);
}

// Funkcja pomocnicza do wypisywania wyników na stronie
function displayResult(result, section) {
    const ul = document.getElementById(section);
    const li = document.createElement('li');
    li.textContent = result;
    ul.appendChild(li);
}


//! 1. ===========================================
// Na stronie internetowych wyświetlają się nazwy zawierające znak "r".  ( tablica names)
const namesWithR = names.filter(name => name.includes('r'));
displayResult(namesWithR.join(', '), 'result1');


//! 2. ===========================================
// sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. wynik wyswietl na stronei w sekcji 2
const allNumbersLessThan9 = numbers.every(number => number < 9);
displayResult(`Czy wszystkie liczby są mniejsze niż 9? ${allNumbersLessThan9}`, 'result2');

// sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6 wyników. wynik wyświetl w przeglądarce w sekcji 2
const anyNumbersLessThan6 = numbers.some(number => number < 6);
displayResult(`Czy istnieje liczba mniejsza niż 6? ${anyNumbersLessThan6}`, 'result2');

// inkrementacja i suma elementów nieparzystych
numbers = numbers.map(number => number + 1);
const oddNumbers = numbers.filter(number => number % 2 !== 0);
const sumOfOddNumbers = oddNumbers.reduce((sum, number) => sum + number, 0);
displayResult(`Suma liczb nieparzystych: ${sumOfOddNumbers}`, 'result2');


//! 3. ===========================================
// Na stronach internetowych wyświetlają się kraje z Europy
const europeanCountries = countries.filter(country => country.continent === 'Europe');
displayResult(europeanCountries.map(country => country.name).join(', '), 'result3');


//! 4. ===========================================
// Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. wyświetlanie wyników na stronach internetowych.
const replicantEmails = people.filter(person => person.email.endsWith('replicant.io'));
displayResult(replicantEmails.map(person => person.name).join(', '), 'result4');


//! 5. ===========================================
// usuwanie zduplikowanych wartości z tablicy nazwaduplikatu
const uniqueNames = Array.from(new Set(duplicateName));
displayResult(uniqueNames.join(', '), 'result5');
